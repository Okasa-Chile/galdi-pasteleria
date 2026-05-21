'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Catalogo from '@/components/Catalogo';
import Servicios from '@/components/Servicios';
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
      <main>
          <Hero />
          <Catalogo />
          <Servicios />
          <Nosotras />

          {/* Bloque Arma tu Torta */}
          <section style={{
            background: 'linear-gradient(160deg, #fdf6ee 0%, #f7dcc8 50%, #f2c4ce 100%)',
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
          <Footer />
          <WhatsAppFloat />
      </main>
    </>
  );
}
