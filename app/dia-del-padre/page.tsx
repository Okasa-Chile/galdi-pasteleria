import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';

export const metadata: Metadata = {
  title: 'Tortas para el Día del Padre en Maipú | Galdi Pastelería',
  description: 'Tortas artesanales para el Día del Padre con delivery en Maipú. Torta Panqueque, Moka y 3 Leches. Pedidos por WhatsApp +56 9 9099 1011.',
  keywords: 'tortas día del padre maipú, pastelería día del padre maipú, torta para papá maipú, delivery tortas maipú, tortas personalizadas maipú',
  alternates: { canonical: 'https://galdi.cl/dia-del-padre' },
  openGraph: {
    title: 'Tortas para el Día del Padre en Maipú | Galdi Pastelería',
    description: 'Tortas artesanales con delivery en Maipú para el Día del Padre. Encarga la tuya por WhatsApp.',
    url: 'https://galdi.cl/dia-del-padre',
    images: [{ url: 'https://galdi.cl/images/og-galdi.webp', width: 1200, height: 630 }],
  },
};

export default function DiaDElPadrePage() {
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
              "name": "Tortas Día del Padre",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Panqueque" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Moka" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta 3 Leches" } }
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
                "name": "¿Hacen delivery de tortas para el Día del Padre en Maipú?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí, hacemos delivery en Maipú y comunas cercanas de la Región Metropolitana. El costo varía según la comuna — consúltanos por WhatsApp al +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Con cuánta anticipación debo encargar la torta?",
                "acceptedAnswer": { "@type": "Answer", "text": "Con al menos 48 horas. En fechas como el Día del Padre los pedidos se completan rápido, así que mejor encargar antes." }
              },
              {
                "@type": "Question",
                "name": "¿Qué tortas tienen disponibles para el Día del Padre?",
                "acceptedAnswer": { "@type": "Answer", "text": "Torta Panqueque (capas con manjar o chocolate), Torta Moka (bizcocho con crema de café) y Torta 3 Leches. Todas artesanales, hechas en Maipú." }
              },
              {
                "@type": "Question",
                "name": "¿Pueden poner una dedicatoria?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Coordina los detalles por WhatsApp cuando hagas el pedido." }
              }
            ]
          })
        }}
      />
      <SeoPage
        titulo="Tortas para el Día del Padre"
        subtitulo="Encarga con tiempo y llega con algo bueno de verdad"
        descripcion="El 22 de junio se acerca. En Galdi hacemos tortas por encargo en Maipú: Panqueque, Moka, 3 Leches. Sin conservantes, hechas el mismo día de entrega. Pedidos por WhatsApp."
        imagen="/images/torta-panqueques.webp"
        ctaTexto="Ver productos"
        ctaHref="/#productos"
        waTexto="Hola Galdi, quiero encargar una torta para el Día del Padre 🎂👔"
        breadcrumb="Galdi · Día del Padre"
        items={[
          {
            nombre: "Torta Panqueque",
            detalle: "Capas de panqueque con manjar, chocolate o frambuesa. Se puede personalizar. Delivery en Maipú.",
            imagen: "/images/torta-panqueques-ejemplo.webp"
          },
          {
            nombre: "Torta Moka",
            detalle: "Bizcocho húmedo con crema de café y manjar. Para los papás que prefieren algo menos dulce.",
            imagen: "/images/torta-moka.webp"
          },
          {
            nombre: "Torta 3 Leches",
            detalle: "Esponjosa, con crema chantilly. Un clásico que no falla. Con delivery en Maipú.",
            imagen: "/images/torta-tres-leches.webp"
          },
        ]}
        extraContent={
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(212,168,83,0.07)', borderRadius: '4px', border: '1px solid rgba(212,168,83,0.15)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 300, color: '#3d2010', marginBottom: '1rem' }}>
              Pastelería artesanal para el Día del Padre en Maipú
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#5a3520', lineHeight: 1.8, marginBottom: '1rem' }}>
              Somos Jacqueline e Ingrid, dos hermanas de Maipú. Hacemos tortas por encargo con ingredientes frescos, sin conservantes. Cada torta sale el mismo día que se entrega. Para el Día del Padre trabajamos con pedidos anticipados — te recomendamos escribirnos con al menos 48 horas.
            </p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, color: '#3d2010', margin: '1.5rem 0 0.75rem' }}>
              Preguntas frecuentes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { q: '¿Hacen delivery para el Día del Padre en Maipú?', a: 'Sí, hacemos delivery en Maipú y comunas cercanas. El costo depende de la distancia — consúltanos por WhatsApp al +56 9 9099 1011.' },
                { q: '¿Con cuánta anticipación debo encargar?', a: 'Con al menos 48 horas. En fechas especiales los pedidos se completan rápido.' },
                { q: '¿Pueden poner una dedicatoria en la torta?', a: 'Sí. Dinos el mensaje cuando hagas el pedido y lo coordinamos.' },
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
