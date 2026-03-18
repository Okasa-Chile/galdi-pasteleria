'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [btnHovered, setBtnHovered] = useState(false);
  const [igHovered, setIgHovered] = useState(false);

  const handleEnviar = () => {
    const url = `https://wa.me/56990991011?text=Hola%20Galdi!%20Soy%20${encodeURIComponent(nombre)}%20y%20quisiera%20consultar:%20${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <>
    <style>{`
      #contacto input::placeholder,
      #contacto textarea::placeholder {
        color: rgba(245,230,211,0.5);
      }
    `}</style>
    <section id="contacto" style={{
      padding: '5rem 5%',
      background: '#3d2010',
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.75rem',
          }}>
            Escríbenos
          </p>
          <div style={{
            width: '3rem',
            height: '1px',
            background: 'var(--gold)',
            marginBottom: '1.5rem',
          }} />
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}>
            ¿Tienes un pedido<br />
            <em>en mente?</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'rgba(245,230,211,0.75)',
            lineHeight: 1.6,
          }}>
            Cuéntanos qué necesitas y te respondemos a la brevedad por WhatsApp.
          </p>
        </div>

        {/* Grid dos columnas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}>

          {/* Columna izquierda — Formulario */}
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                background: 'rgba(255,255,255,0.13)',
                border: '1px solid rgba(212,168,83,0.5)',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                color: 'var(--cream)',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,168,83,0.5)'}
            />
            <textarea
              placeholder="¿En qué te ayudamos?"
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                background: 'rgba(255,255,255,0.13)',
                border: '1px solid rgba(212,168,83,0.5)',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                color: 'var(--cream)',
                outline: 'none',
                resize: 'vertical',
                width: '100%',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,168,83,0.5)'}
            />
            <button
              onClick={handleEnviar}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--gold)',
                color: '#3d2010',
                border: 'none',
                borderRadius: '4px',
                padding: '1rem 2rem',
                cursor: 'pointer',
                fontWeight: 600,
                opacity: btnHovered ? 0.85 : 1,
                transition: 'opacity 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              Enviar por WhatsApp
            </button>
          </div>
          </div>

          {/* Columna derecha — QR + Instagram */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            {/* QR */}
            <Image
              src="/images/frame.png"
              alt="QR WhatsApp Galdi"
              width={200}
              height={200}
            />
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,230,211,0.75)',
              textAlign: 'center',
              margin: 0,
            }}>
              Escanea para escribirnos
            </p>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/galdi_banqueteria/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIgHovered(true)}
              onMouseLeave={() => setIgHovered(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                textDecoration: 'none',
                opacity: igHovered ? 0.75 : 1,
                transition: 'opacity 0.4s ease',
              }}
            >
              <Instagram size={16} />
              @galdi_banqueteria
            </a>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
