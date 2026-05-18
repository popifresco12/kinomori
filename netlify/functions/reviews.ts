import { handler } from '@netlify/functions';
export const handler = handler(async (event) => {
  const placeId = event.queryStringParameters?.placeId;
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !key) return { statusCode: 400, body: JSON.stringify({ error: 'placeId + key required' }) };
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${key}`
  );
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data.result),
    headers: { 'Cache-Control': 'public, max-age=3600', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  };
});
