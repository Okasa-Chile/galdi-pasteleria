'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Props {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  ctaTexto: string;
  ctaHref: string;
  waTexto: string;
  breadcrumb: string;
  items?: { nombre: string; detalle: string; imagen: string }[];
}

export default function SeoPage({
  titulo, subtitulo, descripcion, imagen,
  ctaTexto, ctaHref, waTexto, breadcrumb, items,
}: Props) {
  const waUrl = `https://wa.me/56990991011?text=${encodeURIComponent(waTexto)}`;

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(280px, 45vh, 480px)', overflow: 'hidden' }}>
        <Image src={imagen} alt={titulo} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.35), rgba(26,15,10,0.75))' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            {breadcrumb}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
            {titulo}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
            {subtitulo}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>

        {/* Descripción */}
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 300, color: '#3d2010', lineHeight: 1.8, marginBottom: '3rem', textAlign: 'center' }}>
          {descripcion}
        </p>

        {/* Items opcionales */}
        {items && items.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {items.map((item) => (
              <div key={item.nombre} style={{ background: '#1a0f0a', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.15)' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image src={item.imagen} alt={item.nombre} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '0.75rem 1rem' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--cream)', marginBottom: '0.25rem' }}>{item.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(245,230,211,0.6)', lineHeight: 1.5 }}>{item.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link href={ctaHref} style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid var(--terracota)' }}>
            {ctaTexto}
          </Link>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#3d2010', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #3d2010' }}>
            Pedir por WhatsApp
          </a>
        </div>

        {/* Volver */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
            ← Volver a Galdi
          </Link>
        </div>
      </div>
    </main>
  );
}
