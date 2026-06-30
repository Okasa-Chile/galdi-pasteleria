import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Torta de Bodas y Novios en Maipú · Diseños a Medida · Galdi',
  description: 'Torta de bodas y novios personalizada en Maipú: sabores, rellenos y diseños a medida. Degustación previa sin costo. Cotiza tu torta de matrimonio por WhatsApp.',
  keywords: 'torta bodas Maipú, torta novios Maipú, torta de matrimonio Maipú, torta personalizada bodas Maipú',
  alternates: { canonical: 'https://galdi.cl/tortas-bodas-maipu' },
};

const faqs = [
  {
    q: '¿Cómo personalizo mi torta de bodas en Maipú?',
    a: 'Eliges sabor, relleno, número de pisos y estilo de decoración. Ofrecemos degustación previa sin costo para ajustar sabores antes de confirmar el pedido.',
  },
  {
    q: '¿Qué sabores de torta de novios tiene Galdi?',
    a: 'Disponemos de 3 Leches, Chocolate, Moka, Selva Negra, Hojarasca y Piña. También puedes combinar dos sabores en pisos distintos.',
  },
  {
    q: '¿Cuánto se demora en confirmarse una torta de bodas?',
    a: 'Recomendamos reservar con 3 a 4 semanas de anticipación para matrimonios de 50 o más invitados, y con al menos 15 días para eventos más pequeños.',
  },
  {
    q: '¿Cuánto cuesta una torta de bodas en Maipú?',
    a: 'El precio varía según número de invitados, pisos y nivel de decoración. Cotiza sin compromiso por WhatsApp al +56 9 9099 1011.',
  },
  {
    q: '¿La torta de bodas incluye entrega el día del matrimonio?',
    a: 'Sí, coordinamos entrega en Maipú y comunas cercanas (Cerrillos, Pudahuel, Estación Central) en el horario que necesites para tu evento.',
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
        'Pastelería artesanal en Maipú especializada en tortas de bodas y novios personalizadas: diseños a medida, degustación previa sin costo, entrega el día del matrimonio.',
      url: 'https://galdi.cl/tortas-bodas-maipu',
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
        name: 'Tortas de Bodas Personalizadas',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Torta de Bodas Rústica',
              description: 'Diseño rústico con acabado en buttercream, flores naturales o secas y decoración sencilla y elegante.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Torta de Bodas Elegante',
              description: 'Diseño clásico con cobertura lisa, detalles dorados y decoración floral de azúcar o fondant.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Torta de Bodas Minimalista',
              description: 'Diseño limpio y moderno, con una o dos flores y cobertura lisa en tonos neutros.',
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
        { '@type': 'ListItem', position: 3, name: 'Torta de Bodas en Maipú', item: 'https://galdi.cl/tortas-bodas-maipu' },
      ],
    },
  ],
};

const estilos = [
  {
    titulo: 'Estilo Rústico',
    descripcion: 'Acabado en buttercream texturizado, flores naturales o secas y decoración orgánica que transmite calidez y naturalidad.',
  },
  {
    titulo: 'Estilo Elegante',
    descripcion: 'Cobertura lisa, detalles dorados o plateados y decoración floral de azúcar o fondant para una presentación clásica y sofisticada.',
  },
  {
    titulo: 'Estilo Minimalista',
    descripcion: 'Diseño limpio y moderno con una o dos flores de acento y cobertura en tonos neutros, beige o blanco.',
  },
  {
    titulo: 'Decoración Floral',
    descripcion: 'Flores frescas, flores de azúcar o flores secas según el estilo del matrimonio, coordinadas con la decoración del evento.',
  },
];

const sabores = [
  { titulo: '3 Leches', descripcion: 'Húmeda y esponjosa, bañada en crema de leche. La opción más pedida para matrimonios.' },
  { titulo: 'Chocolate', descripcion: 'Bizcocho de chocolate con relleno de ganache o mousse de chocolate.' },
  { titulo: 'Moka', descripcion: 'Combinación de café y chocolate en bizcocho y relleno. Perfecta para amantes del café.' },
  { titulo: 'Selva Negra', descripcion: 'Bizcocho de chocolate, cerezas y crema chantilly. Clásica y elegante.' },
  { titulo: 'Hojarasca', descripcion: 'Capas crujientes de hojarasca con manjar artesanal. Un clásico chileno para matrimonios.' },
  { titulo: 'Piña', descripcion: 'Bizcocho esponjoso con relleno de piña y crema chantilly. Fresca y tropical.' },
];

const tamanos = [
  { titulo: 'Pequeña (S)', descripcion: 'Hasta 20 invitados. 1 piso. Ideal para ceremonias íntimas o mesa de dulces.' },
  { titulo: 'Mediana (M)', descripcion: 'Hasta 40 invitados. 2 pisos. El formato más popular para matrimonios civiles y religiosos.' },
  { titulo: 'Grande (L)', descripcion: 'Hasta 80 invitados. 3 pisos. Presencia imponente para la recepción.' },
  { titulo: 'Extra Grande (XL)', descripcion: 'Más de 100 invitados. 4 pisos o más. Coordinamos diseño y logística con anticipación.' },
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o escríbenos a ventas@galdi.cl.',
  'Cuéntanos la fecha del matrimonio, número de invitados y el estilo que buscas.',
  'Coordinamos una degustación previa sin costo para elegir sabores y rellenos.',
  'Confirmamos el diseño final y los detalles de entrega el día del matrimonio.',
];

export default function TortasBodasMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero cotizar una torta de bodas para mi matrimonio')}`;

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
            alt="Torta de bodas y novios personalizada en Maipú — Galdi Pastelería Artesanal"
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
              Galdi · Eventos · Matrimonios
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Torta de Bodas en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Diseños a medida. Degustación previa sin costo. Entrega el día de tu matrimonio.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Elabora tortas de bodas y novios personalizadas: sabor, relleno,
            pisos y decoración a elección. Incluye degustación previa sin costo y entrega
            coordinada el día del matrimonio en Maipú y comunas cercanas.
          </p>

          {/* Diseños */}
          <section aria-labelledby="disenos" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="disenos"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Diseños de torta de bodas
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Cada torta de bodas Galdi se diseña en función del estilo del matrimonio:
              rústico, elegante o minimalista. Trabajamos con flores naturales, de azúcar
              o secas según la decoración del evento. El número de pisos se ajusta a la
              cantidad de invitados y a la presencia visual que buscas para tu celebración.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {estilos.map((e) => (
                <div
                  key={e.titulo}
                  style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{e.titulo}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: '#5a3520', lineHeight: 1.65 }}>{e.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sabores y rellenos */}
          <section aria-labelledby="sabores" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="sabores"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Sabores y rellenos
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Disponemos de 6 sabores para tu torta de bodas. En tortas de más de un piso,
              puedes combinar sabores distintos en cada nivel.
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

          {/* Tamaños */}
          <section aria-labelledby="tamanos" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="tamanos"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Tamaños y número de invitados
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {tamanos.map((t) => (
                <div
                  key={t.titulo}
                  style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400, color: '#1a0f0a', marginBottom: '0.5rem' }}>{t.titulo}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: '#5a3520', lineHeight: 1.65 }}>{t.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Degustación previa */}
          <section aria-labelledby="degustacion" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="degustacion"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Degustación previa sin costo
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75 }}>
              Para matrimonios ofrecemos degustación de tortas y dulces antes de confirmar el
              pedido. Esta instancia nos permite ajustar los sabores, rellenos y nivel de dulzor
              exactamente a tus preferencias. Contáctanos por WhatsApp o correo para coordinar
              la degustación sin costo adicional.
            </p>
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
              Cómo cotizar tu torta de bodas
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
              Preguntas frecuentes sobre tortas de bodas en Maipú
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
              href="/matrimonios-maipu"
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
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Internal links */}
          <nav
            aria-label="Otros servicios Galdi"
            style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}
          >
            {[
              { href: '/matrimonios-maipu', label: 'Banquetería Matrimonios' },
              { href: '/coctel-maipu', label: 'Banquetería y Cóctel' },
              { href: '/arma-tu-torta', label: 'Arma tu Torta' },
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
