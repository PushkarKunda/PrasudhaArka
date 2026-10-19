import { galleryDeleteCore } from '../functions-shared/galleryDelete.js';

// Vercel serverless function: POST /api/gallery-delete
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await galleryDeleteCore({
      authorization: req.headers.authorization,
      body: req.body || {},
    });
    res.status(result.status).json(result.data ?? { error: result.message });
  } catch (err) {
    console.error('gallery-delete failed:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
