export const GALDI_BUSINESS = {
  '@type': ['LocalBusiness', 'Bakery'],
  '@id': 'https://galdi.cl/#business',
  name: 'Galdi SPA - Pastelería- Panadería - Eventos',
  url: 'https://galdi.cl',
  telephone: '+56990991011',
  email: 'ventas@galdi.cl',
  priceRange: '$$',
  servesCuisine: 'Chilean',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pasaje Marcos Echenique N° 809',
    addressLocality: 'Las Palmas, Maipú',
    addressRegion: 'Región Metropolitana',
    postalCode: '9260057',
    addressCountry: 'CL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.4776144,
    longitude: -70.7521309,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '72',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Maipú' },
    { '@type': 'City', name: 'Cerrillos' },
    { '@type': 'City', name: 'Pudahuel' },
    { '@type': 'City', name: 'Estación Central' },
    { '@type': 'City', name: 'Padre Hurtado' },
    { '@type': 'City', name: 'Lo Prado' },
  ],
  sameAs: [
    'https://www.instagram.com/galdi_banqueteria/',
    'https://www.google.com/maps?cid=15591011647306482666',
    'https://share.google/s9CQErdNSBOZ8y15P',
  ],
};

export function businessSchema(overrides: Record<string, unknown> = {}) {
  return { ...GALDI_BUSINESS, ...overrides };
}
