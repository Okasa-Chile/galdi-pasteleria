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
      <div className="reveal" style={{
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
            Somos Jacqueline e Ingrid, dos hermanas del sector Las Palmas de Maipú que encontraron en la pastelería artesanal su forma de decirle al mundo que el cariño se puede probar. Lo que comenzó como recetas familiares pasadas de generación en generación, hoy llega a su mesa con la misma dedicación de siempre.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}>
            Cada producto que sale de nuestra cocina en Maipú lleva el mismo cuidado que pondríamos en prepararlo para nuestra propia familia. Sin apuros, sin atajos — solo ingredientes de calidad, recetas probadas y mucho cariño en cada preparación. Así es como entendemos la pastelería artesanal: hecha con las manos, pensada con el corazón.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}>
            Desde nuestras tortas y pasteles hasta el pan artesanal que horneamos cada semana, todo lo que ofrecemos nace del mismo lugar: el deseo de compartir el sabor de lo hecho con cariño. Atendemos pedidos para eventos, delivery en Maipú y distribución a almacenes de la comuna. Si buscas una pastelería artesanal en Maipú con sabor de verdad, estás en el lugar correcto.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}>
            Maipú es nuestra comuna, nuestro hogar y el lugar donde crecimos rodeadas de familias que valoran la mesa compartida. Esa cultura del barrio, donde el vecino comparte lo que preparó con sus manos, es exactamente lo que llevamos a cada pedido. No somos una fábrica: somos dos hermanas que cuidan la calidad de lo que hacen porque saben que del otro lado hay una familia esperando algo bueno.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}>
            Con los años, Galdi creció de boca en boca — la mejor forma de crecer para una pastelería artesanal. Hoy abastecemos almacenes de la comuna, hacemos delivery a domicilio y atendemos eventos de todo tipo, sin perder nunca lo que nos hace distintas: el tiempo, la dedicación y la receta de siempre. Porque cuando algo se hace bien desde el principio, no hace falta cambiarlo.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: '#3d2010',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Nuestro proceso artesanal comienza con la elección de los ingredientes: harina sin blanquear, mantequilla real, huevos frescos y azúcar sin refinar donde la receta lo permite. No usamos mezclas industriales ni saborizantes artificiales — cada masa se trabaja a mano, cada relleno se cocina en el momento y cada torta se decora con paciencia. Ese compromiso con la calidad no es marketing: es la única forma en que sabemos hacer las cosas. Y es también nuestra forma de cuidar a Maipú, la comuna que nos vio crecer y a la que hoy servimos con orgullo y con lo mejor que tenemos.
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
