import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tortas Artesanales en Maipú · Por Encargo · Galdi Pastelería',
  description: 'Tortas artesanales por encargo en Maipú: 3 leches, chocolate, selva negra, hojarasca, panqueque y más. Personalizada a tu gusto con Arma tu Torta. Delivery en toda la comuna.',
  keywords: 'tortas Maipú, tortas por encargo Maipú, tortas artesanales Maipú, torta 3 leches Maipú, torta cumpleaños Maipú',
  alternates: { canonical: 'https://galdi.cl/tortas-maipu' },
};

const faqs = [
  {
    q: '¿Con cuánta anticipación debo pedir mi torta?',
    a: 'Recomendamos al menos 48 horas de anticipación. Para tortas personalizadas o de mayor tamaño, ideal coordinar con 3-4 días de anticipación.',
  },
  {
    q: '¿Hacen tortas personalizadas?',
    a: 'Sí, a través de nuestro configurador Arma tu Torta puedes elegir base, relleno, decoración y tamaño según tu gusto.',
  },
  {
    q: '¿Qué tamaños de torta tienen disponibles?',
    a: 'Desde tamaño S (6 a 8 porciones) hasta XL (25 a 30 porciones), ideal para reuniones íntimas o grandes celebraciones.',
  },
  {
    q: '¿Hacen delivery de tortas en Maipú?',
    a: 'Sí, entregamos en Maipú, Cerrillos, Pudahuel y Estación Central. También puedes retirar en nuestro local.',
  },
  {
    q: '¿Tienen opción sin azúcar?',
    a: 'Sí, ofrecemos versión con alulosa para quienes buscan reducir el consumo de azúcar, apta para diabéticos y dietas bajas en azúcar.',
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
        'Tortas artesanales por encargo en Maipú: 3 leches, chocolate, moca, selva negra, panqueque, piña y hojarasca, elaboradas con recetas familiares. Personalización completa con Arma tu Torta. Delivery en toda la comuna.',
      url: 'https://galdi.cl/tortas-maipu',
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
        name: 'Tortas Artesanales',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta 3 Leches',
              description: 'Bizcocho húmedo bañado en tres leches, con un toque de canela.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta de Chocolate',
              description: 'Bizcocho de chocolate intenso con relleno y cobertura a elección.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta Moca',
              description: 'Combinación de café y chocolate en un equilibrio suave y aromático.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta Selva Negra',
              description: 'Bizcocho de chocolate, cerezas y crema chantilly, un clásico infaltable.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta Panqueque',
              description: 'Delicadas capas de panqueques con manjar entre cada una.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta de Piña',
              description: 'Bizcocho esponjoso con piña natural, crema batida y un toque dulce.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Torta de Hojarasca',
              description: 'Delicadas capas de masa crocante unidas con manjar, un clásico chileno.',
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
        { '@type': 'ListItem', position: 2, name: 'Productos', item: 'https://galdi.cl/productos' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tortas en Maipú',
          item: 'https://galdi.cl/tortas-maipu',
        },
      ],
    },
  ],
};

const sabores = [
  {
    titulo: 'Torta 3 Leches',
    descripcion: 'Bizcocho húmedo bañado en tres leches, con un toque de canela.',
  },
  {
    titulo: 'Torta de Chocolate',
    descripcion: 'Bizcocho de chocolate intenso con relleno y cobertura a elección.',
  },
  {
    titulo: 'Torta Moca',
    descripcion: 'Combinación de café y chocolate en un equilibrio suave y aromático.',
  },
  {
    titulo: 'Torta Selva Negra',
    descripcion: 'Bizcocho de chocolate, cerezas y crema chantilly, un clásico infaltable.',
  },
  {
    titulo: 'Torta Panqueque',
    descripcion: 'Delicadas capas de panqueques con manjar entre cada una.',
  },
  {
    titulo: 'Torta de Piña',
    descripcion: 'Bizcocho esponjoso con piña natural, crema batida y un toque dulce.',
  },
  {
    titulo: 'Torta de Hojarasca',
    descripcion: 'Delicadas capas de masa crocante unidas con manjar, un clásico chileno.',
  },
];

const pasos = [
  'Escríbenos por WhatsApp (+56 9 9099 1011) o completa el formulario de Arma tu Torta.',
  'Cuéntanos el sabor, tamaño y fecha que necesitas.',
  'Te confirmamos disponibilidad y coordinamos el pago.',
  'Retiras en Maipú o coordinamos delivery a tu domicilio.',
];

export default function TortasMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero encargar una torta')}`;

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
            src="/images/torta-chocolate-hero.webp"
            alt="Torta artesanal de chocolate — Galdi Pastelería en Maipú"
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
              Galdi · Productos · Tortas
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Tortas Artesanales en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Para cada ocasión, con recetas familiares y el sabor que nos identifica desde siempre.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Elaboramos tortas por encargo con recetas familiares: 3 leches,
            chocolate, moca, selva negra, panqueque, piña y hojarasca, entre otras. Cada torta se
            prepara con ingredientes frescos y puede personalizarse a tu gusto. Delivery en Maipú
            y comunas cercanas.
          </p>

          {/* Nuestros sabores */}
          <section aria-labelledby="nuestros-sabores" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="nuestros-sabores"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Nuestros sabores
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Preparamos tortas por encargo en Maipú para cumpleaños, celebraciones familiares
              y cualquier ocasión especial. Cada sabor se elabora con recetas familiares e
              ingredientes frescos, con la opción de personalizar tamaño, relleno y decoración
              según lo que necesites.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {sabores.map((s) => (
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

          {/* ¿Quieres diseñar tu propia torta? */}
          <section
            aria-labelledby="disena-tu-torta"
            style={{ marginBottom: '3.5rem', background: '#1a0f0a', padding: '2.5rem', borderRadius: '4px', textAlign: 'center' }}
          >
            <h2
              id="disena-tu-torta"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.25rem' }}
            >
              ¿Quieres diseñar tu propia torta?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(245,230,211,0.85)', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              Si prefieres elegir cada detalle — base, relleno, decoración y tamaño — visita
              nuestro configurador Arma tu Torta y arma la torta ideal para tu ocasión.
            </p>
            <Link
              href="/arma-tu-torta"
              style={{ display: 'inline-block', background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Diseña tu torta →
            </Link>
          </section>

          {/* Cómo pedir tu torta */}
          <section aria-labelledby="como-pedir" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="como-pedir"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Cómo pedir tu torta
            </h2>
            <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
              {pasos.map((paso, i) => (
                <li
                  key={i}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '0.75rem' }}
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
              Preguntas frecuentes sobre tortas en Maipú
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
              href="/?servicio=delivery&tab=Tortas"
              style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}
            >
              Ver todas las tortas
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
              { href: '/coffee-break-maipu', label: 'Coffee Break Maipú' },
              { href: '/cumpleanos-maipu', label: 'Cumpleaños en Maipú' },
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
