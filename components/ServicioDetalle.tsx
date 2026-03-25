'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ─── Productos por servicio y tab ───────────────────────────────────────────

const productosAlmacenes: Record<string, { nombre: string; imagen: string; unidad: string }[]> = {
  'Pan': [
    { nombre: 'Pan Amasado',               imagen: '/images/Pan Amasado.webp',                  unidad: 'kg' },
    { nombre: 'Tortilla con Chicharrones', imagen: '/images/Tortilla de Chicharrones.webp',      unidad: 'kg' },
    { nombre: 'Pan Integral',              imagen: '/images/Pan integral.webp',                  unidad: 'kg' },
    { nombre: 'Pan Frica',                 imagen: '/images/Pan Frica.webp',                     unidad: 'kg' },
    { nombre: 'Dobladitas',                imagen: '/images/Dobladitas.webp',                    unidad: 'kg' },
    { nombre: 'Marraqueta',                imagen: '/images/Marraquetas.webp',                   unidad: 'kg' },
  ],
  'Queques': [
    { nombre: 'Queque de Naranja', imagen: '/images/Queque de naranja.webp', unidad: 'un' },
    { nombre: 'Queque Mármol',     imagen: '/images/Queque Mármol.webp',     unidad: 'un' },
    { nombre: 'Queque Tradicional',imagen: '/images/queque-tradicional.webp',unidad: 'un' },
  ],
  'Muffins': [
    { nombre: 'Muffins', imagen: '/images/Muffins.webp', unidad: 'docena' },
  ],
  'Dulces': [
    { nombre: 'Berlines',               imagen: '/images/Berlines.webp',    unidad: 'docena' },
    { nombre: 'Alfajores de Manjar',    imagen: '/images/prod-dulces.webp', unidad: 'docena' },
    { nombre: 'Alfajores de Chocolate', imagen: '/images/prod-dulces.webp', unidad: 'docena' },
    { nombre: 'Chilenitos',             imagen: '/images/prod-dulces.webp', unidad: 'docena' },
  ],
  'Empanadas': [
    { nombre: 'Pino',          imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Napolitana',    imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Vegetariana',   imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Queso Camarón', imagen: '/images/prod-empanada.webp', unidad: 'docena' },
  ],
};

const productosDelivery: Record<string, { nombre: string; imagen: string; unidad: string }[]> = {
  'Tortas': [
    { nombre: 'Torta 3 Leches',     imagen: '/images/Torta 3 Leches.webp',     unidad: 'un' },
    { nombre: 'Torta de Chocolate', imagen: '/images/Torta de Chocolate.webp', unidad: 'un' },
    { nombre: 'Moca / Pralinée',    imagen: '/images/Torta Moka.webp',          unidad: 'un' },
    { nombre: 'Selva Negra',        imagen: '/images/Torta Selva negra.webp',   unidad: 'un' },
    { nombre: 'Torta de Piña',      imagen: '/images/Torta de Piña.webp',       unidad: 'un' },
    { nombre: 'Torta de Hojarasca', imagen: '/images/Torta de Hojarasca.webp', unidad: 'un' },
  ],
  'Pasteles': [
    { nombre: 'Pie de Limón Merengado', imagen: '/images/prod-pie.webp',          unidad: 'un' },
    { nombre: 'Kuchen Sureño',          imagen: '/images/Kuchen sureño.webp',      unidad: 'un' },
    { nombre: 'Kuchen de Nuez',         imagen: '/images/Kuchen de Nueces.webp',   unidad: 'un' },
    { nombre: 'Banofee',                imagen: '/images/Banofee.webp',            unidad: 'un' },
    { nombre: 'Tartaletas',             imagen: '/images/Tartaletas.webp',         unidad: 'un' },
  ],
  'Queques': [
    { nombre: 'Queque de Naranja',  imagen: '/images/Queque de naranja.webp',  unidad: 'un' },
    { nombre: 'Queque Mármol',      imagen: '/images/Queque Mármol.webp',      unidad: 'un' },
    { nombre: 'Queque Tradicional', imagen: '/images/queque-tradicional.webp', unidad: 'un' },
  ],
  'Empanadas': [
    { nombre: 'Pino',          imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Napolitana',    imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Vegetariana',   imagen: '/images/prod-empanada.webp', unidad: 'docena' },
    { nombre: 'Queso Camarón', imagen: '/images/prod-empanada.webp', unidad: 'docena' },
  ],
};

const eventosData: Record<string, { imagen: string; desc: string }> = {
  'Matrimonios':  { imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', desc: 'Tortas de novios, mesa de dulces y banquetería completa para el día más especial. Coordinamos contigo cada detalle.' },
  'Cóctel':       { imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80',   desc: 'Bocados dulces y salados para cócteles y recepciones. Presentación elegante lista para servir.' },
  'Cumpleaños':   { imagen: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',   desc: 'Tortas personalizadas, cupcakes y mesa de dulces para celebrar como se merece. Pedidos con 48 hrs de anticipación.' },
  'Corporativos': { imagen: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80', desc: 'Coffee breaks y celebraciones de empresa con productos artesanales. Factura disponible para empresas.' },
};

const WA_NUMBER = '56990991011';

// ─── Mínimos por producto ────────────────────────────────────────────────────

function getMinimo(tab: string, unidad: string): number {
  if (tab === 'Pan') return 10;
  if (unidad === 'docena') return 1;
  if (tab === 'Queques') return 2;
  return 1;
}

function getLabelMinimo(tab: string, unidad: string): string {
  if (tab === 'Pan') return 'mín. 10 kg';
  if (unidad === 'docena') return 'mín. 1 docena';
  if (tab === 'Queques') return 'mín. 2 un';
  return 'mín. 1 un';
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Props {
  id: string;
  nombre: string;
  imagen: string;
  onClose: () => void;
}

type Carrito = Record<string, number>;

// ─── Componente principal ────────────────────────────────────────────────────

export default function ServicioDetalle({ id, nombre, imagen, onClose }: Props) {

  const tabsAlmacenes = Object.keys(productosAlmacenes);
  const tabsDelivery  = Object.keys(productosDelivery);
  const tabsEventos   = Object.keys(eventosData);

  const tabs =
    id === 'b2b'      ? tabsAlmacenes :
    id === 'delivery' ? tabsDelivery  :
    tabsEventos;

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [carrito, setCarrito]     = useState<Carrito>({});
  const [eventoImg, setEventoImg] = useState(eventosData[tabs[0]]?.imagen ?? imagen);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Cambia imagen de fondo en Eventos al cambiar tab
  useEffect(() => {
    if (id === 'eventos' && eventosData[activeTab]) {
      setEventoImg(eventosData[activeTab].imagen);
    }
  }, [activeTab, id]);

  const bgImagen = id === 'eventos' ? eventoImg : imagen;

  // Productos del tab activo
  const productos =
    id === 'b2b'      ? (productosAlmacenes[activeTab] ?? []) :
    id === 'delivery' ? (productosDelivery[activeTab]  ?? []) :
    [];

  // Carrito helpers
  function agregar(nombre: string, tab: string, unidad: string) {
    const min = getMinimo(tab, unidad);
    setCarrito(prev => ({
      ...prev,
      [nombre]: (prev[nombre] ?? 0) + min,
    }));
  }

  function quitar(nombre: string, tab: string, unidad: string) {
    const min = getMinimo(tab, unidad);
    setCarrito(prev => {
      const actual = prev[nombre] ?? 0;
      if (actual <= min) {
        const next = { ...prev };
        delete next[nombre];
        return next;
      }
      return { ...prev, [nombre]: actual - min };
    });
  }

  const totalItems = Object.keys(carrito).length;

  function enviarWhatsApp() {
    const lineas = Object.entries(carrito)
      .map(([nombre, cantidad]) => `• ${cantidad}x ${nombre}`)
      .join('\n');
    const tipo = id === 'b2b' ? 'distribución a almacén' : 'delivery';
    const msg = `Hola Galdi, quiero hacer un pedido de ${tipo}:\n${lineas}\n¿Me pueden cotizar?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', animation: 'svcFadeIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both' }}>
      <style>{`
        @keyframes svcFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .svc-tab { background: none; border: none; border-bottom: 2px solid transparent; color: rgba(245,230,211,0.5); font-family: var(--font-sans); font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.75rem 1.1rem; cursor: pointer; flex-shrink: 0; transition: color 0.25s, border-color 0.25s; }
        .svc-tab.active { color: var(--cream); border-bottom: 2px solid var(--gold); }
        .svc-tab:hover { color: rgba(245,230,211,0.85); }
        .svc-prod-card { background: rgba(26,15,10,0.55); backdrop-filter: blur(4px); border: 1px solid rgba(212,168,83,0.15); display: flex; flex-direction: column; overflow: hidden; transition: border-color 0.25s; }
        .svc-prod-card:hover { border-color: rgba(212,168,83,0.4); }
        .svc-btn-add { background: var(--gold); border: none; color: #1a0f0a; font-family: var(--font-sans); font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.5rem; cursor: pointer; width: 100%; transition: background 0.2s; }
        .svc-btn-add:hover { background: var(--terracota); color: var(--cream); }
        .svc-counter { display: flex; align-items: center; justify-content: space-between; background: rgba(212,168,83,0.15); padding: 0.3rem 0.5rem; }
        .svc-counter button { background: none; border: 1px solid rgba(212,168,83,0.4); color: var(--gold); width: 1.4rem; height: 1.4rem; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; }
        .svc-whatsapp-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(26,15,10,0.95); backdrop-filter: blur(8px); border-top: 1px solid rgba(212,168,83,0.2); padding: 0.75rem 5%; display: flex; align-items: center; justify-content: space-between; z-index: 10001; }
      `}</style>

      {/* ── Imagen de fondo ── */}
      {id === 'eventos' ? (
        <img src={eventoImg} alt={activeTab} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'opacity 0.5s' }} />
      ) : (
        <Image src={bgImagen} alt={nombre} fill style={{ objectFit: 'cover', objectPosition: 'top' }} priority />
      )}

      {/* Gradiente */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.6) 0%, rgba(26,15,10,0.5) 40%, rgba(26,15,10,0.92) 100%)' }} />

      {/* ── Header: logo + tabs + cerrar ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>

        {/* Fila superior: logo + nombre + cerrar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 5%' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/images/Nuevologo.webp" alt="Galdi" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          </button>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)' }}>{nombre}</span>
          <button onClick={onClose} style={{ background: 'rgba(26,15,10,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(245,230,211,0.25)', color: 'var(--cream)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Barra de tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,230,211,0.15)', overflowX: 'auto', paddingLeft: '5%' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`svc-tab${t === activeTab ? ' active' : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── Contenido scrolleable ── */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: 'auto', padding: '1.5rem 5%', paddingBottom: totalItems > 0 ? '5rem' : '1.5rem' }}>

        {/* EVENTOS — descripción + imagen ambiente */}
        {id === 'eventos' && (
          <div style={{ maxWidth: '580px', marginTop: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontWeight: 300, color: 'rgba(245,230,211,0.9)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {eventosData[activeTab]?.desc}
            </p>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola Galdi, quiero información sobre banquetería para ${activeTab}`)}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.85rem 1.8rem', textDecoration: 'none' }}>
              Consultar por WhatsApp
            </a>
          </div>
        )}

        {/* ALMACENES / DELIVERY — grilla de productos */}
        {(id === 'b2b' || id === 'delivery') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
            {productos.map(prod => {
              const enCarrito = carrito[prod.nombre] ?? 0;
              const min = getMinimo(activeTab, prod.unidad);
              const label = getLabelMinimo(activeTab, prod.unidad);
              return (
                <div key={prod.nombre} className="svc-prod-card">
                  {/* Imagen */}
                  <div style={{ position: 'relative', height: '260px' }}>
                    <Image src={prod.imagen} alt={prod.nombre} fill style={{ objectFit: 'cover' }} />
                  </div>
                  {/* Nombre + mínimo */}
                  <div style={{ padding: '0.4rem 0.5rem 0.3rem', flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--cream)', fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{prod.nombre}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'rgba(212,168,83,0.7)', margin: '0.15rem 0 0', letterSpacing: '0.05em' }}>{label}</p>
                  </div>
                  {/* Botón agregar / contador */}
                  {enCarrito === 0 ? (
                    <button className="svc-btn-add" onClick={() => agregar(prod.nombre, activeTab, prod.unidad)}>🛒 AGREGAR</button>
                  ) : (
                    <div className="svc-counter">
                      <button onClick={() => quitar(prod.nombre, activeTab, prod.unidad)}>−</button>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--cream)' }}>{enCarrito} {prod.unidad}</span>
                      <button onClick={() => agregar(prod.nombre, activeTab, prod.unidad)}>+</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Barra carrito fija abajo ── */}
      {totalItems > 0 && (
        <div className="svc-whatsapp-bar">
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--cream)', letterSpacing: '0.08em' }}>
            {totalItems} producto{totalItems > 1 ? 's' : ''} en tu pedido
          </span>
          <button onClick={enviarWhatsApp} style={{ background: '#25D366', border: 'none', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.65rem 1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Enviar pedido por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
