'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FLOW_URL = 'https://us-central1-galdi-web.cloudfunctions.net/flowCrearOrden';

const COMUNAS_CERCANAS = ['Maipú', 'Cerrillos', 'Pudahuel', 'Estación Central', 'Padre Hurtado', 'Lo Prado'];

function calcularDespacho(comuna: string): number {
  if (!comuna) return 0;
  if (comuna === 'Maipú (retiro en local)') return 0;
  if (COMUNAS_CERCANAS.includes(comuna)) return 3000;
  return 5000;
}

function fechaMinima(): string {
  const ahora = new Date();
  ahora.setHours(ahora.getHours() + 24);
  return ahora.toISOString().split('T')[0];
}

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(tel: string): boolean {
  const limpio = tel.replace(/\s|-|\+/g, '');
  return /^(56)?9\d{8}$/.test(limpio);
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');

interface ItemCarrito {
  nombre: string;
  nombreVisible: string;
  talla?: string;
  precio: number;
  cantidad: number;
  unidad: string;
}

export default function CarritoPage() {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('galdi_carrito');
      if (raw) setItems(JSON.parse(raw));
    } catch { /* nada */ }
    setCargando(false);
  }, []);

  const subtotal = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  const despacho = calcularDespacho(comuna);
  const total = subtotal + despacho;

  async function handlePagar() {
    if (!nombre.trim()) { setError('Ingresa tu nombre completo.'); return; }
    if (!validarEmail(email)) { setError('Email inválido.'); return; }
    if (!validarTelefono(telefono)) { setError('Teléfono inválido. Formato: 9 1234 5678'); return; }
    if (!comuna) { setError('Selecciona una comuna.'); return; }
    if (comuna !== 'Maipú (retiro en local)' && !direccion.trim()) {
      setError('Ingresa la dirección de despacho.');
      return;
    }
    if (!fechaEntrega) { setError('Selecciona fecha de entrega.'); return; }

    setError('');
    setEnviando(true);

    try {
      const descripcion = items.map(it =>
        `${it.cantidad} ${it.nombreVisible}${it.talla ? ` (${it.talla})` : ''}`
      ).join(', ');
      const orden = `GALDI-${Date.now()}`;

      const res = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orden, monto: total, email, descripcion }),
      });
      const data = await res.json();

      if (data.urlPago) {
        sessionStorage.setItem('galdi_pedido_meta', JSON.stringify({
          orden, nombre, email, telefono, comuna, direccion, fechaEntrega, items, total
        }));
        window.location.href = data.urlPago;
      } else {
        setError('No se pudo crear la orden de pago. Intenta nuevamente o contáctanos por WhatsApp.');
        setEnviando(false);
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.');
      setEnviando(false);
    }
  }

  if (cargando) return (
    <div style={{ minHeight: '100vh', background: '#fdf6ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #ede3d4', borderTop: '3px solid #d4a853', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (items.length === 0) return (
    <div style={{ minHeight: '100vh', background: '#fdf6ee', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
      <Image src="/images/Nuevologo.webp" alt="Galdi" width={160} height={55} style={{ objectFit: 'contain' }} />
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#3d2010' }}>Tu carrito está vacío</p>
      <Link href="/productos" style={{ background: '#d4a853', color: '#1a0f0a', padding: '0.75rem 2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px' }}>
        Ver productos
      </Link>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', border: '1px solid #d4c4a8',
    borderRadius: '4px', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
    color: '#1a0f0a', background: '#fff', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: '#5a3520', marginBottom: '0.35rem', display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6ee', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/">
            <Image src="/images/Nuevologo.webp" alt="Galdi" width={140} height={48} style={{ objectFit: 'contain', filter: 'brightness(0.2)' }} />
          </Link>
        </div>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 400, color: '#1a0f0a', marginBottom: '2rem', textAlign: 'center' }}>
          Tu pedido
        </h1>

        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e8d5b7', marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ background: '#1a0f0a', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a853' }}>Productos</span>
          </div>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', borderBottom: i < items.length - 1 ? '1px solid #f0e4ce' : 'none' }}>
              <div>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#1a0f0a' }}>
                  {it.cantidad} × {it.nombreVisible}{it.talla ? ` (${it.talla})` : ''}
                </span>
              </div>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#3d2010', fontWeight: 600 }}>
                {fmt(it.precio * it.cantidad)}
              </span>
            </div>
          ))}
          <div style={{ padding: '0.85rem 1.25rem', borderTop: '2px solid #e8d5b7', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#5a3520' }}>Subtotal</span>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#3d2010' }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#5a3520' }}>Despacho</span>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#3d2010' }}>{despacho === 0 ? 'Gratis (retiro)' : fmt(despacho)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8d5b7' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#1a0f0a', fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#d4a853', fontWeight: 700 }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e8d5b7', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1a0f0a', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a853' }}>Datos de entrega</span>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Nombre completo *</label>
              <input style={inputStyle} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Teléfono *</label>
              <input style={inputStyle} type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="9 1234 5678" />
            </div>
            <div>
              <label style={labelStyle}>Comuna *</label>
              <select style={inputStyle} value={comuna} onChange={e => setComuna(e.target.value)}>
                <option value="">Selecciona tu comuna</option>
                <option value="Maipú (retiro en local)">Maipú — Retiro gratis en local</option>
                <option value="Maipú">Maipú — Despacho $3.000</option>
                <option value="Cerrillos">Cerrillos — Despacho $3.000</option>
                <option value="Pudahuel">Pudahuel — Despacho $3.000</option>
                <option value="Estación Central">Estación Central — Despacho $3.000</option>
                <option value="Padre Hurtado">Padre Hurtado — Despacho $5.000</option>
                <option value="Lo Prado">Lo Prado — Despacho $3.000</option>
                <option value="Otra">Otra comuna Gran Santiago — Despacho $5.000</option>
              </select>
            </div>
            {comuna && comuna !== 'Maipú (retiro en local)' && (
              <div>
                <label style={labelStyle}>Dirección de despacho *</label>
                <input style={inputStyle} value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle, número, depto" />
              </div>
            )}
            <div>
              <label style={labelStyle}>Fecha de entrega *</label>
              <input style={inputStyle} type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} min={fechaMinima()} />
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: '#8a6a4a', marginTop: '0.35rem' }}>
                Mínimo 24 horas de anticipación
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: '6px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: '#5a3520', margin: 0, lineHeight: 1.6 }}>
            🔒 <strong>Pago 100% anticipado.</strong> Al confirmar serás redirigido a Flow para pagar con tarjeta de crédito, débito o transferencia.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #f4a0a0', borderRadius: '6px', padding: '0.85rem 1.25rem', marginBottom: '1.25rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#c0392b', margin: 0 }}>{error}</p>
          </div>
        )}

        <button
          onClick={handlePagar}
          disabled={enviando}
          style={{
            width: '100%', padding: '1rem', background: enviando ? '#a89060' : '#d4a853',
            color: '#1a0f0a', border: 'none', borderRadius: '6px', cursor: enviando ? 'not-allowed' : 'pointer',
            fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem',
          }}
        >
          {enviando ? 'Procesando...' : `Pagar ${fmt(total)} con Flow →`}
        </button>

        <div style={{ textAlign: 'center' }}>
          <Link href="/productos" style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#8a6a4a', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
