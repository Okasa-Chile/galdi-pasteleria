'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems: { label: string; id?: string; href?: string }[] = [
  { label: 'Productos', id: 'productos' },
  { label: 'Arma tu Torta', id: 'arma-tu-torta' },
  { label: 'Servicios y Eventos', id: 'servicios' },
  { label: 'Nuestra Historia', id: 'nosotras' },
  { label: 'Dudas Frecuentes', id: 'preguntas-frecuentes' },
  { label: 'Contacto y Delivery', id: 'contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalItemsCarrito, setTotalItemsCarrito] = useState(0);

  useEffect(() => {
    const leerCarrito = () => {
      try {
        const raw = sessionStorage.getItem('galdi_carrito');
        if (!raw) { setTotalItemsCarrito(0); return; }
        const items: Array<{ cantidad: number }> = JSON.parse(raw);
        const total = items.reduce((acc, it) => acc + (it.cantidad ?? 0), 0);
        setTotalItemsCarrito(total);
      } catch {
        setTotalItemsCarrito(0);
      }
    };
    leerCarrito();
    window.addEventListener('galdi:carrito-actualizado', leerCarrito);
    window.addEventListener('storage', leerCarrito);
    return () => {
      window.removeEventListener('galdi:carrito-actualizado', leerCarrito);
      window.removeEventListener('storage', leerCarrito);
    };
  }, []);

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
        .nav-cta-cart {
          position: relative;
          display: inline-flex !important;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-cta-cart svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 2.2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: var(--terracota, #c4704f);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(26,15,10,0.93);
          animation: cartBadgePop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0;
        }
        @keyframes cartBadgePop {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.3); }
          100% { transform: scale(1); }
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
        display: 'flex',
        flexDirection: 'column',
        background: scrolled ? 'rgba(26,15,10,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,168,83,0.12)' : '1px solid transparent',
        transition: 'background var(--transition), border-color var(--transition)',
      }}>

        {/* Franja Día del Padre */}
        <div style={{
          background: '#c4704f',
          padding: '7px 16px',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          color: '#f5e6d3',
          letterSpacing: '0.04em',
        }}>
          <a href="/dia-del-padre" style={{ color: '#f5e6d3', textDecoration: 'none', display: 'block' }}>
            🎂 <strong style={{ fontWeight: 500 }}>Día del Padre</strong> — ¡Se viene el 21 de junio! Encarga tu torta artesanal con anticipación →
          </a>
        </div>

        {/* Nav row */}
        <div style={{
          padding: scrolled ? '0.7rem 5%' : '15px 40px',
          minHeight: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
          transition: 'padding var(--transition)',
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
                key={item.href ?? item.id}
                href={item.href ?? `#${item.id}`}
                className="header-nav-link"
              >
                {item.label}
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
            <Link
              href="/carrito"
              className="header-nav-link nav-cta nav-cta-cart"
              aria-label="Ver carrito"
            >
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>Carrito</span>
              {totalItemsCarrito > 0 && (
                <span className="cart-badge">{totalItemsCarrito}</span>
              )}
            </Link>
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

        </div>
      </header>

      {/* Menú mobile */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '122px',
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
              key={item.href ?? item.id}
              href={item.href ?? `#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="header-nav-link"
              style={{ fontSize: '1rem' }}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/carrito"
            className="header-nav-link nav-cta nav-cta-cart"
            onClick={() => setMenuOpen(false)}
            aria-label="Ver carrito"
          >
            <svg viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Carrito</span>
            {totalItemsCarrito > 0 && (
              <span className="cart-badge">{totalItemsCarrito}</span>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
