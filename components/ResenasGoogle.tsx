'use client';

import { useEffect, useState } from 'react';

interface Resena {
  author_name: string;
  text: string;
  rating: number;
  profile_photo_url?: string;
}

export default function ResenasGoogle() {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('ResenasGoogle montado');
    fetch('https://us-central1-galdi-web.cloudfunctions.net/placesReviews')
      .then(r => r.json())
      .then(data => {
        console.log('Respuesta raw:', JSON.stringify(data));
        console.log('Reseñas recibidas:', data);
        setResenas(data);
      })
      .catch((err) => {
        console.log('Error:', err);
        setError(true);
      });
  }, []);

  if (error || resenas.length === 0) return null;

  return (
    <section style={{
      background: '#fdf6ee',
      padding: '3rem 5%',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.67rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#C9A55A',
          marginBottom: '0.6rem',
        }}>
          Lo que dicen de nosotras
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontWeight: 300,
          color: '#3d2010',
          lineHeight: 1.2,
        }}>
          Reseñas de nuestros <em>clientes</em>
        </h2>
        <div style={{ width: '3rem', height: '1px', background: '#C9A55A', margin: '1rem auto 0' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {resenas.map((r, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid rgba(212,168,83,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 12px rgba(61,32,16,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {r.profile_photo_url ? (
                <>
                  <img
                    src={r.profile_photo_url}
                    alt={r.author_name}
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#C9A55A',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    {r.author_name.charAt(0).toUpperCase()}
                  </div>
                </>
              ) : (
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#C9A55A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {r.author_name.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#3d2010',
              }}>
                {r.author_name}
              </span>
            </div>

            <div style={{ color: '#C9A55A', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
              ★★★★★
            </div>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: '#6b4c2a',
              lineHeight: 1.6,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
