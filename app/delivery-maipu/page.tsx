import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Delivery de Pasteles y Tortas en Maipú · Galdi',
  description: 'Delivery de tortas, empanadas y pan artesanal en Maipú y comunas cercanas. Despacho desde $3.000. Pedido por WhatsApp o compra online.',
  keywords: 'delivery pasteles Maipú, delivery tortas Maipú, despacho pastelería Maipú, delivery dulces Maipú',
  alternates: { canonical: 'https://galdi.cl/delivery-maipu' },
};

const faqs = [
  {
    q: '¿Con cuánta anticipación debo pedir el delivery?',
    a: 'Recomendamos 48 horas de anticipación. Para productos del catálogo de compra directa en /productos, el plazo es de 24 horas.',
  },
  {
    q: '¿A qué comunas hacen delivery?',
    a: 'Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado, Lo Prado y resto del Gran Santiago.',
  },
  {
    q: '¿Cuánto cuesta el despacho?',
    a: 'Gratis retirando en Maipú; entre $3.000 y $5.000 en comunas cercanas según la dirección exacta; en otras comunas de la Región Metropolitana el costo se cotiza según distancia junto con el pedido.',
  },
  {
    q: '¿Puedo pagar online el delivery?',
    a: 'Sí, a través de nuestro carrito de compras con pago Flow, o coordinando por WhatsApp.',
  },
  {
    q: '¿Puedo combinar productos de distintas categorías en un mismo pedido con delivery?',
    a: 'Sí, por ejemplo tortas, empanadas y mesa de dulces en un solo despacho, coordinando cantidades y fecha de entrega.',
  },
  {
    q: '¿Hay un monto mínimo para pedir delivery?',
    a: 'Sí, el monto mínimo de pedido para delivery es de $15.000. Para montos menores, puedes retirar sin costo en nuestro local en Maipú.',
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
        'Pastelería artesanal en Maipú con delivery de tortas, empanadas, pan artesanal, cumpleaños y cóctel. Despacho en Maipú y comunas cercanas, con opción de pago online.',
      url: 'https://galdi.cl/delivery-maipu',
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
        { '@type': 'City', name: 'Padre Hurtado' },
        { '@type': 'City', name: 'Lo Prado' },
      ],
      servesCuisine: 'Chilean',
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
        { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://galdi.cl/#servicios' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Delivery en Maipú',
          item: 'https://galdi.cl/delivery-maipu',
        },
      ],
    },
  ],
};

const categorias = [
  { titulo: 'Tortas', href: '/tortas-maipu' },
  { titulo: 'Empanadas', href: '/empanadas-maipu' },
  { titulo: 'Cumpleaños (torta + mesa de dulces)', href: '/cumpleanos-maipu' },
  { titulo: 'Cóctel y Banquetería', href: '/coctel-maipu' },
];

const cobertura = [
  { zona: 'Retiro en Maipú (Pasaje Marcos Echenique 809)', costo: 'Gratis' },
  { zona: 'Comunas cercanas — Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado, Lo Prado', costo: '$3.000 a $5.000 *' },
  { zona: 'Otras comunas de la Región Metropolitana', costo: 'Según distancia' },
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o ventas@galdi.cl, o compra directo desde /productos.',
  'Indícanos productos, cantidad y dirección de entrega.',
  'Te confirmamos disponibilidad, costo de despacho y horario.',
  'Recibe tu pedido fresco directo en tu domicilio.',
];

export default function DeliveryMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero hacer un pedido con delivery en Maipú')}`;

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
            src="/images/svc-delivery.webp"
            alt="Delivery de pasteles y tortas artesanales en Maipú — Galdi"
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
              Galdi · Servicios · Delivery
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Delivery de Pasteles y Tortas en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Recibe nuestros productos artesanales directo en tu puerta.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Qué puedes pedir con delivery */}
          <section aria-labelledby="que-pedir" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="que-pedir"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué puedes pedir con delivery?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              El delivery de Galdi aplica a todo nuestro catálogo artesanal. Elige la categoría que
              buscas y te llevamos directo a los detalles, sabores y precios de cada producto.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {categorias.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  style={{ display: 'block', background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem', textDecoration: 'none' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{c.titulo}</h3>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--gold)' }}>Ver más →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Zonas de cobertura y costos */}
          <section aria-labelledby="cobertura" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="cobertura"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Zonas de cobertura y costos de despacho
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(212,168,83,0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
              {cobertura.map((c) => (
                <div
                  key={c.zona}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: '#fff', padding: '1.25rem 1.5rem' }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#5a3520', lineHeight: 1.6 }}>{c.zona}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--terracota)', fontWeight: 600, whiteSpace: 'nowrap' }}>{c.costo}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#5a3520', fontStyle: 'italic', marginBottom: '0.35rem' }}>
              * El costo en comunas cercanas varía según la dirección exacta; en el resto de la
              Región Metropolitana el despacho se cotiza según distancia junto con el pedido.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#5a3520', fontStyle: 'italic' }}>
              Pedido mínimo para delivery: $15.000.
            </p>
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
              Cómo pedir tu delivery
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
              Preguntas frecuentes sobre delivery en Maipú
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
              href="/productos"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver catálogo completo
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
              { href: '/tortas-maipu', label: 'Tortas en Maipú' },
              { href: '/empanadas-maipu', label: 'Empanadas en Maipú' },
              { href: '/cumpleanos-maipu', label: 'Cumpleaños en Maipú' },
              { href: '/coctel-maipu', label: 'Banquetería y Cóctel' },
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
