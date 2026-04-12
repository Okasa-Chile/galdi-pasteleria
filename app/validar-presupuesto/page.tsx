'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '@/lib/firebase';

interface PresupuestoItem {
  descripcion: string;
  cantidad: number;
  precioUnit: number;
  subtotalLinea: number;
}

interface Presupuesto {
  numero: string;
  cliente: string;
  telefono?: string;
  email?: string;
  validoHasta?: string;
  formaPago?: string;
  items: PresupuestoItem[];
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  creadoEn?: { toDate: () => Date };
}

const fmtNum = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');

const fmtFecha = (v?: string) => {
  if (!v) return '—';
  const [y, m, d] = v.split('-');
  return `${d}/${m}/${y}`;
};

const fmtTs = (ts?: { toDate: () => Date }) => {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid #ede3d4',
      borderTop: '3px solid #C9A55A',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function ValidarContent() {
  const params = useSearchParams();
  const token = params.get('token');
  const [estado, setEstado] = useState<'cargando' | 'no-encontrado' | 'encontrado'>('cargando');
  const [pres, setPres] = useState<Presupuesto | null>(null);

  useEffect(() => {
    if (!token) { setEstado('no-encontrado'); return; }
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'galdi_presupuestos'), where('token', '==', token))
        );
        if (snap.empty) { setEstado('no-encontrado'); return; }
        setPres(snap.docs[0].data() as Presupuesto);
        setEstado('encontrado');
      } catch {
        setEstado('no-encontrado');
      }
    })();
  }, [token]);

  if (estado === 'cargando') return <Spinner />;

  if (estado === 'no-encontrado') {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px' }}>
        <Image
          src="/images/logo-ancho.webp"
          alt="Galdi"
          width={160}
          height={55}
          style={{ objectFit: 'contain', marginBottom: 32 }}
        />
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 12 }}>
          Presupuesto no encontrado
        </h1>
        <p style={{ color: '#888', fontSize: 15, maxWidth: 400, margin: '0 auto' }}>
          El enlace puede haber expirado o el presupuesto no existe.
          Contacta a Galdi para verificar.
        </p>
        <a
          href="https://wa.me/56990991011"
          style={{
            display: 'inline-block', marginTop: 28,
            background: '#C9A55A', color: '#fff',
            padding: '10px 24px', borderRadius: 6,
            textDecoration: 'none', fontWeight: 600,
          }}
        >
          Contactar por WhatsApp
        </a>
      </div>
    );
  }

  if (!pres) return null;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <Image src="/images/logo-ancho.webp" alt="Galdi" width={160} height={55} style={{ objectFit: 'contain' }} />
          <p style={{ fontSize: 12, color: '#3D1F0A', fontWeight: 600, marginTop: 4 }}>Pastelería Artesanal</p>
          <p style={{ fontSize: 11, color: '#888' }}>RUT 78.378.827-6</p>
          <p style={{ fontSize: 11, color: '#888' }}>ventas@galdi.cl · +56 9 9099 1011</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            background: '#C9A55A', color: '#fff', display: 'inline-block',
            padding: '5px 16px', borderRadius: 4,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6,
          }}>
            PRESUPUESTO
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#3D1F0A' }}>{pres.numero}</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>Fecha de emisión: {fmtTs(pres.creadoEn)}</div>
          {pres.validoHasta && (
            <div style={{ fontSize: 11, color: '#888' }}>Válido hasta: {fmtFecha(pres.validoHasta)}</div>
          )}
          {pres.formaPago && (
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
              Pago: {pres.formaPago.charAt(0).toUpperCase() + pres.formaPago.slice(1)}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #C9A55A', marginBottom: 24 }} />

      {/* Datos cliente */}
      <div style={{ background: '#fdf8f2', border: '1px solid #ede3d4', borderRadius: 6, padding: '14px 18px', marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A55A', marginBottom: 8 }}>
          Datos del Cliente
        </div>
        <table style={{ fontSize: 13, borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ color: '#888', paddingRight: 16, paddingBottom: 3, width: 130 }}>Nombre</td>
              <td style={{ fontWeight: 600 }}>{pres.cliente}</td>
            </tr>
            {pres.telefono && (
              <tr>
                <td style={{ color: '#888', paddingBottom: 3 }}>Teléfono</td>
                <td>{pres.telefono}</td>
              </tr>
            )}
            {pres.email && (
              <tr>
                <td style={{ color: '#888', paddingBottom: 3 }}>Email</td>
                <td>{pres.email}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla ítems */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20, fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#3D1F0A', color: '#fff' }}>
            <th style={{ padding: '9px 12px', textAlign: 'left', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Descripción</th>
            <th style={{ padding: '9px 12px', textAlign: 'center', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', width: 60 }}>Cant.</th>
            <th style={{ padding: '9px 12px', textAlign: 'right', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', width: 110 }}>Precio unit.</th>
            <th style={{ padding: '9px 12px', textAlign: 'right', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', width: 110 }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {(pres.items ?? []).map((it, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fdf8f2' : '#fff' }}>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ede3d4' }}>{it.descripcion}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ede3d4', textAlign: 'center' }}>{it.cantidad}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ede3d4', textAlign: 'right' }}>{fmtNum(it.precioUnit)}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ede3d4', textAlign: 'right', fontWeight: 600 }}>{fmtNum(it.subtotalLinea)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
        <table style={{ fontSize: 13, width: 260, borderTop: '1px solid #ede3d4' }}>
          <tbody>
            <tr>
              <td style={{ padding: '5px 12px', color: '#888' }}>Neto (sin IVA):</td>
              <td style={{ padding: '5px 12px', textAlign: 'right' }}>{fmtNum((pres.total ?? 0) - (pres.iva ?? 0))}</td>
            </tr>
            {(pres.descuento ?? 0) > 0 && (
              <tr>
                <td style={{ padding: '5px 12px', color: '#888' }}>Descuento:</td>
                <td style={{ padding: '5px 12px', textAlign: 'right', color: '#c0392b' }}>− {fmtNum(pres.descuento)}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: '5px 12px', color: '#888' }}>IVA (19%):</td>
              <td style={{ padding: '5px 12px', textAlign: 'right' }}>{fmtNum(pres.iva ?? 0)}</td>
            </tr>
            <tr style={{ background: '#3D1F0A', color: '#fff' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, fontSize: 14, borderRadius: '4px 0 0 4px' }}>TOTAL</td>
              <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700, fontSize: 14, borderRadius: '0 4px 4px 0' }}>{fmtNum(pres.total ?? 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pie */}
      <div style={{ borderTop: '1px solid #ede3d4', paddingTop: 14, fontSize: 11, color: '#aaa', textAlign: 'center' }}>
        Presupuesto emitido por Galdi Pastelería Artesanal · RUT 78.378.827-6 · Maipú
      </div>
    </div>
  );
}

export default function ValidarPresupuesto() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5e6d3', fontFamily: 'Jost, sans-serif', color: '#3D1F0A' }}>
      <Suspense fallback={<Spinner />}>
        <ValidarContent />
      </Suspense>
    </div>
  );
}
