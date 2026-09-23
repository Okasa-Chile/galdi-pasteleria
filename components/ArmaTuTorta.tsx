'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  VARIANTES, BASES, RELLENOS, DECORACIONES, TAMANIOS,
  fmtPrecio, precioTamanio, conNombreVariante,
} from '@/lib/armaTuTortaPricing';

// ── Paleta ───────────────────────────────────────────────────────────────────
const P = {
  cream:      '#fdf6ee',
  creamDark:  '#f5e8d8',
  rose:       '#f2c4ce',
  roseDark:   '#e8a0ae',
  peach:      '#f7dcc8',
  peachDark:  '#e8c4a8',
  brown:      '#3d2010',
  brownMid:   '#7a4a2a',
  brownLight: '#a07050',
  gold:       '#c9a55a',
  goldLight:  '#e8d5a8',
  white:      '#fffaf5',
};

// ── Subcomponente: Card opción ────────────────────────────────────────────────

function OpcionCard({ opcion, seleccionada, onSelect, deshabilitada = false, priority = false, compactMobile = false }: {
  opcion: { id: string; nombre: string; imagen?: string; icono?: string; desc: string };
  seleccionada: boolean;
  onSelect: () => void;
  deshabilitada?: boolean;
  priority?: boolean;
  compactMobile?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={deshabilitada && !seleccionada}
      title={`${opcion.nombre} — ${opcion.desc}`}
      className={`atg-card ${opcion.imagen ? 'atg-card-img' : 'atg-card-emoji'}${compactMobile ? ' atg-variant-card' : ''}`}
      style={{
        background: seleccionada ? `linear-gradient(135deg, ${P.rose}33, ${P.peach}33)` : P.white,
        border: seleccionada ? `2px solid ${P.roseDark}` : `1.5px solid ${P.creamDark}`,
        borderRadius: '16px',
        padding: '1rem 0.75rem',
        cursor: deshabilitada && !seleccionada ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        textAlign: 'center',
        boxShadow: seleccionada
          ? `0 4px 16px ${P.rose}55`
          : '0 2px 8px rgba(61,32,16,0.06)',
        opacity: deshabilitada && !seleccionada ? 0.45 : 1,
      }}
    >
      <div className={`atg-card-media${compactMobile ? ' atg-variant-card-icon' : ''}`} style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(160px, 30vw, 260px)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: seleccionada ? `1.5px solid ${P.roseDark}` : `1.5px solid ${P.creamDark}`,
      }}>
        {opcion.imagen ? (
          <Image src={opcion.imagen} alt={opcion.nombre} fill sizes="(min-width: 769px) 120px, 100vw" style={{ objectFit: 'cover' }} priority={priority} />
        ) : (
          <div className={compactMobile ? 'atg-variant-card-icon-inner' : undefined} style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            background: `linear-gradient(135deg, ${P.peach}55, ${P.rose}55)`,
          }}>
            {opcion.icono}
          </div>
        )}
      </div>
      <div className={`atg-card-text${compactMobile ? ' atg-variant-card-text' : ''}`}>
        <p className="atg-card-nombre" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          fontWeight: 400,
          color: seleccionada ? P.brownMid : P.brown,
          margin: 0,
          lineHeight: 1.2,
        }}>
          {opcion.nombre}
        </p>
        <p className="atg-card-desc" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          color: P.brownLight,
          margin: '0.25rem 0 0',
          lineHeight: 1.4,
        }}>
          {opcion.desc}
        </p>
      </div>
      {seleccionada && (
        <span className={`atg-card-badge${compactMobile ? ' atg-variant-card-badge' : ''}`} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.58rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: P.roseDark,
          background: `${P.rose}44`,
          padding: '2px 10px',
          borderRadius: '20px',
          border: `1px solid ${P.rose}`,
        }}>
          ✓ Elegido
        </span>
      )}
    </button>
  );
}

// ── Subcomponente: Card tamaño ────────────────────────────────────────────────

function TamanioCard({ tamanio, precio, seleccionado, onSelect }: {
  tamanio: { id: string; nombre: string; desc: string; detalle: string };
  precio: number;
  seleccionado: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        background: seleccionado ? `linear-gradient(135deg, ${P.rose}33, ${P.peach}44)` : P.white,
        border: seleccionado ? `2px solid ${P.roseDark}` : `1.5px solid ${P.creamDark}`,
        borderRadius: '14px',
        padding: '1.25rem 0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        boxShadow: seleccionado
          ? `0 4px 16px ${P.rose}55`
          : '0 2px 8px rgba(61,32,16,0.06)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2rem',
        fontWeight: 300,
        color: seleccionado ? P.brownMid : P.brown,
        margin: 0,
        lineHeight: 1,
      }}>
        {tamanio.nombre}
      </p>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.68rem',
        color: seleccionado ? P.brownMid : P.brownLight,
        margin: '0.35rem 0 0',
        letterSpacing: '0.03em',
        lineHeight: 1.3,
      }}>
        {tamanio.desc}
      </p>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.6rem',
        color: P.brownLight,
        margin: '0.2rem 0 0',
        lineHeight: 1.3,
        opacity: 0.7,
      }}>
        {tamanio.detalle}
      </p>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        color: seleccionado ? P.roseDark : P.brownMid,
        margin: '0.5rem 0 0',
        fontWeight: 500,
      }}>
        {fmtPrecio(precio)}
      </p>
    </button>
  );
}

// ── Subcomponente: Paso ───────────────────────────────────────────────────────

function Paso({ id, numero, titulo, subtitulo, completado, activo, children }: {
  id?: string;
  numero: number;
  titulo: string;
  subtitulo?: string;
  completado: boolean;
  activo: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id ?? `atg-paso-${numero}`} style={{
      marginBottom: '2.5rem',
      opacity: activo || completado ? 1 : 0.35,
      transition: 'opacity 0.3s ease',
    }}>
      <div className={`atg-paso-head${activo ? ' atg-paso-head-activo' : ''}`} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: activo ? '1.5rem' : '0',
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: completado ? 'none' : activo ? `2px solid ${P.roseDark}` : `1.5px solid ${P.creamDark}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: completado ? `linear-gradient(135deg, ${P.rose}, ${P.peach})` : activo ? `${P.rose}22` : P.white,
          flexShrink: 0,
          boxShadow: completado ? `0 2px 8px ${P.rose}66` : 'none',
        }}>
          {completado ? (
            <span style={{ color: P.white, fontSize: '0.9rem', fontWeight: 700 }}>✓</span>
          ) : (
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: activo ? P.roseDark : P.brownLight,
            }}>
              {numero}
            </span>
          )}
        </div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
            fontWeight: 400,
            color: activo || completado ? P.brown : P.brownLight,
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            {titulo}
          </h2>
          {subtitulo && activo && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              color: P.brownLight,
              margin: '0.2rem 0 0',
              letterSpacing: '0.05em',
            }}>
              {subtitulo}
            </p>
          )}
        </div>
      </div>
      {activo && (
        <div className="atg-paso-body" style={{ paddingLeft: '54px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function ArmaTuTorta() {
  const [variante, setVariante]                 = useState<string | null>(null);
  const [base, setBase]                         = useState<string | null>(null);
  const [rellenos, setRellenos]                 = useState<string[]>([]);
  const [rellenosConfirmados, setRellenosConf]  = useState(false);
  const [decoraciones, setDecoraciones]         = useState<string[]>([]);
  const [decoracionesConfirmadas, setDecoConf]  = useState(false);
  const [tamanio, setTamanio]                   = useState<string | null>(null);

  const sinAzucar = variante === 'sin-azucar';

  const pasoActivo =
    !variante                 ? 1 :
    !base                     ? 2 :
    !rellenosConfirmados      ? 3 :
    !decoracionesConfirmadas  ? 4 :
    !tamanio                  ? 5 : 6;

  const pasoPrevioRef = useRef(pasoActivo);
  useEffect(() => {
    const previo = pasoPrevioRef.current;
    pasoPrevioRef.current = pasoActivo;
    if (pasoActivo <= previo) return;
    const el = document.getElementById(pasoActivo === 6 ? 'atg-resumen' : `atg-paso-${pasoActivo}`);
    if (!el) return;
    const altoHeader = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    el.style.scrollMarginTop = `${altoHeader + 16}px`;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pasoActivo]);

  const varianteSeleccionada      = VARIANTES.find(v => v.id === variante);
  const baseSeleccionada          = conNombreVariante(BASES.filter(b => b.id === base), sinAzucar)[0];
  const rellenosSeleccionados     = conNombreVariante(RELLENOS.filter(r => rellenos.includes(r.id)), sinAzucar);
  const decoracionesSeleccionadas = conNombreVariante(DECORACIONES.filter(d => decoraciones.includes(d.id)), sinAzucar);
  const tamanioSeleccionado       = TAMANIOS.find(t => t.id === tamanio);

  const basesDisponibles          = conNombreVariante(BASES.filter(b => !sinAzucar || b.sinAzucar), sinAzucar);
  const rellenosDisponibles       = conNombreVariante(RELLENOS.filter(r => !sinAzucar || r.sinAzucar), sinAzucar);
  const decoracionesDisponibles   = conNombreVariante(DECORACIONES.filter(d => !sinAzucar || d.sinAzucar), sinAzucar);

  const precioFinal = tamanioSeleccionado
    ? precioTamanio(tamanioSeleccionado, sinAzucar, rellenosSeleccionados, decoracionesSeleccionadas)
    : 0;

  const recargoSinAzucarAplicado = sinAzucar && tamanioSeleccionado
    ? precioFinal - tamanioSeleccionado.precio
    : 0;

  function resetDesdeVariante() {
    setBase(null);
    setRellenos([]);
    setRellenosConf(false);
    setDecoraciones([]);
    setDecoConf(false);
    setTamanio(null);
  }

  function resetDesdeBase() {
    setRellenos([]);
    setRellenosConf(false);
    setDecoraciones([]);
    setDecoConf(false);
    setTamanio(null);
  }

  function armarOtraTorta() {
    if (!window.confirm('¿Quieres borrar esta torta y empezar una nueva? Se perderá la selección actual.')) {
      return;
    }
    setVariante(null);
    setBase(null);
    setRellenos([]);
    setRellenosConf(false);
    setDecoraciones([]);
    setDecoConf(false);
    setTamanio(null);
    document.getElementById('atg-paso-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function toggleRelleno(id: string) {
    setRellenos(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length >= 3 ? prev : [...prev, id]
    );
  }

  function toggleDecoracion(id: string) {
    setDecoraciones(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length >= 2 ? prev : [...prev, id]
    );
  }

  const mensajeWsp = encodeURIComponent(
    `Hola Galdi 🎂 Quiero encargar una torta personalizada:\n\n` +
    `🍬 Variante: ${varianteSeleccionada?.nombre ?? ''}\n` +
    `🍰 Base: ${baseSeleccionada?.nombre ?? ''}\n` +
    `🍯 Relleno: ${rellenosSeleccionados.map(r => r.nombre).join(', ')}\n` +
    `✨ Decoración: ${decoracionesSeleccionadas.map(d => d.nombre).join(', ')}\n` +
    `📏 Tamaño: ${tamanioSeleccionado?.nombre ?? ''} (${tamanioSeleccionado?.desc ?? ''})\n\n` +
    `💰 Valor referencial: ${fmtPrecio(precioFinal)}\n\n` +
    `¿Me confirman disponibilidad y fecha de entrega?`
  );

  return (
    <div style={{ background: P.cream, minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Hero ── */}
      <div className="atg-hero" style={{
        background: `linear-gradient(160deg, ${P.white} 0%, ${P.peach}44 50%, ${P.rose}22 100%)`,
        padding: 'clamp(4rem, 10vh, 7rem) 5% 3rem',
        textAlign: 'center',
        borderBottom: `1px solid ${P.creamDark}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <style>{`
          @media (max-width: 768px) {
            .atg-flor-esquina {
              display: none !important;
            }
          }
          @media (max-width: 768px) {
            .atg-hero { padding: 1.5rem 5% 1rem !important; }
            .atg-hero-label { margin-bottom: 0.5rem !important; }
            .atg-hero-h1 { margin: 0 0 0.5rem !important; }
            .atg-hero-p { line-height: 1.5 !important; }
            .atg-hero-p2 { margin-top: 0.5rem !important; }
            .atg-hero-orn { margin-top: 0.75rem !important; }
            .atg-config { padding-top: 1.25rem !important; }
            [id^="atg-paso-"] { margin-bottom: 1.25rem !important; }
            .atg-paso-body { padding-left: 0 !important; }
            .atg-resumen-paso { padding-left: 0 !important; }
            div:has(> img[src*="flor-separador"]) { margin: 0.25rem 0 1rem !important; }
            img[src*="flor-separador"] { height: 32px !important; width: auto !important; }
            .atg-grid-ilus { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.6rem !important; }
            .atg-card-img { position: relative; padding: 0.5rem 0.4rem !important; gap: 0.4rem !important; }
            .atg-card-img .atg-card-media { height: auto !important; aspect-ratio: 1 / 1; }
            .atg-card-img .atg-card-media img { object-fit: contain !important; }
            .atg-card-img .atg-card-text { width: 100%; min-width: 0; }
            .atg-card-img .atg-card-nombre { font-size: 0.82rem !important; line-height: 1.2 !important; }
            .atg-card-img .atg-card-desc { font-size: 0.58rem !important; line-height: 1.3 !important; margin-top: 0.15rem !important; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
            .atg-card-img .atg-card-badge { position: absolute; top: 0.35rem; right: 0.35rem; background: ${P.white} !important; }
            .atg-continuar-fila:has(button) { position: sticky; bottom: 0; z-index: 20; background: ${P.cream}; border-top: 1px solid ${P.creamDark}; margin: 0.6rem -5vw 0 !important; padding: 0.55rem 5vw calc(0.55rem + env(safe-area-inset-bottom)) !important; box-shadow: 0 -4px 12px rgba(61,32,16,0.08); }
            .atg-res { padding: 1rem !important; }
            .atg-res-corona { margin-bottom: 0.3rem !important; }
            .atg-res-corona img { height: 48px !important; width: auto !important; }
            .atg-res-titulo { margin-bottom: 0.75rem !important; }
            .atg-res-label { margin: 0 0 0.3rem !important; }
            .atg-res-h3 { font-size: 1.25rem !important; line-height: 1.2 !important; }
            .atg-res-orn { margin-top: 0.4rem !important; }
            .atg-res-datos { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.5rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-item { padding: 0.5rem 0.6rem !important; border-radius: 10px !important; overflow-wrap: break-word; }
            .atg-res-item:nth-child(n+3) { grid-column: 1 / -1; }
            .atg-res-item-label { margin: 0 0 0.2rem !important; }
            .atg-res-item-valor { font-size: 0.8rem !important; }
            .atg-res-nota { padding: 0.5rem 0.7rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-nota p { line-height: 1.45 !important; }
            .atg-res-precio { padding: 0.6rem 0.8rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-precio-label { margin: 0 0 0.25rem !important; }
            .atg-res-recargo { margin-top: 0.3rem !important; }
            .atg-res-disc { margin-top: 0.4rem !important; line-height: 1.5 !important; }
            .atg-res-wsp { padding: 0.75rem !important; }
            .atg-res-otra { margin-top: 0.6rem !important; padding: 0.6rem !important; }
          }
          @media (min-width: 769px) {
            .atg-hero { padding: 2rem 5% 1.25rem !important; }
            .atg-hero-label { margin-bottom: 0.4rem !important; }
            .atg-hero-h1 { font-size: 2.6rem !important; margin: 0 0 0.4rem !important; line-height: 1.1 !important; }
            .atg-hero-p { max-width: 760px !important; font-size: 0.9rem !important; line-height: 1.5 !important; }
            .atg-hero-p2 { max-width: 760px !important; margin-top: 0.4rem !important; }
            .atg-hero-orn { margin-top: 0.6rem !important; }
            .atg-config { max-width: 1100px !important; padding-top: 1.5rem !important; }
            .atg-paso-head { justify-content: center; }
            .atg-paso-head::after { content: ''; width: 38px; flex-shrink: 0; }
            .atg-paso-head-activo { margin-bottom: 0.5rem !important; }
            .atg-paso-head > div:last-child { text-align: center; }
            .atg-continuar-fila { margin-top: 0.6rem !important; }
            .atg-paso-body { padding-left: 0 !important; }
            .atg-resumen-paso { padding-left: 0 !important; text-align: center; }
            .atg-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 220px)) !important; justify-content: center; }
            .atg-res { padding: 1.25rem 1.5rem !important; }
            .atg-res-corona { margin-bottom: 0.4rem !important; }
            .atg-res-corona img { height: 56px !important; width: auto !important; }
            .atg-res-titulo { margin-bottom: 0.75rem !important; }
            .atg-res-label { margin: 0 0 0.3rem !important; }
            .atg-res-h3 { font-size: 1.5rem !important; line-height: 1.2 !important; }
            .atg-res-orn { margin-top: 0.4rem !important; }
            .atg-res-datos { display: flex !important; flex-wrap: wrap; justify-content: center; gap: 0.5rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-item { flex: 1 1 0; min-width: 120px; padding: 0.55rem 0.7rem !important; border-radius: 10px !important; overflow-wrap: break-word; }
            .atg-res-item:nth-child(2) { flex-grow: 1.2; }
            .atg-res-item:nth-child(3) { flex-grow: 2.4; }
            .atg-res-item:nth-child(4) { flex-grow: 1.6; }
            .atg-res-item-label { margin: 0 0 0.2rem !important; }
            .atg-res-item-valor { font-size: 0.8rem !important; }
            .atg-res-nota { padding: 0.5rem 0.8rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-nota p { line-height: 1.45 !important; }
            .atg-res-precio { padding: 0.6rem 1rem !important; margin-bottom: 0.75rem !important; }
            .atg-res-precio-label { margin: 0 0 0.25rem !important; }
            .atg-res-monto { font-size: 2.2rem !important; }
            .atg-res-recargo { margin-top: 0.3rem !important; }
            .atg-res-disc { margin-top: 0.4rem !important; line-height: 1.5 !important; }
            .atg-res-wsp { padding: 0.75rem !important; }
            .atg-res-otra { margin-top: 0.6rem !important; padding: 0.6rem !important; }
            .atg-card { position: relative; }
            .atg-grid-ilus { display: flex !important; flex-wrap: wrap; justify-content: center; gap: 0.6rem !important; max-width: 948px; margin-left: auto; margin-right: auto; }
            .atg-grid-ilus .atg-card { flex: 0 0 180px; width: 180px; }
            .atg-card-img { padding: 0.4rem !important; gap: 0.3rem !important; border-radius: 12px !important; }
            .atg-card-img .atg-card-media { width: 120px !important; height: 120px !important; flex-shrink: 0; }
            .atg-card-img .atg-card-text { width: 100%; min-width: 0; }
            .atg-card-img .atg-card-nombre { font-size: 0.85rem !important; line-height: 1.2 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .atg-card-img .atg-card-desc { font-size: 0.62rem !important; line-height: 1.3 !important; margin-top: 0.15rem !important; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
            .atg-card-img .atg-card-badge { position: absolute; top: 0.5rem; right: 0.5rem; background: ${P.white} !important; }
            .atg-card-emoji { padding: 0.6rem 0.75rem !important; gap: 0.4rem !important; }
            .atg-card-emoji .atg-card-media { height: 56px !important; }
            .atg-card-emoji .atg-card-media > div { font-size: 2rem !important; }
          }
        `}</style>
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${P.rose}33 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${P.peach}44 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <Image
          src="/images/arma-tu-torta/flor-esquina-izq.webp"
          alt=""
          width={180}
          height={180}
          className="atg-flor-esquina"
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            opacity: 0.5,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p className="atg-hero-label" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: P.roseDark,
              marginBottom: '1rem',
            }}>
              Galdi · Maipú
            </p>
          </Link>
          <h1 className="atg-hero-h1" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 400,
            color: P.brown,
            margin: '0 0 1rem',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
          }}>
            Arma tu Torta
          </h1>
          <p className="atg-hero-p" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
            color: P.brownMid,
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            Diseña la torta de tus sueños. Elige cada detalle — la elaboramos con los mismos estándares artesanales que nos definen desde siempre.
          </p>
          <p className="atg-hero-p2" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
            fontWeight: 600,
            color: P.roseDark,
            maxWidth: '480px',
            margin: '0.75rem auto 0',
            letterSpacing: '0.01em',
          }}>
            🕐 Entrega en 48 horas después de contactarnos
          </p>

          <div className="atg-hero-orn" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
          }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${P.roseDark})` }} />
            <span style={{ color: P.roseDark, fontSize: '0.8rem' }}>✿</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${P.roseDark})` }} />
          </div>
        </div>

        <Image
          src="/images/arma-tu-torta/flor-esquina-der.webp"
          alt=""
          width={160}
          height={160}
          className="atg-flor-esquina"
          style={{
            position: 'absolute',
            bottom: '-10px',
            right: '-10px',
            opacity: 0.45,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </div>

      {/* ── Configurador ── */}
      <div className="atg-config" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 5% 6rem' }}>

        {/* PASO 1 — Variante */}
        <Paso id="atg-paso-1" numero={1} titulo="Con o sin azúcar añadida" subtitulo="Elige el punto de partida de tu torta" completado={pasoActivo > 1} activo={pasoActivo === 1}>
          <style>{`
            @media (max-width: 768px) {
              .atg-variant-grid {
                grid-template-columns: 1fr !important;
                gap: 0.75rem !important;
              }
              .atg-variant-card {
                position: relative !important;
                flex-direction: row !important;
                align-items: center !important;
                text-align: left !important;
                padding: 0.85rem 1rem !important;
                gap: 0.85rem !important;
              }
              .atg-variant-card-icon {
                width: 56px !important;
                height: 56px !important;
                flex-shrink: 0;
              }
              .atg-variant-card-icon-inner {
                font-size: 1.8rem !important;
              }
              .atg-variant-card-text {
                flex: 1;
              }
              .atg-variant-card-badge {
                position: absolute;
                top: 0.4rem;
                right: 0.4rem;
              }
            }
          `}</style>
          <div className="atg-variant-grid atg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {VARIANTES.map(v => (
              <OpcionCard
                key={v.id}
                opcion={v}
                seleccionada={variante === v.id}
                onSelect={() => { setVariante(v.id); resetDesdeVariante(); }}
                compactMobile
              />
            ))}
          </div>
        </Paso>

        {pasoActivo > 1 && varianteSeleccionada && (
          <div className="atg-resumen-paso" style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Variante: <span style={{ color: P.brownMid, fontWeight: 600 }}>{varianteSeleccionada.nombre}</span>
              <button onClick={() => { setVariante(null); resetDesdeVariante(); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 1 && (
          <div style={{ position: 'relative', margin: '0.5rem 0 2rem', textAlign: 'center' }}>
            <Image
              src="/images/arma-tu-torta/flor-separador.webp"
              alt=""
              width={320}
              height={60}
              style={{ opacity: 0.4, display: 'inline-block' }}
            />
          </div>
        )}

        {/* PASO 2 — Base */}
        <Paso numero={2} titulo="Elige tu base" subtitulo="La arquitectura de tu torta" completado={pasoActivo > 2} activo={pasoActivo === 2}>
          <div className="atg-grid-ilus" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {basesDisponibles.map(b => (
              <OpcionCard
                key={b.id}
                opcion={b}
                seleccionada={base === b.id}
                onSelect={() => { setBase(b.id); resetDesdeBase(); }}
              priority={b.id === 'panqueque'}
              />
            ))}
          </div>
        </Paso>

        {pasoActivo > 2 && baseSeleccionada && (
          <div className="atg-resumen-paso" style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Base: <span style={{ color: P.brownMid, fontWeight: 600 }}>{baseSeleccionada.nombre}</span>
              <button onClick={() => { setBase(null); resetDesdeBase(); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 2 && (
          <div style={{ position: 'relative', margin: '0.5rem 0 2rem', textAlign: 'center' }}>
            <Image
              src="/images/arma-tu-torta/flor-separador.webp"
              alt=""
              width={320}
              height={60}
              style={{ opacity: 0.4, display: 'inline-block' }}
            />
          </div>
        )}

        {/* PASO 3 — Rellenos */}
        <Paso numero={3} titulo="Elige el relleno" subtitulo="Puedes elegir hasta 3 sabores" completado={pasoActivo > 3} activo={pasoActivo === 3}>
          <div className="atg-grid-ilus" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {rellenosDisponibles.map(r => (
              <OpcionCard
                key={r.id}
                opcion={r}
                seleccionada={rellenos.includes(r.id)}
                onSelect={() => toggleRelleno(r.id)}
                deshabilitada={rellenos.length >= 3 && !rellenos.includes(r.id)}
              />
            ))}
          </div>
          <div className="atg-continuar-fila" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: P.brownLight, margin: 0 }}>
              <span style={{ color: rellenos.length === 3 ? P.roseDark : P.gold, fontWeight: 600 }}>{rellenos.length}/3</span> sabores elegidos
              {rellenos.length === 3 && <span style={{ color: P.roseDark }}> — máximo alcanzado</span>}
            </p>
            {rellenos.length > 0 && (
              <button
                onClick={() => setRellenosConf(true)}
                style={{
                  background: `linear-gradient(135deg, ${P.rose}, ${P.peach})`,
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.4rem 1.2rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: P.brown,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                Continuar →
              </button>
            )}
          </div>
        </Paso>

        {pasoActivo > 3 && rellenosSeleccionados.length > 0 && (
          <div className="atg-resumen-paso" style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Relleno: <span style={{ color: P.brownMid, fontWeight: 600 }}>{rellenosSeleccionados.map(r => r.nombre).join(', ')}</span>
              <button onClick={() => { setRellenos([]); setRellenosConf(false); setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 3 && (
          <div style={{ borderTop: `1px solid ${P.creamDark}`, marginBottom: '2.5rem' }} />
        )}

        {/* PASO 4 — Decoraciones */}
        <Paso numero={4} titulo="Elige la decoración" subtitulo="Puedes elegir hasta 2 opciones" completado={pasoActivo > 4} activo={pasoActivo === 4}>
          <div className="atg-grid-ilus" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {decoracionesDisponibles.map(d => (
              <OpcionCard
                key={d.id}
                opcion={d}
                seleccionada={decoraciones.includes(d.id)}
                onSelect={() => toggleDecoracion(d.id)}
                deshabilitada={decoraciones.length >= 2 && !decoraciones.includes(d.id)}
              />
            ))}
          </div>
          <div className="atg-continuar-fila" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: P.brownLight, margin: 0 }}>
              <span style={{ color: decoraciones.length === 2 ? P.roseDark : P.gold, fontWeight: 600 }}>{decoraciones.length}/2</span> elegidas
              {decoraciones.length === 2 && <span style={{ color: P.roseDark }}> — máximo alcanzado</span>}
            </p>
            {decoraciones.length > 0 && (
              <button
                onClick={() => setDecoConf(true)}
                style={{
                  background: `linear-gradient(135deg, ${P.rose}, ${P.peach})`,
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.4rem 1.2rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: P.brown,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                Continuar →
              </button>
            )}
          </div>
        </Paso>

        {pasoActivo > 4 && decoracionesSeleccionadas.length > 0 && (
          <div className="atg-resumen-paso" style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Decoración: <span style={{ color: P.brownMid, fontWeight: 600 }}>{decoracionesSeleccionadas.map(d => d.nombre).join(', ')}</span>
              <button onClick={() => { setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 4 && (
          <div style={{ borderTop: `1px solid ${P.creamDark}`, marginBottom: '2.5rem' }} />
        )}

        {/* PASO 5 — Tamaño */}
        <Paso numero={5} titulo="Elige el tamaño" subtitulo="¿Para cuántas personas?" completado={pasoActivo > 5} activo={pasoActivo === 5}>
          <div className="atg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {TAMANIOS.map(t => (
              <TamanioCard
                key={t.id}
                tamanio={t}
                precio={precioTamanio(t, sinAzucar, rellenosSeleccionados, decoracionesSeleccionadas)}
                seleccionado={tamanio === t.id}
                onSelect={() => setTamanio(t.id)}
              />
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: P.brownLight, marginTop: '0.75rem', fontStyle: 'italic' }}>
            * Las porciones son aproximadas y varían según el corte.
            {sinAzucar && ' El precio ya incluye el recargo sin azúcar añadida según tu relleno y decoración elegidos.'}
          </p>
        </Paso>

        {/* ── Resumen final ── */}
        {pasoActivo === 6 && tamanioSeleccionado && (
          <div id="atg-resumen" className="atg-res" style={{
            background: `linear-gradient(160deg, ${P.white} 0%, ${P.peach}33 100%)`,
            border: `1.5px solid ${P.rose}`,
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: `0 8px 32px ${P.rose}33`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${P.rose}22 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div className="atg-res-corona" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Image
                src="/images/arma-tu-torta/flor-corona.webp"
                alt=""
                width={120}
                height={90}
                style={{ opacity: 0.65 }}
              />
            </div>

            <div className="atg-res-titulo" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <p className="atg-res-label" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: P.roseDark, margin: '0 0 0.5rem' }}>
                Tu torta
              </p>
              <h3 className="atg-res-h3" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, color: P.brown, margin: 0 }}>
                Una creación artesanal única
              </h3>
              <div className="atg-res-orn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ height: '1px', width: '30px', background: `linear-gradient(to right, transparent, ${P.roseDark})` }} />
                <span style={{ color: P.roseDark, fontSize: '0.7rem' }}>✿</span>
                <div style={{ height: '1px', width: '30px', background: `linear-gradient(to left, transparent, ${P.roseDark})` }} />
              </div>
            </div>

            <div className="atg-res-datos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {[
                { label: 'Variante',   valor: varianteSeleccionada?.nombre },
                { label: 'Base',       valor: baseSeleccionada?.nombre },
                { label: 'Relleno',    valor: rellenosSeleccionados.map(r => r.nombre).join(' · ') },
                { label: 'Decoración', valor: decoracionesSeleccionadas.map(d => d.nombre).join(' · ') },
                { label: 'Tamaño',     valor: `${tamanioSeleccionado.nombre} · ${tamanioSeleccionado.desc}` },
              ].map(item => (
                <div key={item.label} className="atg-res-item" style={{
                  background: P.white,
                  border: `1px solid ${P.creamDark}`,
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 2px 6px rgba(61,32,16,0.05)',
                }}>
                  <p className="atg-res-item-label" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: P.roseDark, margin: '0 0 0.3rem' }}>
                    {item.label}
                  </p>
                  <p className="atg-res-item-valor" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 400, color: P.brown, margin: 0, lineHeight: 1.3 }}>
                    {item.valor}
                  </p>
                </div>
              ))}
            </div>

            <div className="atg-res-nota" style={{ background: `${P.peach}33`, border: `1px solid ${P.peachDark}44`, borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: P.brownMid, margin: 0, lineHeight: 1.65, fontStyle: 'italic' }}>
                🌸 Nota técnica: recomendamos un corte en bloques rectangulares para apreciar las capas de relleno y asegurar la estabilidad de cada porción.
              </p>
            </div>

            {/* Bloque precio destacado */}
            <div className="atg-res-precio" style={{
              background: `linear-gradient(135deg, ${P.rose}22, ${P.peach}22)`,
              border: `1.5px solid ${P.roseDark}55`,
              borderRadius: '14px',
              padding: '1.5rem 1.25rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}>
              <p className="atg-res-precio-label" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: P.roseDark, margin: '0 0 0.5rem', fontWeight: 600 }}>
                Valor total
              </p>
              <p className="atg-res-monto" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 500, color: P.brown, margin: 0, lineHeight: 1.1, letterSpacing: '0.01em' }}>
                {fmtPrecio(precioFinal)}
              </p>
              {sinAzucar && (
                <p className="atg-res-recargo" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: P.roseDark, margin: '0.5rem 0 0', fontStyle: 'italic' }}>
                  🌿 Incluye recargo sin azúcar añadida: +{fmtPrecio(recargoSinAzucarAplicado)}
                </p>
              )}
              <p className="atg-res-disc" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: P.brownLight, margin: '0.75rem 0 0', lineHeight: 1.6 }}>
                Precio referencial. Combinaciones premium pueden tener un pequeño ajuste — te lo confirmamos por WhatsApp.
              </p>
            </div>

            <a
              href={`https://wa.me/56990991011?text=${mensajeWsp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="atg-res-wsp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                width: '100%',
                background: '#25D366',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '1rem',
                borderRadius: '14px',
                textDecoration: 'none',
                boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.49a.5.5 0 0 0 .617.6l5.8-1.519A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              Consultar precio por WhatsApp
            </a>

            <button
              onClick={armarOtraTorta}
              className="atg-res-otra"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                marginTop: '0.85rem',
                background: 'transparent',
                border: `1.5px solid ${P.roseDark}`,
                color: P.roseDark,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '0.85rem',
                borderRadius: '14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              ✿ Armar otra torta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
