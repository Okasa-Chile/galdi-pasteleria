/**
 * Fuente única de verdad del schema LocalBusiness de Galdi.
 *
 * REGLA: todo dato del negocio (nombre, dirección, teléfono, código postal,
 * coordenadas, horarios, comunas, redes) va EXCLUSIVAMENTE aquí. Nunca
 * hardcodear en páginas individuales. Nombre y código postal deben coincidir
 * siempre con Google Business Profile.
 *
 * ARQUITECTURA JSON-LD (06-08-2026):
 * - GALDI_BUSINESS es el nodo canónico COMPLETO. Se emite UNA sola vez en
 *   todo el sitio, desde app/layout.tsx.
 * - businessSchema() devuelve solo una REFERENCIA por @id, para que las
 *   páginas puedan colgar propiedades propias (ej. hasOfferCatalog) sin
 *   redeclarar la entidad. Google fusiona la referencia con el nodo canónico.
 *
 * NO agregar aggregateRating aquí. Google excluyó LocalBusiness/Organization
 * de la elegibilidad para review snippets cuando la entidad controla las
 * reseñas sobre sí misma (regla de self-serving reviews). El marcado no
 * produce estrellas y genera riesgo de acción manual por datos estructurados
 * (reseñas agregadas de un tercero + sin contenido visible de respaldo).
 * Si algún día se quieren estrellas reales, la vía es schema Product en
 * productos individuales con reseñas reales visibles en la página.
 */

export const BUSINESS_ID = 'https://galdi.cl/#business';

export const GALDI_BUSINESS = {
  '@type': ['LocalBusiness', 'Bakery'],
  '@id': BUSINESS_ID,
  name: 'Galdi SPA - Pastelería- Panadería - Eventos',
  url: 'https://galdi.cl',
  description:
    'Pastelería y panadería artesanal en Maipú. Tortas, pan amasado, empanadas y banquetería para eventos. Delivery en Maipú y Gran Santiago.',
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

/**
 * Referencia al nodo canónico del negocio, para usar DENTRO del @graph de
 * páginas individuales.
 *
 * Descarta a propósito los overrides `url` y `description`: son propiedades
 * de la entidad negocio, no de la landing. Antes cada página declaraba una
 * `url` distinta para el mismo @id, lo que emitía señales contradictorias.
 * La URL de la página ya se declara vía canonical en el metadata de Next.
 *
 * Cualquier otro override (ej. hasOfferCatalog) se conserva.
 */
export function businessSchema(overrides: Record<string, unknown> = {}) {
  const { url: _url, description: _description, ...safe } = overrides;
  return {
    '@type': GALDI_BUSINESS['@type'],
    '@id': BUSINESS_ID,
    ...safe,
  };
}
