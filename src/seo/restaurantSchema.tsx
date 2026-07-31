import React from 'react';

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kinomori",
  description: "Asia meets Morocco in every bite — Asian fusion restaurant in Tamraght, Morocco",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tamraght",
    addressRegion: "Souss-Massa",
    addressCountry: "MA",
  },
  servesCuisine: ["Chinese","Japanese","Moroccan","Fusion"],
  priceRange: "$$",
  telephone: "+212 5XX-XXXXXX",
  url: "https://popifresco12.github.io/kinomori",
  openingHours: "Mo-Su 09:00-23:00",
};

export default function RestaurantSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
