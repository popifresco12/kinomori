'use client';
import { useEffect, useState } from 'react';
interface GReview { author_name:string; rating:number; text:string; time:number; }
interface GPlace { rating?:number; user_ratings_total?:number; reviews?:GReview[]; }
export default function useReviews(placeId:string, apiKey:string) {
  const [data, setData] = useState<GPlace|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    if (!placeId || !apiKey) { setLoading(false); return; }
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`)
      .then(r=>r.json())
      .then(json => { if (json.status==='OK') setData(json.result); else setError(json.status||'err'); })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, [placeId, apiKey]);
  return { ...data, loading, error } as GPlace & { loading:boolean; error:string|null };
}
