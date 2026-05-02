import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';

export const metadata: Metadata = {
  title: 'Tortas para el Día de la Madre en Maipú | Galdi Pastelería',
  description: 'Tortas artesanales para el Día de la Madre con delivery en Maipú. Torta Amor, 3 Leches y Panqueque. Pastelería artesanal en Maipú, pedidos por WhatsApp +56 9 9099 1011.',
  keywords: 'tortas día de la madre maipú, pastelería día de la madre maipú, tortas personalizadas maipú, delivery tortas maipú, torta para mamá maipú',
  alternates: { canonical: 'https://galdi.cl/dia-de-la-madre' },
  openGraph: {
    title: 'Tortas para el Día de la Madre en Maipú | Galdi Pastelería',
    description: 'Tortas artesanales con delivery en Maipú para el Día de la Madre. Encarga la tuya por WhatsApp.',
    url: 'https://galdi.cl/dia-de-la-madre',
    images: [{ url: 'https://galdi.cl/images/og-galdi.webp', width: 1200, height: 630 }],
  },
};

export default function DiaDeLaMadrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Galdi Pastelería",
            "url": "https://galdi.cl",
            "telephone": "+56990991011",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Pasaje Marcos Echenique N° 809",
              "addressLocality": "Maipú",
              "addressRegion": "Región Metropolitana",
              "addressCountry": "CL"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tortas Día de la Madre",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Amor" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta 3 Leches" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Panqueque" } }
              ]
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día de la Madre en Santiago?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, Galdi Pastelería realiza delivery de tortas artesanales en toda la Región Metropolitana. El costo de envío varía según la comuna — consulta directamente por WhatsApp al +56 9 9099 1011."
                }
              },
              {
                "@type": "Question",
                "name": "¿Con cuánta anticipación debo encargar la torta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recomendamos encargar con al menos 48 horas de anticipación para asegurar disponibilidad, especialmente en fechas como el Día de la Madre."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tortas tienen disponibles para el Día de la Madre?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ofrecemos Torta Amor (hojarasca con crema pastelera y frambuesas), Torta 3 Leches y Torta Panqueque. Todas elaboradas de forma artesanal en Maipú."
                }
              },
              {
                "@type": "Question",
                "name": "¿Pueden personalizar la torta para mamá?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, coordinamos decoraciones y dedicatorias personalizadas. Contáctanos por WhatsApp para conversar los detalles de tu pedido."
                }
              }
            ]
          })
        }}
      />

      <SeoPage
        titulo="Tortas para el Día de la Madre"
        subtitulo="Sorpréndela con algo hecho con cariño en Maipú"
        descripcion="El Día de la Madre merece algo especial y artesanal. En Galdi elaboramos tortas personalizadas con los mejores ingredientes, con delivery directo en toda la comuna de Maipú. Encarga con anticipación y asegura tu pedido."
        imagen="/images/torta-amor.webp"
        ctaTexto="Ver productos"
        ctaHref="/#productos"
        waTexto="Hola Galdi, quiero encargar una torta para el Día de la Madre 🎂💐"
        breadcrumb="Galdi · Día de la Madre"
        items={[
          {
            nombre: "Torta Amor",
            detalle: "Hojarasca, crema pastelera, frambuesas y manjar decorada con merengue. Nuestra edición especial para el Día de la Madre en Maipú.",
            imagen: "/images/torta-amor.webp"
          },
          {
            nombre: "Torta 3 Leches",
            detalle: "Húmeda, esponjosa y con crema chantilly. Un clásico irresistible para mamá. Con delivery en Maipú.",
            imagen: "/images/torta-tres-leches.webp"
          },
          {
            nombre: "Torta Panqueque",
            detalle: "Finas capas de panqueque con chocolate y frambuesa o manjar. Perfecta para celebrar a mamá en Maipú.",
            imagen: "/images/torta-panqueques-dia-madre.webp"
          },
        ]}
        extraContent={
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(212,168,83,0.07)', borderRadius: '4px', border: '1px solid rgba(212,168,83,0.15)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 300, color: '#3d2010', marginBottom: '1rem' }}>
              Pastelería artesanal para el Día de la Madre en Maipú
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#5a3520', lineHeight: 1.8, marginBottom: '1rem' }}>
              En Galdi somos una pastelería artesanal ubicada en Maipú. Para el Día de la Madre elaboramos tortas personalizadas con ingredientes seleccionados, sin conservantes, hechas el mismo día de entrega para garantizar frescura.
            </p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, color: '#3d2010', margin: '1.5rem 0 0.75rem' }}>
              Preguntas frecuentes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { q: '¿Hacen delivery de tortas para el Día de la Madre en Santiago?', a: 'Sí, realizamos delivery en toda la Región Metropolitana. El costo de envío varía según la comuna — consúltanos por WhatsApp al +56 9 9099 1011.' },
                { q: '¿Con cuánta anticipación debo encargar?', a: 'Recomendamos al menos 48 horas de anticipación para asegurar disponibilidad, especialmente en el Día de la Madre.' },
                { q: '¿Pueden personalizar la torta para mamá?', a: 'Sí, coordinamos decoraciones y dedicatorias personalizadas. Escríbenos por WhatsApp para conversar los detalles.' },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: '#3d2010', marginBottom: '0.25rem' }}>{q}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.7 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </>
  );
}
