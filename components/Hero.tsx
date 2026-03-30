'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  { src: '/images/New_Hero_socias.webp', alt: 'Galdi — Pastelería artesanal' },
  { src: '/images/SlideshowPanes.webp', alt: 'Pan artesanal Galdi' },
  { src: '/images/prod-dulces.webp', alt: 'Dulces artesanales Galdi' },
  { src: '/images/prod-pie.webp', alt: 'Pasteles y tartas Galdi' },
  { src: '/images/prod-empanada.webp', alt: 'Empanadas artesanales Galdi' },
  { src: '/images/Reparto.webp', alt: 'Reparto Galdi en Maipú' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .hero-socias {
          object-position: center 30% !important;
          transform: scale(1.2) !important;
        }
      }
    `}</style>
    <section id="inicio" style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {slides.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute',
          inset: 0,
          opacity: i === current ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={slide.src.includes('New_Hero_socias') ? 'hero-socias' : undefined}
            style={{ objectFit: 'cover', objectPosition: slide.src.includes('New_Hero_socias') ? 'center 25%' : 'center', transform: slide.src.includes('New_Hero_socias') ? 'scale(1.4)' : 'none' }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,15,10,0.4) 0%, rgba(26,15,10,0.6) 100%)',
      }} />

      {/* Contenido */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 2rem',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 6vw, 6rem)',
          fontWeight: 300,
          color: 'var(--cream)',
          lineHeight: 1.1,
          marginBottom: '1rem',
          letterSpacing: '0.02em',
        }}>
          El sabor de lo hecho con cariño
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          fontWeight: 300,
          color: 'var(--cream-light)',
          marginBottom: '2.5rem',
          letterSpacing: '0.05em',
        }}>
          Pastelería artesanal · Distribución Almacenes · Eventos
        </p>
        <a
          href="#servicios"
          style={{
            background: 'rgba(196,112,79,0.7)',
            color: 'var(--cream)',
            padding: '1rem 2.5rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'var(--transition)',
            border: '1px solid var(--terracota)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(196,112,79,0.15)';
            e.currentTarget.style.border = '1px solid var(--terracota)';
            e.currentTarget.style.color = 'var(--cream)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(196,112,79,0.7)';
            e.currentTarget.style.border = '1px solid var(--terracota)';
            e.currentTarget.style.color = 'var(--cream)';
          }}
        >
          Ver nuestros productos
        </a>
      </div>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '9999px',
              background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition)',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
    </>
  );
}
