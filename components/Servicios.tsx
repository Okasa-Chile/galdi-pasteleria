'use client';

import { useState } from 'react';
import Image from 'next/image';
import ServicioDetalle from './ServicioDetalle';

const servicios = [
  {
    id: 'b2b',
    nombre: 'Distribución Almacenes',
    desc: 'Abastecemos negocios, cafeterías y restaurantes con productos frescos y consistentes.',
    imagen: '/images/svc-b2b.webp',
    wa: 'https://wa.me/56990991011?text=Hola%20Galdi%2C%20quiero%20información%20sobre%20distribución%20B2B',
    icono: '🏪',
  },
  {
    id: 'eventos',
    nombre: 'Eventos',
    desc: 'Banquetería artesanal para matrimonios, cumpleaños y celebraciones corporativas.',
    imagen: '/images/svc-eventos.webp',
    wa: 'https://wa.me/56990991011?text=Hola%20Galdi%2C%20quiero%20banquetería%20para%20un%20evento',
    icono: '🎂',
  },
  {
    id: 'delivery',
    nombre: 'Delivery en Maipú',
    desc: 'Llevamos nuestros productos directo a tu puerta en toda la comuna de Maipú.',
    imagen: '/images/svc-delivery.webp',
    wa: 'https://wa.me/56990991011?text=Hola%20Galdi%2C%20quiero%20hacer%20un%20pedido%20con%20delivery',
    icono: '🚚',
  },
];

export default function Servicios() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof servicios[0] | null>(null);

  return (
    <section id="servicios" style={{
      padding: '2rem 5% 4rem',
      background: '#3d2010',
      scrollMarginTop: '80px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.75rem',
        }}>
          Lo que ofrecemos
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          color: 'var(--cream)',
          lineHeight: 1.2,
        }}>
          Todo lo que <em>necesitas</em>
        </h2>
        <div style={{
          width: '3rem',
          height: '1px',
          background: 'var(--gold)',
          margin: '1.5rem auto 0',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5px',
        maxWidth: '1300px',
        margin: '0 auto',
      }}>
        {servicios.map((svc) => (
          <div
            key={svc.id}
            onMouseEnter={() => setHovered(svc.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(svc)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '4/5',
              cursor: 'pointer',
            }}
          >
            {/* Imagen */}
            <Image
              src={svc.imagen}
              alt={svc.nombre}
              fill
              style={{
                objectFit: 'cover',
                transform: hovered === svc.id ? 'scale(1.07)' : 'scale(1)',
                transition: 'transform 0.85s ease',
              }}
            />

            {/* Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: hovered === svc.id
                ? 'linear-gradient(to top, rgba(26,15,10,0.95) 40%, rgba(26,15,10,0.28) 78%)'
                : 'linear-gradient(to top, rgba(26,15,10,0.88) 28%, rgba(26,15,10,0.08) 70%)',
              transition: 'background 0.4s ease',
            }} />

            {/* Contenido */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2.5rem 2rem',
            }}>
              <div style={{
                fontSize: '1.8rem',
                marginBottom: '0.9rem',
              }}>
                {svc.icono}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.55rem',
                fontWeight: 400,
                color: 'var(--cream-light)',
                marginBottom: '0.75rem',
              }}>
                {svc.nombre}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'rgba(245,230,211,0.75)',
                lineHeight: 1.6,
                marginBottom: '1rem',
                opacity: hovered === svc.id ? 1 : 0,
                transform: hovered === svc.id ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}>
                {svc.desc}
              </p>
              <a
                href={svc.wa}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  opacity: hovered === svc.id ? 1 : 0,
                  transform: hovered === svc.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease 0.06s, transform 0.4s ease 0.06s',
                  display: 'inline-block',
                }}
              >
                Consultar →
              </a>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <ServicioDetalle
          id={selected.id}
          nombre={selected.nombre}
          imagen={selected.imagen}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
