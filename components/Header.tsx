'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = ['Productos', 'Servicios', 'Nosotras', 'Contacto'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .header-nav-link {
          color: var(--cream);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          position: relative;
          transition: color var(--transition);
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width var(--transition);
        }
        .header-nav-link:hover {
          color: var(--gold);
        }
        .header-nav-link:hover::after {
          width: 100%;
        }
        .nav-cta {
          border: 1px solid var(--gold) !important;
          color: var(--gold) !important;
          padding: 0.45rem 1.3rem;
          border-radius: 2px;
          background: transparent;
          transition: background var(--transition), color var(--transition);
        }
        .nav-cta::after {
          display: none !important;
        }
        .nav-cta:hover {
          background: var(--gold) !important;
          color: var(--brown-dark) !important;
        }
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .menu-toggle span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--cream);
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .header-nav-desktop { display: none !important; }
          .menu-toggle { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: scrolled ? '0.7rem 5%' : '15px 40px',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(26,15,10,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,168,83,0.12)' : '1px solid transparent',
        transition: 'background var(--transition), padding var(--transition), border-color var(--transition)',
      }}>

        {/* Logo */}
        <a href="#inicio" style={{ lineHeight: 0 }}>
          <Image
            src="/images/Nuevologo.webp"
            alt="Galdi — Pastelería Artesanal"
            width={250}
            height={90}
            style={{
              height: scrolled ? '52px' : '65px',
              width: 'auto',
              maxWidth: '250px',
              objectFit: 'contain',
              transition: 'height var(--transition), filter var(--transition)',
              filter: 'brightness(0) invert(1)',
            }}
            priority
          />
        </a>

        {/* Nav desktop */}
        <nav className="header-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none' }}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="header-nav-link"
            >
              {item}
            </a>
          ))}
          <a
            href="/gestion"
            title="Acceso interno"
            style={{
              color: 'rgba(245,230,211,0.25)',
              fontSize: '0.75rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(212,168,83,0.6)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,230,211,0.25)'}
          >
            🔒
          </a>
          <a
            href="https://wa.me/56990991011?text=Hola%20Galdi!%20Me%20gustar%C3%ADa%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
            className="header-nav-link nav-cta"
          >
            Cotizar
          </a>
        </nav>

        {/* Hamburguesa */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
        </button>
      </header>

      {/* Menú mobile */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '90px',
          left: 0,
          right: 0,
          zIndex: 499,
          background: 'rgba(26,15,10,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2rem',
          borderTop: '1px solid rgba(212,168,83,0.14)',
        }}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="header-nav-link"
              style={{ fontSize: '1rem' }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://wa.me/56990991011?text=Hola%20Galdi!%20Me%20gustar%C3%ADa%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
            className="header-nav-link nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Cotizar
          </a>
        </div>
      )}
    </>
  );
}
