'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PEDIDO_MINIMO_DELIVERY } from '@/lib/deliveryPricing';

const FLOW_URL = 'https://us-central1-galdi-web.cloudfunctions.net/flowCrearOrden';
const CALCULAR_DESPACHO_URL = 'https://us-central1-galdi-web.cloudfunctions.net/calcularCostoDelivery';

interface DespachoOk {
  km: number;
  costoDelivery: number;
  requiereCotizacionManual: false;
  motivo?: undefined;
}
interface DespachoFueraDeRadio {
  km: number;
  costoDelivery: null;
  requiereCotizacionManual: true;
  motivo: 'fuera_de_radio';
}
interface DespachoErrorInfraestructura {
  km: null;
  costoDelivery: null;
  requiereCotizacionManual: true;
  motivo: 'error_infraestructura';
}
type DespachoInfo = DespachoOk | DespachoFueraDeRadio | DespachoErrorInfraestructura;

const MENSAJE_FUERA_DE_RADIO =
  'Tu dirección está fuera de nuestra zona de despacho automático — te contactaremos por WhatsApp para coordinar.';
const MENSAJE_FALLO_INFRAESTRUCTURA =
  'No pudimos calcular el despacho automáticamente — te contactaremos por WhatsApp para coordinar el costo de envío.';
const FALLBACK_INFRAESTRUCTURA: DespachoErrorInfraestructura = {
  km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura',
};

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
  const [modoEntrega, setModoEntrega] = useState<'' | 'retiro' | 'domicilio'>('');
  const [direccion, setDireccion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  const [despachoInfo, setDespachoInfo] = useState<DespachoInfo | null>(null);
  const [calculandoDespacho, setCalculandoDespacho] = useState(false);
  const [errorDespacho, setErrorDespacho] = useState('');

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('galdi_carrito');
      if (raw) setItems(JSON.parse(raw));
    } catch { /* nada */ }
    setCargando(false);
  }, []);

  const subtotal = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  const despacho = modoEntrega === 'domicilio' ? (despachoInfo?.costoDelivery ?? 0) : 0;
  const total = subtotal + despacho;

  const pedidoBajoMinimo = modoEntrega === 'domicilio' && subtotal < PEDIDO_MINIMO_DELIVERY;

  async function handleCalcularDespacho() {
    if (!direccion.trim()) {
      setErrorDespacho('Ingresa tu dirección primero.');
      return;
    }
    setErrorDespacho('');
    setDespachoInfo(null);
    setCalculandoDespacho(true);
    try {
      const res = await fetch(CALCULAR_DESPACHO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direccion }),
      });
      const data = await res.json();
      if (data.error) {
        // Dirección no ubicada/ambigua: es un problema del input, sí bloquea.
        setErrorDespacho(data.error);
      } else if (typeof data.requiereCotizacionManual === 'boolean') {
        // Éxito, fuera de radio, o fallback de infraestructura ya vienen bien
        // formados desde la Cloud Function — ninguno de estos bloquea el pedido.
        setDespachoInfo(data);
      } else {
        // Respuesta inesperada: se trata igual que una falla de infraestructura,
        // nunca como bloqueo del pedido.
        setDespachoInfo(FALLBACK_INFRAESTRUCTURA);
      }
    } catch {
      // Falla de red entre el navegador y nuestra función: mismo criterio,
      // no bloquea, se coordina el despacho por WhatsApp.
      setDespachoInfo(FALLBACK_INFRAESTRUCTURA);
    } finally {
      setCalculandoDespacho(false);
    }
  }

  async function handlePagar() {
    if (!nombre.trim()) { setError('Ingresa tu nombre completo.'); return; }
    if (!validarEmail(email)) { setError('Email inválido.'); return; }
    if (!validarTelefono(telefono)) { setError('Teléfono inválido. Formato: 9 1234 5678'); return; }
    if (!modoEntrega) { setError('Elige retiro en local o despacho a domicilio.'); return; }
    if (modoEntrega === 'domicilio') {
      if (!direccion.trim()) { setError('Ingresa la dirección de despacho.'); return; }
      if (pedidoBajoMinimo) {
        setError(`Pedido mínimo para delivery: ${fmt(PEDIDO_MINIMO_DELIVERY)} — puedes retirar sin costo en nuestro local.`);
        return;
      }
      if (!despachoInfo) { setError('Calcula el costo de despacho antes de continuar.'); return; }
      if (despachoInfo.motivo === 'fuera_de_radio') {
        setError(MENSAJE_FUERA_DE_RADIO);
        return;
      }
      // motivo === 'error_infraestructura': NO bloquea. Un fallo nuestro de
      // infraestructura no puede impedir la venta — el pedido avanza y el
      // despacho queda marcado para coordinar por WhatsApp (ver descripción
      // enviada a Flow más abajo).
    }
    if (!fechaEntrega) { setError('Selecciona fecha de entrega.'); return; }

    setError('');
    setEnviando(true);

    try {
      const despachoSinCalcular = modoEntrega === 'domicilio' && despachoInfo?.motivo === 'error_infraestructura';
      let descripcion = items.map(it =>
        `${it.cantidad} ${it.nombreVisible}${it.talla ? ` (${it.talla})` : ''}`
      ).join(', ');
      if (despachoSinCalcular) {
        descripcion = `⚠️ DESPACHO SIN CALCULAR (coordinar por WhatsApp) — ${descripcion}`;
      }
      const orden = `GALDI-${Date.now()}`;

      const res = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orden, monto: total, email, descripcion }),
      });
      const data = await res.json();

      if (data.urlPago) {
        sessionStorage.setItem('galdi_pedido_meta', JSON.stringify({
          orden, nombre, email, telefono, modoEntrega, direccion, despachoInfo, despachoSinCalcular, fechaEntrega, items, total
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
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#3d2010' }}>
                {modoEntrega === 'retiro' && 'Gratis (retiro)'}
                {modoEntrega === 'domicilio' && despachoInfo && !despachoInfo.requiereCotizacionManual && fmt(despacho)}
                {modoEntrega === 'domicilio' && despachoInfo?.requiereCotizacionManual && 'A cotizar'}
                {modoEntrega === 'domicilio' && !despachoInfo && 'Por calcular'}
                {!modoEntrega && '—'}
              </span>
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
              <label style={labelStyle}>Forma de entrega *</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => { setModoEntrega('retiro'); setDespachoInfo(null); setErrorDespacho(''); }}
                  style={{
                    flex: 1, padding: '0.65rem', borderRadius: '4px', cursor: 'pointer',
                    fontFamily: 'Jost, sans-serif', fontSize: '0.85rem',
                    border: modoEntrega === 'retiro' ? '2px solid #d4a853' : '1px solid #d4c4a8',
                    background: modoEntrega === 'retiro' ? 'rgba(212,168,83,0.12)' : '#fff',
                    color: '#1a0f0a', fontWeight: modoEntrega === 'retiro' ? 700 : 400,
                  }}
                >
                  Retiro en local (gratis)
                </button>
                <button
                  type="button"
                  onClick={() => setModoEntrega('domicilio')}
                  style={{
                    flex: 1, padding: '0.65rem', borderRadius: '4px', cursor: 'pointer',
                    fontFamily: 'Jost, sans-serif', fontSize: '0.85rem',
                    border: modoEntrega === 'domicilio' ? '2px solid #d4a853' : '1px solid #d4c4a8',
                    background: modoEntrega === 'domicilio' ? 'rgba(212,168,83,0.12)' : '#fff',
                    color: '#1a0f0a', fontWeight: modoEntrega === 'domicilio' ? 700 : 400,
                  }}
                >
                  Despacho a domicilio
                </button>
              </div>
            </div>
            {modoEntrega === 'domicilio' && (
              <div>
                <label style={labelStyle}>Dirección de despacho *</label>
                <input
                  style={inputStyle}
                  value={direccion}
                  onChange={e => { setDireccion(e.target.value); setDespachoInfo(null); setErrorDespacho(''); }}
                  placeholder="Calle, número, comuna"
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={handleCalcularDespacho}
                    disabled={calculandoDespacho}
                    style={{
                      padding: '0.5rem 1rem', background: '#f0e4ce', color: '#3d2010',
                      border: '1px solid #d4c4a8', borderRadius: '4px',
                      cursor: calculandoDespacho ? 'not-allowed' : 'pointer',
                      fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}
                  >
                    {calculandoDespacho ? 'Calculando...' : 'Calcular despacho'}
                  </button>
                  {despachoInfo && !despachoInfo.requiereCotizacionManual && (
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#5a3520' }}>
                      {despachoInfo.km.toFixed(1)} km — {despachoInfo.costoDelivery === 0 ? 'gratis' : fmt(despachoInfo.costoDelivery)}
                    </span>
                  )}
                </div>
                {errorDespacho && (
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#c0392b', marginTop: '0.5rem' }}>
                    {errorDespacho}
                  </p>
                )}
                {despachoInfo?.motivo === 'fuera_de_radio' && (
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#c0392b', marginTop: '0.5rem' }}>
                    {MENSAJE_FUERA_DE_RADIO}
                  </p>
                )}
                {despachoInfo?.motivo === 'error_infraestructura' && (
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#8a6a4a', marginTop: '0.5rem' }}>
                    {MENSAJE_FALLO_INFRAESTRUCTURA}
                  </p>
                )}
                {pedidoBajoMinimo && (
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#c0392b', marginTop: '0.5rem' }}>
                    Pedido mínimo para delivery: {fmt(PEDIDO_MINIMO_DELIVERY)} — puedes retirar sin costo en nuestro local.
                  </p>
                )}
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
