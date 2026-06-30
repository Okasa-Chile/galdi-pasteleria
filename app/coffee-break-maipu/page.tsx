import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Coffee Break en Maipú — Galdi Pastelería Artesanal',
  description: 'Servicio de coffee break en Maipú con productos 100% artesanales. Queques, muffins, empanadas y dulces para tu empresa. Factura disponible. Cotiza con Galdi.',
  keywords: 'coffee break Maipú, coffee break empresas Maipú, catering corporativo Maipú, banquetería corporativa Maipú, eventos corporativos Maipú',
  alternates: { canonical: 'https://galdi.cl/coffee-break-maipu' },
};

const faqs = [
  {
    q: '¿Con cuánta anticipación debo pedir el coffee break?',
    a: 'Para coffee breaks estándar recomendamos un mínimo de 48 horas de anticipación. Para eventos con más de 30 personas, lo ideal es contactarnos con al menos 5 días de antelación para garantizar disponibilidad y personalización del menú.',
  },
  {
    q: '¿Hacen delivery del coffee break en Maipú?',
    a: 'Sí. Realizamos delivery en Maipú y comunas aledañas, incluyendo Cerrillos, Pudahuel y Estación Central. El costo de despacho se calcula según la distancia y se informa al momento de la cotización.',
  },
  {
    q: '¿Tienen factura para empresas?',
    a: 'Sí. Emitimos tanto boleta como factura electrónica para empresas, colegios y organizaciones. Puedes solicitarla al momento de realizar el pedido.',
  },
  {
    q: '¿Qué productos incluye el coffee break de Galdi?',
    a: 'Nuestro coffee break incluye mini sandwiches (pollo, jamón queso, vegetales), mini empanadas (pino, queso, queso champiñón), mini tartaletas (pie de limón, kuchen de manzana, kuchen sureño, kuchen de nuez), alfajores de maicena y bebidas calientes. El menú se adapta a las necesidades de tu evento.',
  },
  {
    q: '¿Pueden personalizar el menú del coffee break?',
    a: 'Sí. Adaptamos el menú según las preferencias de tu equipo y restricciones alimentarias. Puedes elegir la combinación de dulces y salados, cantidades por variedad y nivel de presentación. Contáctanos para recibir una propuesta a medida.',
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
        'Pastelería artesanal en Maipú especializada en coffee break para empresas: mini sandwiches, mini empanadas, mini tartaletas, alfajores y bebidas calientes elaborados el mismo día. Factura electrónica disponible.',
      url: 'https://galdi.cl/coffee-break-maipu',
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
        name: 'Coffee Break para Empresas',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mini Sandwiches',
              description:
                'Sandwiches artesanales con pan suave, rellenos de pollo, jamón queso y vegetales frescos.',
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
              name: 'Mini Tartaletas',
              description:
                'Variedad de pie de limón, kuchen de manzana, kuchen sureño y kuchen de nuez.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Alfajores',
              description:
                'Alfajores de maicena rellenos de manjar, hechos el mismo día.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bebidas Calientes',
              description:
                'Café, té y chocolate caliente servidos durante el evento.',
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
          name: 'Coffee Break en Maipú',
          item: 'https://galdi.cl/coffee-break-maipu',
        },
      ],
    },
  ],
};

const servicios = [
  {
    titulo: 'Mini Sandwiches',
    descripcion:
      'Sandwiches artesanales con pan suave, rellenos de pollo, jamón queso y vegetales frescos.',
  },
  {
    titulo: 'Mini Empanadas',
    descripcion:
      'De pino, queso y queso champiñón. Horneadas el mismo día del evento.',
  },
  {
    titulo: 'Mini Tartaletas',
    descripcion:
      'Variedad de pie de limón, kuchen de manzana, kuchen sureño y kuchen de nuez.',
  },
  {
    titulo: 'Alfajores',
    descripcion:
      'Alfajores de maicena rellenos de manjar, hechos el mismo día.',
  },
  {
    titulo: 'Bebidas Calientes',
    descripcion:
      'Café, té y chocolate caliente servidos durante el evento.',
  },
];

const ventajas = [
  'Elaboración 100% artesanal, sin conservantes ni mezclas industriales.',
  'Productos preparados el mismo día del evento para máxima frescura.',
  'Factura electrónica disponible para empresas y organizaciones.',
  'Entrega puntual en Maipú, Cerrillos, Pudahuel y Estación Central.',
  'Menú personalizable según preferencias y restricciones alimentarias.',
  'Atención directa con las socias fundadoras: Jaqueline e Ingrid.',
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o escríbenos a ventas@galdi.cl.',
  'Cuéntanos el número de personas, la fecha y el tipo de evento.',
  'Te enviamos una propuesta con productos y precios en menos de 24 horas.',
  'Confirmamos el pedido y coordinamos la entrega a tu dirección.',
];

export default function CoffeeBreakMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero cotizar un coffee break para mi empresa')}`;

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
            src="/images/Corporativo.webp"
            alt="Coffee break artesanal para empresas en Maipú — Galdi"
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
              Galdi · Eventos · Corporativos
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Coffee Break en Maipú — Galdi Pastelería Artesanal
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Productos artesanales para tu empresa. Factura disponible.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Ofrece servicio de coffee break para empresas, colegios y
            eventos corporativos con productos elaborados el mismo día: mini sandwiches,
            mini empanadas, mini tartaletas, alfajores y bebidas calientes. Factura electrónica disponible.
            Entrega en Maipú y comunas cercanas.
          </p>

          {/* Qué incluye */}
          <section aria-labelledby="que-incluye" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="que-incluye"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué incluye nuestro servicio de coffee break?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Organizamos coffee breaks para empresas, colegios y eventos corporativos en Maipú
              con productos elaborados el mismo día. Nuestro servicio incluye mini sandwiches,
              mini empanadas, mini tartaletas y alfajores preparados con ingredientes frescos
              y sin conservantes artificiales. Cada pedido se presenta de forma prolija, lista para
              servir, con embalaje adecuado para transporte. Coordinamos entrega a domicilio en
              Maipú y comunas cercanas, con puntualidad garantizada para que tu evento comience
              a tiempo.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {servicios.map((s) => (
                <div
                  key={s.titulo}
                  style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{s.titulo}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: '#5a3520', lineHeight: 1.65 }}>{s.descripcion}</p>
                </div>
              ))}
            </div>
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
              Cómo cotizar tu coffee break
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

          {/* Por qué elegirnos */}
          <section aria-labelledby="por-que-galdi" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="por-que-galdi"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Por qué elegir Galdi para tu coffee break en Maipú?
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

          {/* Preguntas frecuentes */}
          <section aria-labelledby="preguntas-frecuentes" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="preguntas-frecuentes"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Preguntas frecuentes sobre coffee break en Maipú
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
              href="/?servicio=eventos&tab=Corporativos"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver opciones de coffee break
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
              { href: '/coctel-maipu', label: 'Cóctel en Maipú' },
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
