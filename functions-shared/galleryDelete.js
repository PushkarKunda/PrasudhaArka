/**
 * Shared core for the gallery-delete serverless endpoint (Vercel + Netlify).
 *
 * Security model:
 *  1. Caller sends their Firebase ID token (Authorization: Bearer ...).
 *  2. We verify it server-side via Firebase accounts:lookup (web API key).
 *  3. The token's email must be in the ADMIN_EMAILS allowlist.
 *  4. Only then do we destroy the asset in Cloudinary with a signed request.
 *
 * Server-only environment variables (set on Vercel AND Netlify):
 *  FIREBASE_WEB_API_KEY   - Firebase project Web API key
 *  ADMIN_EMAILS           - comma-separated admin emails allowed to delete
 *  CLOUDINARY_CLOUD_NAME  - Cloudinary cloud name
 *  CLOUDINARY_API_KEY     - Cloudinary API key
 *  CLOUDINARY_API_SECRET  - Cloudinary API secret (never expose to client!)
 */
import crypto from 'node:crypto';

const PUBLIC_ID_PATTERN = /^[A-Za-z0-9_\-/.]+$/;

const verifyAdminEmail = async (authorizationHeader) => {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  if (!apiKey) return { error: 'FIREBASE_WEB_API_KEY is not configured', status: 500 };

  const token = (authorizationHeader || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) return { error: 'Missing session token', status: 401 };

  let lookup;
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      },
    );
    if (!response.ok) return { error: 'Invalid session token', status: 401 };
    lookup = await response.json();
  } catch {
    return { error: 'Session verification failed', status: 502 };
  }

  const email = (lookup?.users?.[0]?.email || '').toLowerCase();
  const allowed = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (!email || !allowed.length || !allowed.includes(email)) {
    return { error: 'Account is not authorized to delete media', status: 403 };
  }
  return { email };
};

const destroyCloudinaryAsset = async (publicId, resourceType) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return { error: 'Cloudinary environment is not configured', status: 500 };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Signature = SHA1 of sorted params (excluding file/cloud_name/resource_type/api_key) + secret
  const toSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');

  const form = new URLSearchParams({
    public_id: publicId,
    api_key: apiKey,
    timestamp: String(timestamp),
    signature,
  });

  const type = resourceType === 'video' ? 'video' : 'image';
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/destroy`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    return { error: 'Cloudinary destroy failed', status: 502 };
  }
  return { result: (await response.json())?.result || 'ok' };
};

export const galleryDeleteCore = async ({ authorization, body }) => {
  const auth = await verifyAdminEmail(authorization);
  if (auth.error) return { status: auth.status, message: auth.error };

  const publicId = typeof body?.publicId === 'string' ? body.publicId.trim() : '';
  if (!publicId || publicId.length > 512 || !PUBLIC_ID_PATTERN.test(publicId)) {
    return { status: 400, message: 'Invalid public_id' };
  }

  const destroy = await destroyCloudinaryAsset(publicId, body?.resourceType);
  if (destroy.error) return { status: destroy.status, message: destroy.error };

  return { status: 200, data: { ok: true, result: destroy.result } };
};
