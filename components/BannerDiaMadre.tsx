'use client';
import Link from 'next/link';

export default function BannerDiaMadre() {
  return (
    <div style={{
      background: '#c4704f',
      padding: '9px 16px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      color: '#f5e6d3',
      letterSpacing: '0.03em',
      fontWeight: 400,
    }}>
      <Link
        href="/dia-de-la-madre"
        style={{ color: '#f5e6d3', textDecoration: 'none' }}
      >
        🌸 <strong style={{ fontWeight: 500 }}>Día de la Madre</strong> — Tortas artesanales con delivery en Maipú · Encarga la tuya →
      </Link>
    </div>
  );
}
