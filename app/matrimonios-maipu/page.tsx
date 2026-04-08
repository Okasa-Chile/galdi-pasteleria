import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Banquetería para Matrimonios en Maipú — Galdi Pastelería Artesanal',
  description: 'Galdi ofrece tortas de novios artesanales, mesa de dulces y bocados para matrimonios en Maipú. Pastelería elaborada con recetas familiares. Cotiza sin compromiso: +56 9 9099 1011.',
  keywords: 'banquetería matrimonios Maipú, torta de novios Maipú, mesa dulces matrimonio Maipú, bocados matrimonio Maipú, pastelería artesanal Maipú',
  alternates: { canonical: 'https://galdi.cl/matrimonios-maipu' },
};

const faqs = [
  {
    q: '¿Qué incluye la banquetería para matrimonios de Galdi en Maipú?',
    a: 'El servicio incluye: torta de novios personalizada (sabor y decoración a elección), mesa de postres artesanales (profiteroles, mousse de chocolate, pannacotta, mini cheesecakes, macarons, alfajores de maicena y mini tartaletas de frutas frescas), bocados salados (mini empanadas artesanales, canapés de salmón ahumado, blinis, tartaletas saladas y crostinis con queso crema), servicio de cena y barra de tragos. Todo coordinado para que disfrutes tu día sin preocupaciones.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar la banquetería para mi matrimonio?',
    a: 'Para matrimonios de hasta 30 invitados, recomendamos reservar con al menos 15 días de anticipación. Para eventos de 50 o más personas, lo ideal es contactarnos con 3 a 4 semanas de antelación para garantizar disponibilidad y personalización de tortas y dulces.',
  },
  {
    q: '¿Hacen tortas de novios personalizadas para matrimonios en Maipú?',
    a: 'Sí. Las tortas de novios Galdi se personalizan en sabor, relleno, decoración y número de pisos. Sabores disponibles: 3 Leches, Chocolate, Moka, Selva Negra, Hojarasca y Piña. Puedes solicitar degustación previa antes de confirmar el pedido, sin costo adicional.',
  },
  {
    q: '¿Ofrecen entrega a domicilio para matrimonios en Maipú?',
    a: 'Sí. Realizamos entregas en Maipú y comunas cercanas de la Región Metropolitana, incluyendo Cerrillos, Pudahuel y Estación Central. Coordinamos el horario de entrega con anticipación para que todo llegue en perfectas condiciones el día del matrimonio.',
  },
  {
    q: '¿Cuánto cuesta la banquetería para un matrimonio en Maipú?',
    a: 'El costo varía según el número de invitados, los productos seleccionados y el nivel de personalización. Ofrecemos cotizaciones sin compromiso. Contáctanos por WhatsApp al +56 9 9099 1011 o escríbenos a ventas@galdi.cl para recibir un presupuesto a medida.',
  },
  {
    q: '¿Puedo degustar los productos antes de confirmar el pedido?',
    a: 'Sí. Para matrimonios ofrecemos degustación de tortas y dulces antes de confirmar. Este servicio nos permite ajustar los sabores y rellenos exactamente a tus preferencias. Contáctanos por WhatsApp o correo para coordinar la degustación.',
  },
  {
    q: '¿Qué dulces incluye la mesa de dulces para matrimonios?',
    a: 'Profiteroles, mousse de chocolate o frambuesa, pannacotta, mini cheesecakes, macarons, tiramisú, alfajores de maicena y mini tartaletas de frutas frescas. Todo elaborado artesanalmente con ingredientes frescos y sin conservantes.',
  },
  {
    q: '¿Atienden matrimonios civiles y religiosos en Maipú?',
    a: 'Sí. Galdi atiende tanto matrimonios civiles como religiosos en Maipú y alrededores. Adaptamos el servicio según el formato del evento: recepción formal, cóctel de bienvenida, celebración íntima o banquete completo para grandes grupos.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'FoodEstablishment'],
      '@id': 'https://galdi.cl/#business',
      name: 'Galdi Pastelería Artesanal',
      description:
        'Pastelería artesanal en Maipú especializada en banquetería para matrimonios: tortas de novios personalizadas, mesa de dulces artesanales y bocados salados. Recetas familiares sin conservantes artificiales.',
      url: 'https://galdi.cl/matrimonios-maipu',
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
        name: 'Banquetería para Matrimonios',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Torta de Novios Personalizada',
              description:
                'Torta artesanal para matrimonios personalizable en sabor, relleno y decoración. Sabores: 3 Leches, Chocolate, Moka, Selva Negra, Hojarasca y Piña. Incluye degustación previa sin costo.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mesa de Dulces Artesanales para Matrimonios',
              description:
                'profiteroles, mousse de chocolate o frambuesa, pannacotta, mini cheesecakes, macarons, tiramisú, alfajores de maicena y mini tartaletas de frutas frescas.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bocados Salados para Matrimonios',
              description:
                'Mini empanadas artesanales, canapés de salmón ahumado, blinis, tartaletas saladas y crostinis con queso crema.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'FoodService',
              name: 'Servicio de Cena para Matrimonios',
              description:
                'Plateada al jugo, lomo liso al jugo, filete al champiñón, lomo vetado a la parrilla, pollo relleno y pasta rellena. Menú completo coordinado para tu matrimonio.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'FoodService',
              name: 'Barra de Tragos para Matrimonios',
              description:
                'Pisco sour, vino, champagne, cerveza artesanal, mojito, aperol spritz, whisky y bebidas sin alcohol.',
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
          name: 'Matrimonios en Maipú',
          item: 'https://galdi.cl/matrimonios-maipu',
        },
      ],
    },
  ],
};

const servicios = [
  {
    titulo: 'Torta de Novios',
    descripcion:
      'Personalizable en sabor, relleno y decoración. Sabores: 3 Leches, Chocolate, Moka, Selva Negra, Hojarasca y Piña. Incluye degustación previa sin costo.',
  },
  {
    titulo: 'Mesa de Dulces Artesanales',
    descripcion:
      'profiteroles, mousse de chocolate o frambuesa, pannacotta, mini cheesecakes, macarons, tiramisú, alfajores de maicena y mini tartaletas de frutas frescas.',
  },
  {
    titulo: 'Bocados Salados',
    descripcion:
      'Mini empanadas artesanales, canapés de salmón ahumado, blinis, tartaletas saladas y crostinis con queso crema.',
  },
  {
    titulo: 'Queques y Muffins',
    descripcion:
      'Queques decorados (naranja, mármol, yogurt) y muffins artesanales para completar la mesa dulce o el cóctel de tu matrimonio.',
  },
  {
    titulo: 'Servicio de Cena',
    descripcion: 'Menú de cena completo para tu matrimonio: plateada al jugo, lomo liso al jugo, filete al champiñón, lomo vetado a la parrilla, pollo relleno, pasta rellena y ensaladas frescas de estación. Coordinamos el menú según tus preferencias y número de invitados.',
    icono: '🍽️',
  },
  {
    titulo: 'Barra de Tragos',
    descripcion: 'Barra completa para tu matrimonio: pisco sour, vino tinto y blanco, champagne para el brindis, cerveza artesanal, mojito, aperol spritz, whisky, ron con cola y bebidas sin alcohol para todos los invitados.',
    icono: '🥂',
  },
];

const ventajas = [
  'Elaboración 100% artesanal con recetas familiares transmitidas entre generaciones.',
  'Sin conservantes artificiales: ingredientes frescos y naturales en todos los productos.',
  'Personalización completa en tortas, decoración y sabores según tus preferencias.',
  'Entrega a domicilio en Maipú, Cerrillos, Pudahuel y Estación Central.',
  'Cotización sin compromiso y degustación previa disponible para matrimonios.',
  'Atención directa con las socias fundadoras: Jaqueline e Ingrid Gálvez Díaz.',
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o correo electrónico (ventas@galdi.cl).',
  'Cuéntanos la fecha del matrimonio, número de invitados y los productos que te interesan.',
  'Si lo prefieres, coordinamos una degustación previa de tortas y dulces sin costo.',
  'Confirmamos el pedido con anticipación y acordamos los detalles de entrega.',
];

export default function MatrimoniosMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero información sobre banquetería para mi matrimonio')}`;

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
            src="/images/eventos-matrimonio.webp"
            alt="Banquetería para matrimonios en Maipú — Galdi Pastelería Artesanal"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.35), rgba(26,15,10,0.75))' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Galdi · Eventos · Matrimonios
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Banquetería para Matrimonios en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Tortas de novios, mesa de dulces y banquetería completa para el día más especial.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición — extractable por IA */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Ofrece banquetería completa para matrimonios: torta de novios
            personalizada, mesa de postres artesanales, bocados salados, servicio de cena y barra
            de tragos. Atiende eventos desde 20 hasta más de 100 invitados, con entrega a domicilio
            en Maipú y comunas cercanas.
          </p>

          {/* Qué incluye */}
          <section aria-labelledby="que-incluye" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="que-incluye"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué incluye la banquetería para matrimonios?
            </h2>
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

          {/* Cómo contratar */}
          <section
            aria-labelledby="como-contratar"
            style={{ marginBottom: '3.5rem', background: '#1a0f0a', padding: '2.5rem', borderRadius: '4px' }}
          >
            <h2
              id="como-contratar"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.5rem' }}
            >
              ¿Cómo contratar banquetería para tu matrimonio en Maipú?
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
              ¿Por qué elegir Galdi para la banquetería de tu matrimonio?
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
              Preguntas frecuentes sobre banquetería para matrimonios en Maipú
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
              href="/?servicio=eventos&tab=Matrimonios"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver banquetería matrimonios
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#3d2010', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #3d2010' }}
            >
              Pedir por WhatsApp
            </a>
          </div>

          {/* Internal links — servicios relacionados */}
          <nav
            aria-label="Otros servicios Galdi"
            style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}
          >
            {[
              { href: '/coctel-maipu', label: 'Cóctel en Maipú' },
              { href: '/cumpleanos-maipu', label: 'Cumpleaños en Maipú' },
              { href: '/coffee-break-maipu', label: 'Coffee Break Maipú' },
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
