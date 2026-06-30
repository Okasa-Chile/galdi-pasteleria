import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Banquetería y Cóctel en Maipú · Bocados para Eventos · Galdi',
  description: 'Banquetería completa para eventos en Maipú: cóctel, bocados dulces y salados para matrimonios, cumpleaños y empresas. Presentación elegante. Cotiza con Galdi.',
  keywords: 'banquetería Maipú, banquetes Maipú, cóctel Maipú, banquetería eventos Maipú, bocados cóctel Maipú, catering Maipú',
  alternates: { canonical: 'https://galdi.cl/coctel-maipu' },
};

const faqs = [
  {
    q: '¿Qué incluye la banquetería para eventos en Maipú?',
    a: 'Nuestra banquetería cubre cóctel y recepción completa para matrimonios, cumpleaños, aniversarios y eventos corporativos en Maipú: bocados dulces y salados, brochetas, postres individuales y servicio de presentación elegante. Para torta de novios y mesa de dulces de matrimonio, visita nuestra página dedicada a matrimonios.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar el cóctel?',
    a: 'Para cócteles estándar recomendamos un mínimo de 48 horas de anticipación. Para eventos con más de 50 personas, lo ideal es contactarnos con 5 a 7 días de antelación para garantizar disponibilidad y personalización del menú.',
  },
  {
    q: '¿Hacen delivery para recepciones en Maipú?',
    a: 'Sí. Realizamos delivery en Maipú y comunas aledañas, incluyendo Cerrillos, Pudahuel y Estación Central. El costo de despacho se calcula según la distancia y se informa al momento de la cotización.',
  },
  {
    q: '¿Tienen factura para empresas y particulares?',
    a: 'Sí. Emitimos tanto boleta como factura electrónica para empresas, colegios, organizaciones y particulares. Puedes solicitarla al momento de realizar el pedido.',
  },
  {
    q: '¿Qué bocados incluye el cóctel de Galdi?',
    a: 'Nuestro cóctel incluye canapés, tapaditos, mini empanadas, brochetas de fruta y de carne, y postres individuales. La selección se adapta según el tipo de evento, número de invitados y preferencias del cliente.',
  },
  {
    q: '¿Pueden personalizar la selección de bocados?',
    a: 'Sí. Adaptamos la selección según el número de invitados, el tipo de evento y las preferencias del anfitrión. Contáctanos para recibir una propuesta personalizada con bocados y precios a medida.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'Bakery'],
      '@id': 'https://galdi.cl/#business',
      name: 'Galdi Pastelería Artesanal',
      description:
        'Banquetería artesanal en Maipú para matrimonios, cumpleaños y eventos corporativos: cóctel, canapés, tapaditos, mini empanadas, brochetas y postres individuales elaborados el mismo día. Presentación elegante. Factura electrónica disponible.',
      url: 'https://galdi.cl/coctel-maipu',
      telephone: '+56990991011',
      email: 'ventas@galdi.cl',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pasaje Marcos Echenique 809',
        addressLocality: 'Maipú',
        addressRegion: 'Región Metropolitana',
        postalCode: '9250000',
        addressCountry: 'CL',
      },
      areaServed: [
        { '@type': 'City', name: 'Maipú' },
        { '@type': 'City', name: 'Cerrillos' },
        { '@type': 'City', name: 'Pudahuel' },
        { '@type': 'City', name: 'Estación Central' },
      ],
      servesCuisine: 'Chilean',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cóctel Dulce y Salado',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Canapés',
              description:
                'Variedad de canapés fríos con quesos, embutidos y vegetales sobre pan artesanal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tapaditos',
              description:
                'Mini sandwiches tapados, clásicos del cóctel chileno, con rellenos de pollo, jamón queso y palta.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mini Empanadas',
              description:
                'De pino, queso y queso champiñón. Horneadas el mismo día del evento.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Brochetas de Fruta',
              description:
                'Brochetas dulces con fruta fresca de temporada.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Brochetas de Carne',
              description:
                'Brochetas saladas de carne con vegetales, ideales para servir calientes.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Postres Individuales',
              description:
                'Mini cheesecakes, tartaletas y mousses en formato individual.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bocados Especiales',
              description:
                'Selección según ocasión: matrimonios, cumpleaños y aniversarios.',
            },
          },
        ],
      },
      sameAs: 'https://share.google/s9CQErdNSBOZ8y15P',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://galdi.cl' },
        { '@type': 'ListItem', position: 2, name: 'Eventos', item: 'https://galdi.cl/#servicios' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Banquetería y Cóctel en Maipú',
          item: 'https://galdi.cl/coctel-maipu',
        },
      ],
    },
  ],
};

const bocados = [
  {
    titulo: 'Canapés',
    descripcion:
      'Variedad de canapés fríos con quesos, embutidos y vegetales sobre pan artesanal.',
  },
  {
    titulo: 'Tapaditos',
    descripcion:
      'Mini sandwiches tapados, clásicos del cóctel chileno, con rellenos de pollo, jamón queso y palta.',
  },
  {
    titulo: 'Mini Empanadas',
    descripcion:
      'De pino, queso y queso champiñón. Horneadas el mismo día del evento.',
  },
  {
    titulo: 'Brochetas de Fruta',
    descripcion:
      'Brochetas dulces con fruta fresca de temporada.',
  },
  {
    titulo: 'Brochetas de Carne',
    descripcion:
      'Brochetas saladas de carne con vegetales, ideales para servir calientes.',
  },
  {
    titulo: 'Postres Individuales',
    descripcion:
      'Mini cheesecakes, tartaletas y mousses en formato individual.',
  },
  {
    titulo: 'Bocados Especiales',
    descripcion:
      'Selección según ocasión: matrimonios, cumpleaños y aniversarios.',
  },
];

const ventajas = [
  'Elaboración 100% artesanal, sin conservantes ni mezclas industriales.',
  'Presentación elegante, lista para servir a tus invitados.',
  'Variedad de bocados dulces y salados según tu evento.',
  'Factura electrónica disponible para empresas y particulares.',
  'Entrega puntual en Maipú, Cerrillos, Pudahuel y Estación Central.',
  'Atención directa con las socias fundadoras: Jaqueline e Ingrid.',
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o escríbenos a ventas@galdi.cl.',
  'Cuéntanos el número de invitados, la fecha y el tipo de evento.',
  'Te enviamos una propuesta con bocados y precios en menos de 24 horas.',
  'Confirmamos el pedido y coordinamos la entrega a tu dirección.',
];

export default function CoctelMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero cotizar un cóctel para mi evento')}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

        {/* Hero */}
        <div style={{ position: 'relative', height: 'clamp(280px, 45vh, 480px)', overflow: 'hidden' }}>
          <Image
            src="/images/eventos-coctel.webp"
            alt="Cóctel artesanal para recepciones y eventos en Maipú — Galdi"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.35), rgba(26,15,10,0.75))' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
            <a href="/" style={{ lineHeight: 0, marginBottom: '1.5rem' }}>
              <Image
                src="/images/Nuevologo.webp"
                alt="Galdi — Pastelería Artesanal"
                width={160}
                height={58}
                style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
            </a>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Galdi · Eventos · Social
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Banquetería y Cóctel en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Bocados artesanales para tu recepción. Presentación elegante incluida.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Ofrece banquetería para cócteles y recepciones con bocados
            elaborados el mismo día: canapés, tapaditos, mini empanadas, brochetas y postres
            individuales. Factura electrónica disponible. Entrega en Maipú y comunas cercanas.
          </p>

          {/* Qué incluye */}
          <section aria-labelledby="que-incluye" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="que-incluye"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué incluye nuestro servicio de cóctel?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Preparamos cócteles y recepciones en Maipú con una selección variada de bocados
              dulces y salados, ideales para matrimonios, cumpleaños, aniversarios y eventos
              sociales. Cada bocado se elabora el mismo día y se presenta con un montaje elegante,
              listo para servir directamente a tus invitados. Coordinamos la cantidad según el
              número de asistentes y el estilo de tu evento, con entrega puntual en Maipú y
              comunas cercanas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {bocados.map((b) => (
                <div
                  key={b.titulo}
                  style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{b.titulo}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: '#5a3520', lineHeight: 1.65 }}>{b.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Por qué elegirnos */}
          <section aria-labelledby="por-que-galdi" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="por-que-galdi"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Por qué elegir Galdi para tu cóctel en Maipú?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.9rem' }}>
              {ventajas.map((v, i) => (
                <li
                  key={i}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: '#5a3520', lineHeight: 1.65, paddingLeft: '1.25rem', position: 'relative' }}
                >
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>—</span>
                  {v}
                </li>
              ))}
            </ul>
          </section>

          {/* Cómo cotizar */}
          <section
            aria-labelledby="como-cotizar"
            style={{ marginBottom: '3.5rem', background: '#1a0f0a', padding: '2.5rem', borderRadius: '4px' }}
          >
            <h2
              id="como-cotizar"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.5rem' }}
            >
              Cómo cotizar tu cóctel
            </h2>
            <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
              {pasos.map((paso, i) => (
                <li
                  key={i}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(245,230,211,0.85)', lineHeight: 1.75, marginBottom: '0.75rem' }}
                >
                  {paso}
                </li>
              ))}
            </ol>
          </section>

          {/* Preguntas frecuentes */}
          <section aria-labelledby="preguntas-frecuentes" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="preguntas-frecuentes"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Preguntas frecuentes sobre cóctel en Maipú
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ borderBottom: '1px solid rgba(212,168,83,0.15)', paddingBottom: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#5a3520', lineHeight: 1.75 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
            <Link
              href="/?servicio=eventos&tab=C%C3%B3ctel"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver banquetería cóctel
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#3d2010', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #3d2010' }}
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Internal links — servicios relacionados */}
          <nav
            aria-label="Otros servicios Galdi"
            style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}
          >
            {[
              { href: '/matrimonios-maipu', label: 'Banquetería Matrimonios' },
              { href: '/coffee-break-maipu', label: 'Coffee Break Maipú' },
              { href: '/cumpleanos-maipu', label: 'Cumpleaños en Maipú' },
              { href: '/tortas-maipu', label: 'Tortas en Maipú' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--gold)', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Volver */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}
            >
              ← Volver a Galdi
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
