import { onRequest } from 'firebase-functions/v2/https';

const PLACE_ID = 'ChIJf7l5N6LDYpYR6uNj83Fqd9g';

const ALLOWED_ORIGINS = [
  'https://galdi.cl',
  'https://www.galdi.cl',
  'https://galdi-web.web.app',
  'http://localhost:3000',
];

export const placesReviews = onRequest(
  { region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public' },
  async (req, res) => {
    res.set('Cache-Control', 'public, max-age=86400');

    try {
      const apiKey = process.env.PLACES_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'API key not configured' });
        return;
      }

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=es&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json() as {
        result?: { reviews?: Array<{ rating: number }> };
      };

      const resenas = (data.result?.reviews ?? []).slice(0, 5);

      res.json(resenas);
    } catch {
      res.status(500).json({ error: 'Error fetching reviews' });
    }
  }
);
