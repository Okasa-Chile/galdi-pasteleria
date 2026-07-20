import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cumpleaños en Maipú: Torta y Mesa de Dulces · Galdi',
  description: 'Celebra tu cumpleaños en Maipú con torta personalizada y mesa de dulces artesanal. Delivery disponible. Pedidos con 48 horas de anticipación.',
  keywords: 'cumpleaños Maipú, torta cumpleaños Maipú, mesa de dulces cumpleaños Maipú, celebración cumpleaños Maipú',
  alternates: { canonical: 'https://galdi.cl/cumpleanos-maipu' },
};

const faqs = [
  {
    q: '¿Con cuánta anticipación debo pedir la torta de cumpleaños?',
    a: 'Recomendamos un mínimo de 48 horas de anticipación para tortas de cumpleaños. Para celebraciones con mesa de dulces incluida, te sugerimos contactarnos con la misma anticipación para coordinar ambos productos juntos.',
  },
  {
    q: '¿Puedo pedir torta y mesa de dulces juntas para el mismo cumpleaños?',
    a: 'Sí, se coordina como un solo pedido con entrega conjunta. Solo cuéntanos la cantidad de invitados y armamos la propuesta completa: torta más mesa de dulces.',
  },
  {
    q: '¿Cuántas personas cubre la mesa de dulces?',
    a: 'Se arma según cantidad de invitados; el precio es por unidad de cada producto, así que se ajusta a cualquier tamaño de evento, desde celebraciones íntimas hasta cumpleaños con muchos invitados.',
  },
  {
    q: '¿Hacen delivery para cumpleaños en Maipú?',
    a: 'Sí, delivery en Maipú y comunas cercanas: Cerrillos, Pudahuel, Estación Central, Padre Hurtado y Lo Prado.',
  },
  {
    q: '¿Puedo personalizar el sabor y diseño de la torta?',
    a: 'Sí, ver opciones de sabores en nuestra página de tortas o diseñarla completa a tu gusto en arma tu torta.',
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
        'Pastelería artesanal en Maipú especializada en celebraciones de cumpleaños: torta personalizada y mesa de dulces artesanal elaboradas el mismo día. Delivery en Maipú y comunas cercanas.',
      url: 'https://galdi.cl/cumpleanos-maipu',
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
        name: 'Mesa de Dulces para Cumpleaños',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name: 'Cheesecake' },
            price: '470',
            priceCurrency: 'CLP',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name: 'Pastelitos Surtidos' },
            price: '450',
            priceCurrency: 'CLP',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name: 'Muffins Surtidos Cóctel' },
            price: '450',
            priceCurrency: 'CLP',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name: 'Brochetas de Frutas' },
            price: '400',
            priceCurrency: 'CLP',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name: 'Galletas Artesanales' },
            price: '350',
            priceCurrency: 'CLP',
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
          name: 'Cumpleaños en Maipú',
          item: 'https://galdi.cl/cumpleanos-maipu',
        },
      ],
    },
  ],
};

const mesaDulces = [
  { titulo: 'Cheesecake', precio: '$470 c/u' },
  { titulo: 'Pastelitos Surtidos', precio: '$450 c/u' },
  { titulo: 'Muffins Surtidos Cóctel', precio: '$450 c/u' },
  { titulo: 'Brochetas de Frutas', precio: '$400 c/u' },
  { titulo: 'Galletas Artesanales', precio: '$350 c/u' },
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o ventas@galdi.cl.',
  'Cuéntanos fecha, cantidad de invitados y si quieres torta, mesa de dulces o ambas.',
  'Te confirmamos disponibilidad y precio en menos de 24 horas.',
  'Coordinamos delivery a tu domicilio en Maipú y comunas cercanas.',
];

export default function CumpleanosMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero información para un cumpleaños')}`;

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
            src="/images/eventos-cumpleanos.webp"
            alt="Torta y mesa de dulces para cumpleaños en Maipú — Galdi"
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
              Galdi · Eventos · Cumpleaños
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Cumpleaños en Maipú: Torta y Mesa de Dulces
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Celebra con productos 100% artesanales, hechos el mismo día.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Qué incluye la celebración */}
          <section aria-labelledby="que-incluye" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="que-incluye"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué incluye la celebración de cumpleaños?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75 }}>
              En Galdi armamos la celebración de cumpleaños completa: torta personalizada a elección
              de sabor y tamaño, mesa de dulces artesanal y, si lo necesitas para más invitados,
              cóctel dulce. Todo elaborado el mismo día del evento, con entrega en Maipú y comunas
              cercanas.
            </p>
          </section>

          {/* Mesa de dulces */}
          <section aria-labelledby="mesa-dulces" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="mesa-dulces"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Mesa de Dulces para Cumpleaños
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1rem' }}>
              {mesaDulces.map((m) => (
                <div
                  key={m.titulo}
                  style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{m.titulo}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--terracota)' }}>{m.precio}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#5a3520', fontStyle: 'italic' }}>
              Precio por unidad, pedido mínimo según cantidad de invitados.
            </p>
          </section>

          {/* Derivación a tortas y arma-tu-torta */}
          <section aria-labelledby="derivacion" style={{ marginBottom: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(212,168,83,0.08)', borderLeft: '3px solid var(--gold)', borderRadius: '2px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>
                ¿Buscas la torta perfecta?
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#5a3520', lineHeight: 1.75, margin: 0 }}>
                Revisa todos nuestros sabores de torta para cualquier ocasión.{' '}
                <Link href="/tortas-maipu" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                  Ver sabores de torta →
                </Link>
              </p>
            </div>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(212,168,83,0.08)', borderLeft: '3px solid var(--gold)', borderRadius: '2px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>
                ¿Prefieres diseñarla tú mismo?
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#5a3520', lineHeight: 1.75, margin: 0 }}>
                Personaliza cada detalle de tu torta de cumpleaños.{' '}
                <Link href="/arma-tu-torta" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                  Diseña tu torta →
                </Link>
              </p>
            </div>
          </section>

          {/* Cómo pedir */}
          <section
            aria-labelledby="como-pedir"
            style={{ marginBottom: '3.5rem', background: '#1a0f0a', padding: '2.5rem', borderRadius: '4px' }}
          >
            <h2
              id="como-pedir"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.5rem' }}
            >
              Cómo pedir tu cumpleaños
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
              Preguntas frecuentes sobre cumpleaños en Maipú
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
              href="/?servicio=eventos&tab=Cumpleaños"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver mesa de dulces completa
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
              { href: '/tortas-maipu', label: 'Tortas en Maipú' },
              { href: '/arma-tu-torta', label: 'Arma tu Torta' },
              { href: '/coctel-maipu', label: 'Banquetería y Cóctel' },
              { href: '/matrimonios-maipu', label: 'Matrimonios en Maipú' },
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
