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

          {/* Bloque SEO Día de la Madre */}
          <section style={{
            background: 'linear-gradient(135deg, #c4704f 0%, #a85a3a 100%)',
            padding: '2.5rem 5%',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,230,211,0.75)',
              marginBottom: '0.5rem',
            }}>
              🌸 Edición especial
            </p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: 300,
              color: '#f5e6d3',
              marginBottom: '0.75rem',
              lineHeight: 1.3,
            }}>
              Tortas artesanales para el Día de la Madre en Maipú
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'rgba(245,230,211,0.85)',
              maxWidth: '520px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.7,
            }}>
              Tortas personalizadas con delivery en toda la Región Metropolitana.
              Encarga la tuya con anticipación.
            </p>
            <a
              href="/dia-de-la-madre"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#c4704f',
                background: '#f5e6d3',
                padding: '0.75rem 2rem',
                borderRadius: '2px',
                textDecoration: 'none',
              }}
            >
              Ver tortas →
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
