import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { businessSchema } from '@/lib/businessSchema';

export const metadata: Metadata = {
  title: 'Empanadas Artesanales en Maipú · Pino, Napolitana y Más · Galdi',
  description: 'Empanadas artesanales hechas a mano en Maipú: pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo 4 unidades, o por docena para eventos. Cotiza por WhatsApp.',
  keywords: 'empanadas Maipú, empanadas artesanales Maipú, empanadas a domicilio Maipú, empanadas por docena Maipú',
  alternates: { canonical: 'https://galdi.cl/empanadas-maipu' },
};

const faqs = [
  {
    q: '¿Cuál es el pedido mínimo de empanadas en Galdi?',
    a: 'El pedido mínimo es de 4 unidades. Para eventos también puedes pedir por docena, combinando distintos sabores según disponibilidad.',
  },
  {
    q: '¿Qué sabores de empanadas tiene Galdi en Maipú?',
    a: 'Ofrecemos empanada de pino, queso, napolitana, vegetariana (queso champiñón), queso camarón y la exquisita empanada de mariscos al horno, todas hechas a mano con recetas familiares.',
  },
  {
    q: '¿Hacen delivery de empanadas en Maipú?',
    a: 'Sí. Realizamos delivery en Maipú y comunas cercanas: Cerrillos, Pudahuel, Estación Central, Padre Hurtado y Lo Prado.',
  },
  {
    q: '¿Con cuánta anticipación debo pedir empanadas para un evento?',
    a: 'Para pedidos pequeños, 24 a 48 horas de anticipación son suficientes. Para eventos grandes o fechas patrias, recomendamos reservar con una semana de anticipación.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    businessSchema({
      url: 'https://galdi.cl/empanadas-maipu',
      description:
        'Pastelería artesanal en Maipú especializada en empanadas hechas a mano: pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo 4 unidades. Delivery en Maipú y comunas cercanas.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Empanadas Artesanales',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada de Pino',
              description: 'Empanada tradicional con carne, cebolla, huevo duro, aceitunas y pasas. Elaborada con masa artesanal sin mezclas industriales.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada Napolitana',
              description: 'Con tomate, jamón y queso derretido. Una opción clásica perfecta para reuniones.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada Vegetariana',
              description: 'Rellena de queso champiñón. Sin carne, con ingredientes frescos seleccionados.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada de Queso',
              description: 'Rellena de queso fundido, sencilla y sabrosa. Ideal para los más pequeños.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada Queso Camarón',
              description: 'Combinación de camarones frescos y queso fundido en masa artesanal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Empanada de Mariscos',
              description: 'Horneada con mezcla de mariscos frescos y condimentos. La favorita de temporada.',
            },
          },
        ],
      },
    }),
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
        { '@type': 'ListItem', position: 3, name: 'Empanadas en Maipú', item: 'https://galdi.cl/empanadas-maipu' },
      ],
    },
  ],
};

const sabores = [
  {
    titulo: 'Empanada de Pino',
    descripcion:
      'Empanada tradicional con carne, cebolla, huevo duro, aceitunas y pasas. Masa artesanal sin mezclas industriales.',
  },
  {
    titulo: 'Empanada Napolitana',
    descripcion:
      'Con tomate, jamón y queso derretido. Una opción clásica perfecta para reuniones y eventos.',
  },
  {
    titulo: 'Empanada Vegetariana',
    descripcion:
      'Rellena de queso champiñón. Sin carne, con ingredientes frescos seleccionados.',
  },
  {
    titulo: 'Empanada de Queso',
    descripcion:
      'Rellena de queso fundido, sencilla y sabrosa. Ideal para los más pequeños.',
  },
  {
    titulo: 'Empanada Queso Camarón',
    descripcion:
      'Combinación de camarones frescos y queso fundido en masa artesanal.',
  },
  {
    titulo: 'Empanada de Mariscos',
    descripcion:
      'Horneada con mezcla de mariscos frescos y condimentos. La favorita de temporada.',
  },
];

const ventajas = [
  'Empanadas hechas a mano con recetas familiares, sin mezclas industriales.',
  'Masa artesanal preparada a mano, coordinada según la fecha de entrega.',
  'Desde 4 unidades, o por docena para eventos: puedes combinar sabores según tus preferencias.',
  'Delivery en Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado y Lo Prado.',
  'Disponibles para eventos y fechas patrias.',
  'Atención directa con las socias fundadoras: Jacqueline e Ingrid.',
];

const pasos = [
  'Contáctanos por WhatsApp (+56 9 9099 1011) o escríbenos a ventas@galdi.cl.',
  'Cuéntanos los sabores, la cantidad (unidades o docenas) y la fecha de entrega.',
  'Te confirmamos disponibilidad y precio dentro de 24 horas hábiles.',
  'Coordinamos el despacho a tu dirección en Maipú y comunas cercanas.',
];

export default function EmpanadaMaipuPage() {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent('Hola Galdi, quiero pedir empanadas artesanales')}`;

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
            src="/images/empanada-pino.webp"
            alt="Empanadas artesanales hechas a mano en Maipú — Galdi"
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
              Galdi · Productos · Empanadas
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Empanadas Artesanales en Maipú
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
              Hechas a mano con recetas familiares. Mínimo 4 unidades, con delivery.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

          {/* Bloque de definición */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.9, marginBottom: '3.5rem', textAlign: 'center' }}>
            Galdi es una pastelería artesanal ubicada en Pasaje Marcos Echenique 809, Maipú,
            Región Metropolitana. Elabora empanadas hechas a mano con recetas familiares:
            pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo
            de 4 unidades con delivery en Maipú y comunas cercanas.
          </p>

          {/* Qué empanadas ofrece */}
          <section aria-labelledby="sabores" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="sabores"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              ¿Qué empanadas ofrece Galdi en Maipú?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#5a3520', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              En Galdi elaboramos empanadas artesanales con recetas familiares,
              sin mezclas industriales. Cada empanada se prepara a mano y se
              hornea coordinando la fecha de entrega para garantizar frescura y
              sabor. Puedes combinar distintos sabores dentro de tu pedido
              según disponibilidad.
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

          {/* Eventos */}
          <section aria-labelledby="eventos" style={{ marginBottom: '3.5rem' }}>
            <h2
              id="eventos"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#1a0f0a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Empanadas para eventos
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

          {/* Cómo pedir */}
          <section
            aria-labelledby="como-pedir"
            style={{ marginBottom: '3.5rem', background: '#1a0f0a', padding: '2.5rem', borderRadius: '4px' }}
          >
            <h2
              id="como-pedir"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.5rem' }}
            >
              Cómo pedir tus empanadas
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
              Preguntas frecuentes sobre empanadas en Maipú
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
              Ver todas las empanadas
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
            aria-label="Otros productos Galdi"
            style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}
          >
            {[
              { href: '/tortas-maipu', label: 'Tortas en Maipú' },
              { href: '/coctel-maipu', label: 'Banquetería y Cóctel' },
              { href: '/cumpleanos-maipu', label: 'Cumpleaños en Maipú' },
              { href: '/coffee-break-maipu', label: 'Coffee Break Maipú' },
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
