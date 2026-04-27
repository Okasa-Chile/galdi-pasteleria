'use client';

import Image from 'next/image';
import { useState } from 'react';

const links = [
  { label: 'Productos',  href: '#productos' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Nosotras',   href: '#nosotras' },
  { label: 'WhatsApp',   href: 'https://wa.me/56990991011' },
  { label: 'Acceso interno', href: '/gestion' },
];

export default function Footer() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [seoOpen, setSeoOpen] = useState(false);

  return (
    <footer style={{
      borderTop: '1px solid rgba(212,168,83,0.1)',
      background: '#3d2010',
      padding: '3rem 5%',
    }}>
      <style>{`
        .footer-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            text-align: center;
          }
          .footer-links {
            justify-content: center;
          }
        }
      `}</style>

      {/* Línea decorativa */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(to right, transparent, var(--gold), var(--terracota), transparent)',
        opacity: 0.35,
        marginBottom: '3rem',
      }} />

      <div className="footer-inner">

        {/* Logo */}
        <a href="#inicio" style={{ display: 'inline-block', opacity: 0.65 }}>
          <Image
            src="/images/Nuevologo.webp"
            alt="Galdi"
            width={120}
            height={34}
            style={{ height: '34px', width: 'auto' }}
          />
        </a>

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          color: 'rgba(245,230,211,0.55)',
          letterSpacing: '0.07em',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.7,
        }}>
          © 2026 Galdi · Pastelería Artesanal · Maipú, Chile<br />
          Gozo en cada bocado
        </p>

        {/* Links */}
        <ul className="footer-links">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: hovered === i ? 'var(--gold)' : 'rgba(245,230,211,0.60)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color var(--transition)',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: seoOpen ? 'var(--gold)' : 'rgba(245,230,211,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: 0 }}>
            Links {seoOpen ? '▲' : '▼'}
          </button>
          {seoOpen && (
            <div style={{ position: 'absolute', bottom: '2rem', right: 0, background: '#2a1205', border: '1px solid rgba(212,168,83,0.2)', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '200px', zIndex: 100 }}>
              {[
                { label: 'Productos artesanales', href: '/productos' },
                { label: 'Empanadas en Maipú', href: '/empanadas-maipu' },
                { label: 'Tortas en Maipú', href: '/tortas-maipu' },
                { label: 'Pan artesanal Maipú', href: '/pan-artesanal-maipu' },
                { label: 'Delivery Maipú', href: '/delivery-maipu' },
                { label: 'Distribución almacenes', href: '/distribucion-maipu' },
                { label: 'Matrimonios Maipú', href: '/matrimonios-maipu' },
                { label: 'Cóctel Maipú', href: '/coctel-maipu' },
                { label: 'Cumpleaños Maipú', href: '/cumpleanos-maipu' },
                { label: 'Coffee Break Maipú', href: '/coffee-break-maipu' },
                { label: 'Día de la Madre', href: '/dia-de-la-madre' },
              ].map((link) => (
                <a key={link.href} href={link.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'rgba(245,230,211,0.55)', textDecoration: 'none', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
