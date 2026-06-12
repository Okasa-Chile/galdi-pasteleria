'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicioDetalle from '@/components/ServicioDetalle';
import EventosOverlay from '@/components/EventosOverlay';
import Nosotras from '@/components/Nosotras';
import FAQ from '@/components/FAQ';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();
  return (
    <>
      <Header />
      <Hero />
      <ServicioDetalle
        id="delivery"
        nombre="Nuestros Productos"
        imagen="/images/svc-delivery.webp"
        pageMode={true}
        onClose={() => {}}
      />
      {/* ── Franja Eventos ── */}
      <section id="servicios" style={{ background: '#1a0f0a', padding: '2rem 0 0', scrollMarginTop: '130px' }}>
        {/* Título */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem', padding: '0 5%' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.67rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Servicios & Eventos
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2 }}>
            Hacemos especiales tus <em>momentos</em>
          </h2>
          <div style={{ width: '3rem', height: '1px', background: 'var(--gold)', margin: '1.25rem auto 0' }} />
        </div>

        {/* Paneles diagonales */}
        <div style={{ position: 'relative', height: '380px', display: 'flex' }}>
          {[
            { label: 'Matrimonios', img: '/images/eventos-matrimonio.webp', href: '/?servicio=eventos&tab=Matrimonios' },
            { label: 'Cóctel',      img: '/images/eventos-coctel.webp',     href: '/?servicio=eventos&tab=C%C3%B3ctel' },
            { label: 'Cumpleaños',  img: '/images/eventos-cumpleanos.webp', href: '/?servicio=eventos&tab=Cumplea%C3%B1os' },
            { label: 'Corporativos',img: '/images/Corporativo.webp',        href: '/?servicio=eventos&tab=Corporativos' },
          ].map((svc, i, arr) => (
            <a key={svc.label} href={svc.href} style={{
              position: 'relative',
              flex: 1,
              overflow: 'hidden',
              clipPath: i === 0
                ? 'polygon(0 0, 110% 0, 95% 100%, 0 100%)'
                : i === arr.length - 1
                ? 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)'
                : 'polygon(5% 0, 110% 0, 95% 100%, 0 100%)',
              marginLeft: i > 0 ? '-3.5%' : 0,
              zIndex: arr.length - i,
              textDecoration: 'none',
              display: 'block',
              transition: 'flex 0.4s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.flex = '1.4'}
            onMouseLeave={e => e.currentTarget.style.flex = '1'}
            >
              <img src={svc.img} alt={svc.label} style={{ width: '115%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,10,0.82) 0%, rgba(26,15,10,0.15) 55%)' }} />
              <div style={{ position: 'absolute', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.08em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(0,0,0,0.6)', display: 'block', marginBottom: '0.4rem' }}>
                  {svc.label}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.9 }}>
                  Ver más →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Nosotras />
      {/* ── Bloque Día del Padre ── */}
      <section style={{
        background: 'linear-gradient(135deg, #3d1f0e 0%, #5a2d0c 50%, #3d1f0e 100%)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.25rem',
      }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.67rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          21 de junio
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.25, margin: 0 }}>
          Día del Padre
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(245,230,211,0.8)', maxWidth: '520px', lineHeight: 1.7, margin: 0 }}>
          Torta Panqueque, Moka o 3 Leches. Hecha el mismo día. Encarga con 48 horas de anticipación.
        </p>
        <a
          href="/dia-del-padre"
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '0.85rem 2.5rem',
            background: 'var(--gold)',
            color: '#1a0f0a',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px',
            fontWeight: 500,
          }}
        >
          Ver tortas →
        </a>
      </section>
      {/* Bloque Arma tu Torta */}
      <section id="arma-tu-torta" style={{
        background: 'linear-gradient(160deg, #fdf6ee 0%, #f7dcc8 50%, #f2c4ce 100%)',
        scrollMarginTop: '130px',
        padding: '3rem 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decoración floral izquierda */}
        <div style={{
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '220px',
          height: '220px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}>
          <img src="/images/arma-tu-torta/flor-esquina-izq-transparent.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {/* Decoración floral derecha */}
        <div style={{
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '220px',
          height: '220px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}>
          <img src="/images/arma-tu-torta/flor-esquina-der-transparent.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#e8a0ae',
          marginBottom: '0.75rem',
        }}>
          ✿ Torta personalizada
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          fontWeight: 400,
          color: '#3d2010',
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}>
          Arma tu Torta ideal
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
          color: '#7a4a2a',
          maxWidth: '480px',
          margin: '0 auto 1.75rem',
          lineHeight: 1.75,
        }}>
          Elige la base, el relleno, la decoración y el tamaño. La elaboramos artesanalmente con los ingredientes que más te gustan.
        </p>
        {/* Línea decorativa */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1.75rem',
        }}>
          <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #e8a0ae)' }} />
          <span style={{ color: '#e8a0ae', fontSize: '0.8rem' }}>✿</span>
          <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #e8a0ae)' }} />
        </div>
        <a
          href="/arma-tu-torta"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fdf6ee',
            background: 'linear-gradient(135deg, #e8a0ae, #c9a55a)',
            padding: '0.85rem 2.5rem',
            borderRadius: '30px',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(232,160,174,0.4)',
          }}
        >
          Diseña tu torta →
        </a>
      </section>
      <FAQ />
      <Contacto />
      <WhatsAppFloat />
      <EventosOverlay />
      <Footer />
    </>
  );
}
