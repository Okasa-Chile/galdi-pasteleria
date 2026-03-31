'use client';

import Image from 'next/image';

const categorias = [
  { id: 'pan',       label: 'Pan Artesanal',      imagen: '/images/pan-amasado-new.webp', desc: 'Pan amasado, marraqueta, integral, dobladitas y más. Amasado a mano con receta familiar.' },
  { id: 'pasteles',  label: 'Pasteles & Tartas',   imagen: '/images/prod-pie.webp',        desc: 'Pie de limón, kuchenes, banofee y tartaletas. Perfectos para cualquier ocasión.' },
  { id: 'tortas',    label: 'Tortas por Encargo',  imagen: '/images/Torta 3 Leches.webp', desc: '3 leches, chocolate, selva negra, hojarasca y más. Elaboradas por encargo con ingredientes frescos.' },
  { id: 'dulces',    label: 'Dulces & Alfajores',  imagen: '/images/Berlines.webp',        desc: 'Berlines, chilenitos, alfajores y pasteles rectangulares. Recetas chilenas tradicionales.' },
  { id: 'queques',   label: 'Queques & Muffins',   imagen: '/images/muffins.webp',         desc: 'Queque de naranja, mármol, tradicional y muffins surtidos. Esponjosos y artesanales.' },
  { id: 'empanadas', label: 'Empanadas',           imagen: '/images/empanada-pino.webp',   desc: 'Pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo 1 docena.' },
];

export default function Page() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(280px, 45vh, 480px)', overflow: 'hidden' }}>
        <Image src="/images/New_Hero_socias.webp" alt="Galdi Pastelería Artesanal Maipú" fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.35), rgba(26,15,10,0.75))' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Galdi · Maipú</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Productos Artesanales en Maipú
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(245,230,211,0.85)', maxWidth: '600px' }}>
            Pan, tortas, empanadas, dulces y más — hechos con cariño desde nuestra cocina en Maipú.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem 5% 0.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d2010', textAlign: 'center' }}>
          Pan · Tortas · Empanadas · Pasteles · Queques · Dulces & Alfajores
        </p>
      </div>

      {/* Grid categorías */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 5% 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {categorias.map((cat) => (
          <div key={cat.id} style={{ background: '#1a0f0a', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.15)', cursor: 'default' }}>
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <Image src={cat.imagen} alt={cat.label} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '0.5rem' }}>{cat.label}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(245,230,211,0.65)', lineHeight: 1.6 }}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', padding: '0 5% 3rem' }}>
        <button
          onClick={() => {
            sessionStorage.setItem('scrollTo', 'productos');
            window.location.href = '/';
          }}
          style={{ background: 'var(--terracota)', color: 'var(--cream)', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
          Ver catálogo completo
        </button>
        <button
          onClick={() => { window.location.href = '/#servicios'; }}
          style={{ background: 'transparent', color: '#3d2010', padding: '1rem 2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #3d2010', cursor: 'pointer' }}>
          Hacer un pedido
        </button>
      </div>

      {/* Volver */}
      <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <button
          onClick={() => { window.location.href = '/'; }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Volver a Galdi
        </button>
      </div>

    </main>
  );
}
