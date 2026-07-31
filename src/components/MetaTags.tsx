import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface PageMeta {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
}

const routeMeta: Record<string, (t: (key: string) => string) => PageMeta> = {
  '/': (t) => ({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    ogType: 'website',
    ogImage: '/og-home.jpg',
    twitterCard: 'summary_large_image',
  }),
  '/menu': (t) => ({
    title: t('seo.menu.title'),
    description: t('seo.menu.description'),
    ogType: 'website',
    ogImage: '/og-menu.jpg',
    twitterCard: 'summary_large_image',
  }),
  '/story': (t) => ({
    title: t('seo.story.title'),
    description: t('seo.story.description'),
    ogType: 'article',
    ogImage: '/og-story.jpg',
    twitterCard: 'summary_large_image',
  }),
  '/shop': (t) => ({
    title: t('seo.shop.title'),
    description: t('seo.shop.description'),
    ogType: 'website',
    ogImage: '/og-shop.jpg',
    twitterCard: 'summary_large_image',
  }),
  '/contact': (t) => ({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    ogType: 'website',
    ogImage: '/og-contact.jpg',
    twitterCard: 'summary',
  }),
};

const defaultMeta: PageMeta = {
  title: 'Kinomori - Experiencia gastronómica japonesa',
  description: 'Restaurante japonés auténtico en Tánger. Sushi, ramen, dim sum y especialidades caseras.',
  ogType: 'website',
  ogImage: '/og-default.jpg',
  twitterCard: 'summary_large_image',
};

export default function MetaTags() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const meta = useMemo(() => {
    const route = location.pathname;
    const routeHandler = routeMeta[route];
    return routeHandler ? routeHandler(t) : defaultMeta;
  }, [location.pathname, t, i18n.language]);

  const fullTitle = `${meta.title} | Kinomori`;
  const siteUrl = 'https://kinomori.com';
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const ogImageUrl = `${siteUrl}${meta.ogImage}`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={meta.description} />
      <meta name="theme-color" content="#1a2e1a" />

      {/* Open Graph */}
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Kinomori" />
      <meta property="og:locale" content={i18n.language === 'es' ? 'es_ES' : i18n.language === 'en' ? 'en_US' : i18n.language === 'fr' ? 'fr_FR' : 'zh_CN'} />
      <meta property="og:locale:alternate" content={['es_ES', 'en_US', 'fr_FR', 'zh_CN'].filter(l => l !== (i18n.language === 'es' ? 'es_ES' : i18n.language === 'en' ? 'en_US' : i18n.language === 'fr' ? 'fr_FR' : 'zh_CN')).join(',')} />

      {/* Twitter */}
      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:site" content="@kinomori" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate languages */}
      {['es', 'en', 'fr', 'zh'].map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${siteUrl}/${lang}${location.pathname}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${location.pathname}`} />

      {/* Robots */}
      {meta.noIndex && <meta name="robots" content="noindex" />}
      {meta.noFollow && <meta name="robots" content="nofollow" />}
      {!meta.noIndex && !meta.noFollow && <meta name="robots" content="index, follow" />}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'Kinomori',
            url: siteUrl,
            image: ogImageUrl,
            description: meta.description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Avenida Mohamed VI',
              addressLocality: 'Tánger',
              addressCountry: 'MA',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7595,
              longitude: -5.8340,
            },
            telephone: '+212-539-XXX-XXX',
            priceRange: '€€',
            servesCuisine: ['Japanese', 'Sushi', 'Ramen', 'Dim Sum'],
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '12:00', closes: '23:00' },
            ],
          }),
        }}
      />
    </Helmet>
  );
}