'use client';

import { useState } from 'react';

const CALCULAR_DESPACHO_URL = 'https://us-central1-galdi-web.cloudfunctions.net/calcularCostoDelivery';

interface ResultadoOk {
  km: number;
  costoDelivery: number;
  requiereCotizacionManual: false;
  motivo?: undefined;
}
interface ResultadoFueraDeRadio {
  km: number;
  costoDelivery: null;
  requiereCotizacionManual: true;
  motivo: 'fuera_de_radio';
}
interface ResultadoErrorInfraestructura {
  km: null;
  costoDelivery: null;
  requiereCotizacionManual: true;
  motivo: 'error_infraestructura';
}
type Resultado = ResultadoOk | ResultadoFueraDeRadio | ResultadoErrorInfraestructura;

const FALLBACK_INFRAESTRUCTURA: ResultadoErrorInfraestructura = {
  km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura',
};

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');

export default function CalcularDespachoWidget() {
  const [direccion, setDireccion] = useState('');
  const [calculando, setCalculando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  async function handleCalcular() {
    if (!direccion.trim()) {
      setError('Ingresa tu dirección primero.');
      return;
    }
    setError('');
    setResultado(null);
    setCalculando(true);
    try {
      const res = await fetch(CALCULAR_DESPACHO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direccion }),
      });
      const data = await res.json();
      if (data.error) {
        // Dirección no ubicada/ambigua: hay que corregir el input.
        setError(data.error);
      } else if (typeof data.requiereCotizacionManual === 'boolean') {
        setResultado(data);
      } else {
        // Respuesta inesperada: se trata como falla de infraestructura, no como error de input.
        setResultado(FALLBACK_INFRAESTRUCTURA);
      }
    } catch {
      setResultado(FALLBACK_INFRAESTRUCTURA);
    } finally {
      setCalculando(false);
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '4px', padding: '1.75rem' }}>
      <label
        htmlFor="direccion-despacho"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a3520', marginBottom: '0.5rem', display: 'block' }}
      >
        Tu dirección
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <input
          id="direccion-despacho"
          value={direccion}
          onChange={(e) => { setDireccion(e.target.value); setResultado(null); setError(''); }}
          placeholder="Calle, número, comuna"
          style={{
            flex: '1 1 260px', padding: '0.75rem 1rem', border: '1px solid #d4c4a8',
            borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
            color: '#1a0f0a', background: '#fff',
          }}
        />
        <button
          type="button"
          onClick={handleCalcular}
          disabled={calculando}
          style={{
            padding: '0.75rem 1.75rem', background: calculando ? '#a89060' : 'var(--terracota)',
            color: 'var(--cream)', border: 'none', borderRadius: '4px',
            cursor: calculando ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}
        >
          {calculando ? 'Calculando...' : 'Calcular mi despacho'}
        </button>
      </div>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#5a3520', fontStyle: 'italic', marginTop: '0.85rem', marginBottom: 0 }}>
        Calculado según distancia real desde nuestro local en Maipú.
      </p>

      {error && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#c0392b', marginTop: '1rem', marginBottom: 0 }}>
          {error}
        </p>
      )}

      {resultado && !resultado.requiereCotizacionManual && (
        <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: '4px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#1a0f0a', margin: 0 }}>
            {resultado.km.toFixed(1)} km de nuestro local — despacho:{' '}
            <strong style={{ color: 'var(--terracota)' }}>
              {resultado.costoDelivery === 0 ? 'gratis' : fmt(resultado.costoDelivery)}
            </strong>
          </p>
        </div>
      )}

      {resultado?.motivo === 'fuera_de_radio' && (
        <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'rgba(196,112,79,0.1)', border: '1px solid rgba(196,112,79,0.3)', borderRadius: '4px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#1a0f0a', margin: 0 }}>
            {resultado.km.toFixed(1)} km — tu dirección está fuera de nuestra zona de despacho automático. Escríbenos por WhatsApp y cotizamos tu despacho.
          </p>
        </div>
      )}

      {resultado?.motivo === 'error_infraestructura' && (
        <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'rgba(196,112,79,0.1)', border: '1px solid rgba(196,112,79,0.3)', borderRadius: '4px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#1a0f0a', margin: 0 }}>
            No pudimos calcular el despacho automáticamente — te contactaremos por WhatsApp para coordinar el costo de envío.
          </p>
        </div>
      )}
    </div>
  );
}
