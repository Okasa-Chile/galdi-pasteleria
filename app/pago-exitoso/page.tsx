import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago Exitoso · Galdi Pastelería',
  robots: { index: false, follow: false },
};

export default function PagoExitosoPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#fdf8f2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        border: '1px solid #e8d9c5',
        padding: '3rem 2.5rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 24px rgba(61,31,10,0.08)',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          color: '#2C1A0E',
          marginBottom: '0.8rem',
          fontWeight: 600,
        }}>
          ¡Pago recibido!
        </h1>

        <p style={{
          fontSize: '1rem',
          color: '#6B4226',
          lineHeight: 1.6,
          marginBottom: '0.5rem',
        }}>
          Tu pedido está confirmado. Jacqueline e Ingrid
          se pondrán en contacto contigo para coordinar
          la entrega.
        </p>

        <p style={{
          fontSize: '0.85rem',
          color: '#9B7B5B',
          marginBottom: '2rem',
        }}>
          Cualquier consulta escríbenos al{' '}
          <a
            href="https://wa.me/56990991011"
            style={{ color: '#C9A55A', fontWeight: 600 }}
          >
            +56 9 9099 1011
          </a>
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#2C1A0E',
            color: '#fff',
            padding: '0.9rem 2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
