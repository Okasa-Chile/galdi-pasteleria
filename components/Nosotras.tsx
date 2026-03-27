'use client';

import { useState } from 'react';
import Image from 'next/image';

const valores = [
  { icono: '🌾', label: '100% Artesanal' },
  { icono: '🏠', label: 'Hecho en casa' },
  { icono: '❤️', label: 'Recetas familiares' },
];

export default function Nosotras() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="nosotras" style={{
      padding: '7rem 5%',
      background: 'var(--cream)',
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '5rem',
        alignItems: 'center',
      }}>

        {/* Columna izquierda — Imagen */}
        <div style={{
          position: 'relative',
          aspectRatio: '4/5',
          borderRadius: '4px',
          border: '2px solid var(--gold)',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/Socias_lapiz.webp"
            alt="Jacqueline e Ingrid, fundadoras de Galdi"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Columna derecha — Texto */}
        <div>
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.75rem',
          }}>
            Nuestra Historia
          </p>

          {/* Línea decorativa */}
          <div style={{
            width: '3rem',
            height: '1px',
            background: 'var(--gold)',
            marginBottom: '1.5rem',
          }} />

          {/* Título */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            color: '#3d2010',
            lineHeight: 1.2,
            marginBottom: '2rem',
          }}>
            Con amor,<br />
            <em>desde nuestra cocina</em>
          </h2>

          {/* Párrafos */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}>
            Somos Jacqueline e Ingrid, dos hermanas de Maipú que encontraron en la pastelería su forma de decirle al mundo que el cariño se puede probar. Lo que comenzó como recetas familiares pasadas de generación en generación, hoy llega a su mesa con la misma dedicación de siempre.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Cada producto que sale de nuestra cocina lleva el mismo cuidado que pondríamos en prepararlo para nuestra propia familia. Sin apuros, sin atajos — solo ingredientes buenos y mucho gozo.
          </p>

          {/* Íconos de valores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
          }}>
            {valores.map((v, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'rgba(61,32,16,0.12)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(61,32,16,0.15)',
                  textAlign: 'center',
                  cursor: 'default',
                  opacity: hovered === i ? 0.75 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {v.icono}
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B5E3C',
                  margin: 0,
                }}>
                  {v.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
