import { galleryDeleteCore } from '../../functions-shared/galleryDelete.js';

// Netlify function: exposed as /api/gallery-delete via the redirect in netlify.toml
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const result = await galleryDeleteCore({
      authorization: event.headers.authorization || event.headers.Authorization,
      body,
    });
    return {
      statusCode: result.status,
      body: JSON.stringify(result.data ?? { error: result.message }),
    };
  } catch (err) {
    console.error('gallery-delete failed:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
