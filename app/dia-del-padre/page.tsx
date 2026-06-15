import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';

export const metadata: Metadata = {
  title: 'Tortas para el Día del Padre en Maipú | Galdi Pastelería',
  description: 'Tortas artesanales para el Día del Padre con delivery en Maipú, Pudahuel, Cerrillos, Estación Central, Padre Hurtado y Santiago. Encarga hasta el jueves 18 de junio. WhatsApp +56 9 9099 1011.',
  keywords: 'tortas día del padre maipú, tortas día del padre pudahuel, tortas día del padre cerrillos, tortas día del padre padre hurtado, tortas día del padre estación central, tortas día del padre santiago, delivery tortas sector poniente santiago, pastelería artesanal maipú, torta para papá maipú',
  alternates: { canonical: 'https://galdi.cl/dia-del-padre' },
  openGraph: {
    title: 'Tortas para el Día del Padre en Maipú | Galdi Pastelería',
    description: 'Tortas artesanales con delivery en Maipú, Pudahuel, Cerrillos, Estación Central, Padre Hurtado y Santiago. Encarga por WhatsApp.',
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
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta de Chocolate" } },
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
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Hacemos delivery en Maipú con un costo de $3.000, o puedes retirar gratis en nuestro local. Encarga hasta el jueves 18 de junio. WhatsApp +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día del Padre a Pudahuel?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Repartimos tortas artesanales a Pudahuel para el Día del Padre con despacho de $3.000. Pedidos hasta el jueves 18 de junio. WhatsApp +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día del Padre a Cerrillos?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Llevamos tortas artesanales a Cerrillos para el Día del Padre con despacho de $3.000. Encarga antes del jueves 18 de junio. WhatsApp +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día del Padre a Estación Central?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Repartimos a Estación Central con despacho de $3.000. Para recibir tu torta el domingo 21 de junio, encarga antes del jueves 18. WhatsApp +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día del Padre a Padre Hurtado?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Llevamos tortas artesanales a Padre Hurtado para el Día del Padre con despacho de $5.000. Encarga hasta el jueves 18 de junio. WhatsApp +56 9 9099 1011." }
              },
              {
                "@type": "Question",
                "name": "¿Hacen delivery de tortas para el Día del Padre a Santiago?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Cubrimos Santiago y otras comunas del Gran Santiago. El costo de despacho varía según la distancia. Consulta disponibilidad directamente por WhatsApp al +56 9 9099 1011 antes del jueves 18 de junio." }
              },
              {
                "@type": "Question",
                "name": "¿Con cuánta anticipación debo encargar la torta?",
                "acceptedAnswer": { "@type": "Answer", "text": "Antes del jueves 18 de junio para asegurar entrega el sábado 20 o domingo 21. En fechas especiales los pedidos se completan rápido." }
              },
              {
                "@type": "Question",
                "name": "¿Qué tortas tienen disponibles para el Día del Padre?",
                "acceptedAnswer": { "@type": "Answer", "text": "Torta Panqueque (capas con manjar o chocolate), Torta de Chocolate (bizcocho húmedo con cobertura de cacao) y Torta 3 Leches. Todas artesanales, hechas en Maipú el mismo día de entrega." }
              },
              {
                "@type": "Question",
                "name": "¿Pueden poner una dedicatoria?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Coordina los detalles por WhatsApp al +56 9 9099 1011 cuando hagas el pedido." }
              }
            ]
          })
        }}
      />
      <SeoPage
        titulo="Tortas para el Día del Padre"
        subtitulo="Encarga con tiempo y llega con algo bueno de verdad"
        descripcion="El 21 de junio se acerca. En Galdi hacemos tortas por encargo en Maipú: Panqueque, Chocolate, 3 Leches. Sin conservantes, hechas el mismo día de entrega. Pedidos por WhatsApp."
        imagen="/images/torta-chocolate-hero.webp"
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
            nombre: "Torta de Chocolate",
            detalle: "Bizcocho húmedo con cobertura y relleno de chocolate. Un clásico para los papás que no fallan.",
            imagen: "/images/torta-chocolate.webp"
          },
          {
            nombre: "Torta 3 Leches",
            detalle: "Esponjosa, con crema chantilly. Un clásico que no falla. Con delivery en Maipú.",
            imagen: "/images/torta-tres-leches.webp"
          },
        ]}
        extraContent={
          <div>
            <div
              id="cobertura-comunas"
              style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(26,15,10,0.96)', borderRadius: '6px' }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, color: '#d4a853', marginBottom: '0.75rem' }}>
                Reparto en Maipú, Pudahuel, Cerrillos, Padre Hurtado, Estación Central y Santiago
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: '#f5e6d3', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                En Galdi repartimos tortas para el Día del Padre en todo el sector poniente del Gran Santiago y más allá.
                Si vives en Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado o Santiago, podemos
                llevarte tu pedido directo a la puerta. Consúltanos por WhatsApp para otras comunas.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem', display: 'grid', gap: '0.4rem' }}>
                {[
                  { comuna: 'Maipú', detalle: 'Retiro gratis en local o despacho $3.000' },
                  { comuna: 'Cerrillos', detalle: 'Despacho $3.000' },
                  { comuna: 'Pudahuel', detalle: 'Despacho $3.000' },
                  { comuna: 'Estación Central', detalle: 'Despacho $3.000' },
                  { comuna: 'Padre Hurtado', detalle: 'Despacho $5.000' },
                  { comuna: 'Santiago y otras comunas', detalle: 'Consultar por WhatsApp' },
                ].map(({ comuna, detalle }) => (
                  <li key={comuna} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
                    <span style={{ color: '#d4a853', fontWeight: 700, minWidth: '200px' }}>{comuna}</span>
                    <span style={{ color: 'rgba(245,230,211,0.85)' }}>{detalle}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'rgba(245,230,211,0.8)', lineHeight: 1.7 }}>
                Encarga antes del <strong style={{ color: '#d4a853' }}>jueves 18 de junio</strong> para asegurar tu torta para el sábado 20 o domingo 21.
              </p>
            </div>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(212,168,83,0.07)', borderRadius: '4px', border: '1px solid rgba(212,168,83,0.15)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, color: '#3d2010', margin: '0 0 0.75rem' }}>
                Preguntas frecuentes
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { q: '¿Hacen delivery a Pudahuel, Cerrillos y Estación Central?', a: 'Sí, a todas esas comunas con despacho de $3.000. A Padre Hurtado es $5.000. Para Santiago y otras comunas, consulta por WhatsApp.' },
                  { q: '¿Con cuánta anticipación debo encargar?', a: 'Antes del jueves 18 de junio para asegurar entrega el fin de semana del Día del Padre.' },
                  { q: '¿Pueden poner una dedicatoria en la torta?', a: 'Sí. Dinos el mensaje cuando hagas el pedido por WhatsApp y lo coordinamos.' },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: '#3d2010', marginBottom: '0.25rem' }}>{q}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.7 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
