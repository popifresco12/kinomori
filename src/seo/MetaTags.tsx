'use client';
import { useTranslation } from 'react-i18next';
import RestaurantSchema from './restaurantSchema';

interface Props { titleKey?: string; descriptionKey?: string; image?: string; }
export default function MetaTags({ titleKey='hero.title', descriptionKey='hero.tagline', image='/og-kinomori.jpg' }: Props) {
  const { t } = useTranslation();
  const title = t(titleKey) + ' | Kinomori';
  const desc = t(descriptionKey);
  if (typeof document === 'undefined') return null;
  document.title = title;
  const set = (k: string, v: string) => {
    let el = document.querySelector(`meta[name="${k}"]`) as HTMLMetaElement;
    if (!el) { el = document.createElement('meta'); el.name = k; document.head.appendChild(el); }
    el.content = v;
  };
  set('description', desc);
  set('og:title', title);
  set('og:description', desc);
  set('og:image', image);
  set('og:type', 'website');
  set('og:url', window.location.href);
  set('twitter:card', 'summary_large_image');
  set('twitter:title', title);
  set('twitter:description', desc);
  return <RestaurantSchema />;
}
