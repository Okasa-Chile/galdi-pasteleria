'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { imagenes } from './Catalogo';

// ─── Productos por servicio y tab ───────────────────────────────────────────

const productosAlmacenes: Record<string, { nombre: string; imagen: string; unidad: string }[]> = {
  'Pan': [
    { nombre: 'Pan Amasado',               imagen: imagenes['Pan Amasado'],               unidad: 'kg' },
    { nombre: 'Tortilla con Chicharrones', imagen: imagenes['Tortilla con Chicharrones'], unidad: 'unidad' },
    { nombre: 'Pan Integral',              imagen: imagenes['Pan Integral'],              unidad: 'kg' },
    { nombre: 'Pan Frica',                 imagen: imagenes['Pan Frica'],                 unidad: 'kg' },
    { nombre: 'Dobloditas',                imagen: imagenes['Dobloditas'],                unidad: 'kg' },
    { nombre: 'Marraqueta',                imagen: imagenes['Marraqueta'],                unidad: 'kg' },
  ],
  'Queques': [
    { nombre: 'Queque de Naranja',  imagen: imagenes['Queque de Naranja'],  unidad: 'un' },
    { nombre: 'Queque Mármol',      imagen: imagenes['Queque Mármol'],      unidad: 'un' },
    { nombre: 'Queque Tradicional', imagen: imagenes['Queque Tradicional'], unidad: 'un' },
  ],
  'Muffins': [
    { nombre: 'Muffins', imagen: imagenes['Muffins'], unidad: 'docena' },
  ],
  'Dulces': [
    { nombre: 'Berlines',               imagen: imagenes['Berlines'],               unidad: 'docena' },
    { nombre: 'Alfajores de Manjar',    imagen: imagenes['Alfajores de Manjar'],    unidad: 'docena' },
    { nombre: 'Alfajores de Chocolate', imagen: imagenes['Alfajores de Chocolate'], unidad: 'docena' },
    { nombre: 'Chilenitos',             imagen: imagenes['Chilenitos'],             unidad: 'docena' },
  ],
  'Empanadas': [
    { nombre: 'Pino',          imagen: imagenes['Pino'],          unidad: 'docena' },
    { nombre: 'Napolitana',    imagen: imagenes['Napolitana'],    unidad: 'docena' },
    { nombre: 'Vegetariana',   imagen: imagenes['Vegetariana'],   unidad: 'docena' },
    { nombre: 'Queso Camarón',       imagen: imagenes['Queso Camarón'],       unidad: 'docena' },
    { nombre: 'Empanada de Mariscos', imagen: imagenes['Empanada de Mariscos'], unidad: 'docena' },
  ],
};

const productosDelivery: Record<string, { nombre: string; imagen: string; unidad: string }[]> = {
  'Tortas': [
    { nombre: 'Torta 3 Leches',     imagen: imagenes['Torta 3 Leches'],     unidad: 'un' },
    { nombre: 'Torta de Chocolate', imagen: imagenes['Torta de Chocolate'], unidad: 'un' },
    { nombre: 'Moca / Pralinée',    imagen: imagenes['Moca / Pralinée'],    unidad: 'un' },
    { nombre: 'Selva Negra',        imagen: imagenes['Selva Negra'],        unidad: 'un' },
    { nombre: 'Torta de Piña',      imagen: imagenes['Torta de Piña'],      unidad: 'un' },
    { nombre: 'Torta de Hojarasca', imagen: imagenes['Torta de Hojarasca'], unidad: 'un' },
  ],
  'Pasteles': [
    { nombre: 'Pie de Limón Merengado', imagen: imagenes['Pie de Limón Merengado'], unidad: 'un' },
    { nombre: 'Kuchen Sureño',          imagen: imagenes['Kuchen Sureño'],          unidad: 'un' },
    { nombre: 'Kuchen de Nuez',         imagen: imagenes['Kuchen de Nuez'],         unidad: 'un' },
    { nombre: 'Banofee',                imagen: imagenes['Banofee'],                unidad: 'un' },
    { nombre: 'Tartaletas',             imagen: imagenes['Tartaletas'],             unidad: 'un' },
  ],
  'Queques': [
    { nombre: 'Queque de Naranja',  imagen: imagenes['Queque de Naranja'],  unidad: 'un' },
    { nombre: 'Queque Mármol',      imagen: imagenes['Queque Mármol'],      unidad: 'un' },
    { nombre: 'Queque Tradicional', imagen: imagenes['Queque Tradicional'], unidad: 'un' },
  ],
  'Empanadas': [
    { nombre: 'Pino',          imagen: imagenes['Pino'],          unidad: 'docena' },
    { nombre: 'Napolitana',    imagen: imagenes['Napolitana'],    unidad: 'docena' },
    { nombre: 'Vegetariana',   imagen: imagenes['Vegetariana'],   unidad: 'docena' },
    { nombre: 'Queso Camarón',        imagen: imagenes['Queso Camarón'],        unidad: 'docena' },
    { nombre: 'Empanada de Mariscos', imagen: imagenes['Empanada de Mariscos'], unidad: 'docena' },
  ],
};

const eventosData: Record<string, { imagen: string; desc: string }> = {
  'Matrimonios':  { imagen: '/images/eventos-matrimonio.webp', desc: 'Tortas de novios, mesa de dulces y banquetería completa para el día más especial. Coordinamos contigo cada detalle.' },
  'Cóctel':       { imagen: '/images/eventos-coctel.webp',   desc: 'Bocados dulces y salados para cócteles y recepciones. Presentación elegante lista para servir.' },
  'Cumpleaños':   { imagen: '/images/eventos-cumpleanos.webp',   desc: 'Tortas personalizadas, cupcakes y mesa de dulces para celebrar como se merece. Pedidos con 48 hrs de anticipación.' },
  'Corporativos': { imagen: '/images/Corporativo.webp', desc: 'Coffee breaks y celebraciones de empresa con productos artesanales. Factura disponible para empresas.' },
};

const WA_NUMBER = '56990991011';

const matrimonioSlides = Array.from({length: 18}, (_, i) => `/images/eventos/matrimonio${i+1}.webp`);

const coctelSlides = [
  '/images/eventos/coctel01.webp',
  '/images/eventos/coctel02.webp',
  '/images/eventos/coctel03.webp',
  '/images/eventos/coctel04.webp',
  '/images/eventos/coctel05.webp',
  '/images/eventos/coctel06.webp',
  '/images/eventos/coctel07.webp',
  '/images/eventos/coctel08.webp',
  '/images/eventos/coctel09.webp',
  '/images/eventos/coctel10.webp',
];

const cumpleanosSlides = [
  '/images/eventos/cumpleanos01.webp',
  '/images/eventos/cumpleanos02.webp',
  '/images/eventos/cumpleanos03.webp',
  '/images/eventos/cumpleanos04.webp',
  '/images/eventos/cumpleanos05.webp',
  '/images/eventos/cumpleanos06.webp',
  '/images/eventos/cumpleanos07.webp',
  '/images/eventos/cumpleanos08.webp',
  '/images/eventos/cumpleanos09.webp',
  '/images/eventos/cumpleanos10.webp',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pluralizar(cantidad: number, unidad: string): string {
  if (unidad === 'docena') return cantidad === 1 ? 'docena' : 'docenas';
  if (unidad === 'unidad') return cantidad === 1 ? 'unidad' : 'unidades';
  return unidad;
}

// ─── Mínimos por producto ────────────────────────────────────────────────────

function getMinimo(tab: string, unidad: string, nombre: string = ''): number {
  if (nombre === 'Tortilla con Chicharrones') return 2;
  if (tab === 'Pan' && nombre !== 'Tortilla con Chicharrones') return 10;
  if (unidad === 'docena') return 1;
  if (tab === 'Queques') return 2;
  return 1;
}

function getLabelMinimo(tab: string, unidad: string, nombre: string = ''): string {
  if (nombre === 'Tortilla con Chicharrones') return 'mín. 2 un';
  if (tab === 'Pan' && nombre !== 'Tortilla con Chicharrones') return 'mín. 10 kg';
  if (unidad === 'docena') return 'mín. 1 docena';
  if (tab === 'Queques') return 'mín. 2 un';
  return 'mín. 1 un';
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Props {
  id: string;
  nombre: string;
  imagen: string;
  initialTab?: string;
  onClose: () => void;
}

type Carrito = Record<string, number>;

// ─── Componente principal ────────────────────────────────────────────────────

export default function ServicioDetalle({ id, nombre, imagen, initialTab, onClose }: Props) {

  const tabsAlmacenes = Object.keys(productosAlmacenes);
  const tabsDelivery  = Object.keys(productosDelivery);
  const tabsEventos   = Object.keys(eventosData);

  const tabs =
    id === 'b2b'      ? tabsAlmacenes :
    id === 'delivery' ? tabsDelivery  :
    tabsEventos;

  const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0]);
  const [carrito, setCarrito]     = useState<Carrito>({});
  const [eventoImg, setEventoImg] = useState(eventosData[tabs[0]]?.imagen ?? imagen);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

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

  // Reset slide al cambiar tab
  useEffect(() => { setSlideIndex(0); }, [activeTab]);

  // Autoplay slideshow Matrimonios / Cóctel / Cumpleaños
  useEffect(() => {
    const slides =
      activeTab === 'Matrimonios' ? matrimonioSlides :
      activeTab === 'Cóctel'      ? coctelSlides      :
      activeTab === 'Cumpleaños'  ? cumpleanosSlides  : null;
    if (!slides) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const bgImagen = id === 'eventos' ? eventoImg : imagen;

  // Productos del tab activo
  const productos =
    id === 'b2b'      ? (productosAlmacenes[activeTab] ?? []) :
    id === 'delivery' ? (productosDelivery[activeTab]  ?? []) :
    [];

  // Carrito helpers
  function agregar(nombre: string, tab: string, unidad: string) {
    const min = getMinimo(tab, unidad, nombre);
    setCarrito(prev => ({
      ...prev,
      [nombre]: (prev[nombre] ?? 0) + min,
    }));
  }

  function quitar(nombre: string, tab: string, unidad: string) {
    const min = getMinimo(tab, unidad, nombre);
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
      .map(([nombre, cantidad]) => {
        const todosLosProductos = [
          ...Object.values(productosAlmacenes).flat(),
          ...Object.values(productosDelivery).flat(),
        ];
        const unidad = todosLosProductos.find(p => p.nombre === nombre)?.unidad ?? 'un';
        return `• ${cantidad} ${pluralizar(cantidad, unidad)} — ${nombre}`;
      })
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
        .svc-btn-add { background: #f0c040; border: none; color: #1a0f0a; font-weight: 600; font-family: var(--font-sans); font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.5rem; cursor: pointer; width: 100%; transition: background 0.2s; }
        .svc-btn-add:hover { background: var(--terracota); color: var(--cream); }
        .svc-counter { display: flex; align-items: center; justify-content: space-between; background: rgba(212,168,83,0.15); padding: 0.3rem 0.5rem; }
        .svc-counter button { background: none; border: 1px solid rgba(212,168,83,0.4); color: var(--gold); width: 1.4rem; height: 1.4rem; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; }
        .svc-whatsapp-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(26,15,10,0.95); backdrop-filter: blur(8px); border-top: 1px solid rgba(212,168,83,0.2); padding: 0.75rem 5%; display: flex; align-items: center; justify-content: space-between; z-index: 10001; }
        .svc-resumen-overlay { position: fixed; inset: 0; background: rgba(26,15,10,0.7); backdrop-filter: blur(4px); z-index: 10002; display: flex; align-items: flex-start; padding-top: 4vh; justify-content: center; }
        .svc-resumen-panel { background: #2a1205; border: 1px solid rgba(212,168,83,0.25); border-bottom: none; width: 100%; max-width: 560px; padding: 1.5rem; border-radius: 12px 12px 0 0; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .svc-resumen-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid rgba(212,168,83,0.1); font-family: var(--font-sans); font-size: 0.8rem; color: var(--cream); }
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
          <button onClick={() => { onClose(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/images/Nuevologo.webp" alt="Galdi" style={{ height: '52px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </button>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)' }}>{nombre}</span>
          <button onClick={() => { onClose(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'rgba(26,15,10,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(245,230,211,0.25)', color: 'var(--cream)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Barra de tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,230,211,0.15)', overflowX: 'auto', paddingLeft: '5%' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`svc-tab${t === activeTab ? ' active' : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── Contenido scrolleable ── */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: 'auto', padding: '0.5rem 5%', paddingBottom: totalItems > 0 ? '5rem' : '1.5rem' }}>

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

        {/* SLIDESHOW Matrimonios / Cóctel / Cumpleaños */}
        {(activeTab === 'Matrimonios' || activeTab === 'Cóctel' || activeTab === 'Cumpleaños') && (() => {
          const slides =
            activeTab === 'Matrimonios' ? matrimonioSlides :
            activeTab === 'Cóctel'      ? coctelSlides      :
            cumpleanosSlides;
          return (
            <div style={{ position: 'relative', width: '100%', maxWidth: '700px', margin: '2rem auto', borderRadius: '8px', overflow: 'hidden', height: 'clamp(220px, 40vh, 420px)' }}>
              {slides.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${activeTab} ${i+1}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: i === slideIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                  }}
                />
              ))}
              {/* Dots */}
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
                {slides.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    style={{
                      width: i === slideIndex ? '18px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === slideIndex ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })()}

        {/* ALMACENES / DELIVERY — grilla de productos */}
        {(id === 'b2b' || id === 'delivery') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
            {productos.map(prod => {
              const enCarrito = carrito[prod.nombre] ?? 0;
              const min = getMinimo(activeTab, prod.unidad, prod.nombre);
              const label = getLabelMinimo(activeTab, prod.unidad, prod.nombre);
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
                    <button className="svc-btn-add" onClick={() => agregar(prod.nombre, activeTab, prod.unidad)}><span style={{fontSize:'1rem'}}>🛒</span> AGREGAR</button>
                  ) : (
                    <div className="svc-counter">
                      <button onClick={() => quitar(prod.nombre, activeTab, prod.unidad)}>−</button>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--cream)' }}>{enCarrito} {pluralizar(enCarrito, prod.unidad)}</span>
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
        <>
          {/* Resumen modal */}
          {mostrarResumen && (
            <div className="svc-resumen-overlay" onClick={() => setMostrarResumen(false)}>
              <div className="svc-resumen-panel" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--cream)', fontWeight: 300 }}>Tu pedido</span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button onClick={() => { setCarrito({}); setMostrarResumen(false); }} style={{ background: 'none', border: '1px solid rgba(245,100,100,0.5)', color: 'rgba(245,150,150,0.9)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.6rem', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Vaciar</button>
                    <button onClick={() => setMostrarResumen(false)} style={{ background: 'none', border: 'none', color: 'rgba(245,230,211,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
                {/* Lista de productos */}
                <div style={{ marginBottom: '1.25rem', maxHeight: '55vh', overflowY: 'auto' }}>
                  {Object.entries(carrito).map(([nombre, cantidad]) => (
                    <div key={nombre} className="svc-resumen-item">
                      <span>🛒 {nombre}</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 500 }}>{cantidad} {(() => {
                        const todosLosProductos = [
                          ...Object.values(productosAlmacenes).flat(),
                          ...Object.values(productosDelivery).flat(),
                        ];
                        const unidad = todosLosProductos.find(p => p.nombre === nombre)?.unidad ?? 'un';
                        return pluralizar(cantidad, unidad);
                      })()}</span>
                    </div>
                  ))}
                </div>
                {/* Botón enviar */}
                <button onClick={() => { enviarWhatsApp(); setMostrarResumen(false); }} style={{ width: '100%', background: '#25D366', border: 'none', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '4px' }}>
                  Enviar pedido por WhatsApp
                </button>
              </div>
            </div>
          )}
          {/* Barra inferior */}
          <div className="svc-whatsapp-bar" style={{ cursor: 'pointer' }}>
            <span onClick={() => setMostrarResumen(true)} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--cream)', letterSpacing: '0.08em', flex: 1 }}>
              🛒 {totalItems} producto{totalItems > 1 ? 's' : ''} · Ver pedido
            </span>
            <button onClick={() => setCarrito({})} style={{ background: 'none', border: '1px solid rgba(245,100,100,0.4)', color: 'rgba(245,150,150,0.9)', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.6rem', cursor: 'pointer', marginRight: '0.75rem' }}>Vaciar</button>
            <span onClick={() => setMostrarResumen(true)} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.08em', cursor: 'pointer' }}>
              Ver resumen →
            </span>
          </div>
        </>
      )}
    </div>
  );
}
