'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

// ── Datos ────────────────────────────────────────────────────────────────────

const BASES = [
  { id: 'bizcocho',  nombre: 'Bizcocho',  imagen: '/images/arma-tu-torta/base-bizcocho.webp',  desc: 'Miga aireada y esponjosa. Base clásica para toda ocasión.' },
  { id: 'hojarasca', nombre: 'Hojarasca', imagen: '/images/arma-tu-torta/base-hojarasca.webp', desc: 'Capas crocantes y mantequilladas. Carácter y textura propios.' },
  { id: 'panqueque', nombre: 'Panqueque', imagen: '/images/arma-tu-torta/base-panqueque.webp',  desc: 'Finas láminas delicadas apiladas. Elegancia en cada corte.' },
];

const RELLENOS = [
  { id: 'manjar',              nombre: 'Manjar',                imagen: '/images/arma-tu-torta/relleno-manjar.webp',              desc: 'Dulce de leche artesanal, denso y caramelizado.' },
  { id: 'crema-pastelera',     nombre: 'Crema Pastelera',       imagen: '/images/arma-tu-torta/relleno-crema-pastelera.webp',     desc: 'Crema de vainilla sedosa, equilibrada y tradicional.' },
  { id: 'ganache-chocolate',   nombre: 'Ganache de Chocolate',  imagen: '/images/arma-tu-torta/relleno-ganache-chocolate.webp',   desc: 'Chocolate semi-amargo emulsionado. Intensidad pura.' },
  { id: 'mermelada-guinda',    nombre: 'Mermelada de Guinda',   imagen: '/images/arma-tu-torta/relleno-mermelada-guinda.webp',    desc: 'Acidez frutal que equilibra los rellenos dulces.' },
  { id: 'mermelada-frambuesa', nombre: 'Mermelada de Frambuesa',imagen: '/images/arma-tu-torta/relleno-mermelada-frambuesa.webp', desc: 'Frambuesa fresca en conserva, vibrante y aromática.' },
  { id: 'mermelada-durazno',   nombre: 'Mermelada de Durazno',  imagen: '/images/arma-tu-torta/relleno-mermelada-durazno.webp',   desc: 'Suave y perfumada, ideal para maridajes delicados.' },
  { id: 'crema-lucuma',        nombre: 'Crema de Lúcuma',       imagen: '/images/arma-tu-torta/relleno-crema-lucuma.webp',        desc: 'Fruta andina transformada en crema noble y singular.' },
  { id: 'frutas-conserva',     nombre: 'Frutas en Conserva',    imagen: '/images/arma-tu-torta/relleno-frutas-conserva.webp',     desc: 'Piña y durazno en almíbar, jugosos y refrescantes.' },
  { id: 'mantequilla-mani',    nombre: 'Mantequilla de Maní',   imagen: '/images/arma-tu-torta/relleno-mantequilla-mani.webp',    desc: 'Textura cremosa con notas tostadas. Sorprendente.' },
];

const DECORACIONES = [
  { id: 'merengue',         nombre: 'Merengue',           imagen: '/images/arma-tu-torta/deco-merengue.webp',         desc: 'Picos blancos y livianos. Acabado clásico.' },
  { id: 'chantilly',        nombre: 'Chantilly',           imagen: '/images/arma-tu-torta/deco-chantilly.webp',        desc: 'Crema batida sedosa y delicada.' },
  { id: 'ganache',          nombre: 'Ganache',             imagen: '/images/arma-tu-torta/deco-ganache.webp',          desc: 'Cobertura brillante con caída artística.' },
  { id: 'manjar-deco',      nombre: 'Manjar',              imagen: '/images/arma-tu-torta/deco-manjar.webp',           desc: 'Hilos de dulce de leche. Acabado cálido.' },
  { id: 'frutas-frescas',   nombre: 'Frutas Frescas',      imagen: '/images/arma-tu-torta/deco-frutas-frescas.webp',   desc: 'Fresas y frambuesas naturales. Frescura y color.' },
  { id: 'trozos-chocolate', nombre: 'Trozos de Chocolate', imagen: '/images/arma-tu-torta/deco-trozos-chocolate.webp', desc: 'Escamas de chocolate oscuro. Textura y profundidad.' },
];

const TAMANIOS = [
  { id: 'S',  nombre: 'S',  desc: '6 a 8 porciones',   detalle: 'Celebraciones íntimas.' },
  { id: 'M',  nombre: 'M',  desc: '10 a 12 porciones', detalle: 'Reuniones familiares.' },
  { id: 'L',  nombre: 'L',  desc: '16 a 20 porciones', detalle: 'Eventos medianos.' },
  { id: 'XL', nombre: 'XL', desc: '25 a 30 porciones', detalle: 'Grandes celebraciones.' },
];

// ── Subcomponente: Card opción ────────────────────────────────────────────────

function OpcionCard({ opcion, seleccionada, onSelect, deshabilitada = false }: {
  opcion: { id: string; nombre: string; imagen: string; desc: string };
  seleccionada: boolean;
  onSelect: () => void;
  deshabilitada?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={deshabilitada && !seleccionada}
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
      <div style={{
        position: 'relative',
        width: '180px',
        height: '180px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: seleccionada ? `1.5px solid ${P.roseDark}` : `1.5px solid ${P.creamDark}`,
      }}>
        <Image src={opcion.imagen} alt={opcion.nombre} fill style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          fontWeight: 400,
          color: seleccionada ? P.brownMid : P.brown,
          margin: 0,
          lineHeight: 1.2,
        }}>
          {opcion.nombre}
        </p>
        <p style={{
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
        <span style={{
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

function TamanioCard({ tamanio, seleccionado, onSelect }: {
  tamanio: { id: string; nombre: string; desc: string; detalle: string };
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
    </button>
  );
}

// ── Subcomponente: Paso ───────────────────────────────────────────────────────

function Paso({ numero, titulo, subtitulo, completado, activo, children }: {
  numero: number;
  titulo: string;
  subtitulo?: string;
  completado: boolean;
  activo: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      marginBottom: '2.5rem',
      opacity: activo || completado ? 1 : 0.35,
      transition: 'opacity 0.3s ease',
    }}>
      <div style={{
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
        <div style={{ paddingLeft: '54px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function ArmaTuTorta() {
  const [base, setBase]                         = useState<string | null>(null);
  const [rellenos, setRellenos]                 = useState<string[]>([]);
  const [rellenosConfirmados, setRellenosConf]  = useState(false);
  const [decoraciones, setDecoraciones]         = useState<string[]>([]);
  const [decoracionesConfirmadas, setDecoConf]  = useState(false);
  const [tamanio, setTamanio]                   = useState<string | null>(null);

  const pasoActivo =
    !base                     ? 1 :
    !rellenosConfirmados      ? 2 :
    !decoracionesConfirmadas  ? 3 :
    !tamanio                  ? 4 : 5;

  const baseSeleccionada          = BASES.find(b => b.id === base);
  const rellenosSeleccionados     = RELLENOS.filter(r => rellenos.includes(r.id));
  const decoracionesSeleccionadas = DECORACIONES.filter(d => decoraciones.includes(d.id));
  const tamanioSeleccionado       = TAMANIOS.find(t => t.id === tamanio);

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
    `🍰 Base: ${baseSeleccionada?.nombre ?? ''}\n` +
    `🍯 Relleno: ${rellenosSeleccionados.map(r => r.nombre).join(', ')}\n` +
    `✨ Decoración: ${decoracionesSeleccionadas.map(d => d.nombre).join(', ')}\n` +
    `📏 Tamaño: ${tamanioSeleccionado?.nombre ?? ''} (${tamanioSeleccionado?.desc ?? ''})\n\n` +
    `¿Me pueden cotizar? 🙏`
  );

  return (
    <div style={{ background: P.cream, minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(160deg, ${P.white} 0%, ${P.peach}44 50%, ${P.rose}22 100%)`,
        padding: 'clamp(4rem, 10vh, 7rem) 5% 3rem',
        textAlign: 'center',
        borderBottom: `1px solid ${P.creamDark}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
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
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            opacity: 0.5,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Link href="/" style={{ textDecoration: 'none' }}>
          <p style={{
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
        <h1 style={{
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
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
          color: P.brownMid,
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.75,
        }}>
          Diseña la torta de tus sueños. Elige cada detalle — la elaboramos con los mismos estándares artesanales que nos definen desde siempre.
        </p>

        <div style={{
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

        <Image
          src="/images/arma-tu-torta/flor-esquina-der.webp"
          alt=""
          width={160}
          height={160}
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
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 5% 6rem' }}>

        {/* PASO 1 — Base */}
        <Paso numero={1} titulo="Elige tu base" subtitulo="La arquitectura de tu torta" completado={pasoActivo > 1} activo={pasoActivo === 1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {BASES.map(b => (
              <OpcionCard
                key={b.id}
                opcion={b}
                seleccionada={base === b.id}
                onSelect={() => { setBase(b.id); setRellenos([]); setRellenosConf(false); setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
              />
            ))}
          </div>
        </Paso>

        {pasoActivo > 1 && baseSeleccionada && (
          <div style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Base: <span style={{ color: P.brownMid, fontWeight: 600 }}>{baseSeleccionada.nombre}</span>
              <button onClick={() => { setBase(null); setRellenos([]); setRellenosConf(false); setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
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

        {/* PASO 2 — Rellenos */}
        <Paso numero={2} titulo="Elige el relleno" subtitulo="Puedes elegir hasta 3 sabores" completado={pasoActivo > 2} activo={pasoActivo === 2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {RELLENOS.map(r => (
              <OpcionCard
                key={r.id}
                opcion={r}
                seleccionada={rellenos.includes(r.id)}
                onSelect={() => toggleRelleno(r.id)}
                deshabilitada={rellenos.length >= 3 && !rellenos.includes(r.id)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
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

        {pasoActivo > 2 && rellenosSeleccionados.length > 0 && (
          <div style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Relleno: <span style={{ color: P.brownMid, fontWeight: 600 }}>{rellenosSeleccionados.map(r => r.nombre).join(', ')}</span>
              <button onClick={() => { setRellenos([]); setRellenosConf(false); setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 2 && (
          <div style={{ borderTop: `1px solid ${P.creamDark}`, marginBottom: '2.5rem' }} />
        )}

        {/* PASO 3 — Decoraciones */}
        <Paso numero={3} titulo="Elige la decoración" subtitulo="Puedes elegir hasta 2 opciones" completado={pasoActivo > 3} activo={pasoActivo === 3}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {DECORACIONES.map(d => (
              <OpcionCard
                key={d.id}
                opcion={d}
                seleccionada={decoraciones.includes(d.id)}
                onSelect={() => toggleDecoracion(d.id)}
                deshabilitada={decoraciones.length >= 2 && !decoraciones.includes(d.id)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
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

        {pasoActivo > 3 && decoracionesSeleccionadas.length > 0 && (
          <div style={{ paddingLeft: '54px', marginTop: '-1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: P.brownLight, margin: 0 }}>
              Decoración: <span style={{ color: P.brownMid, fontWeight: 600 }}>{decoracionesSeleccionadas.map(d => d.nombre).join(', ')}</span>
              <button onClick={() => { setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
                style={{ background: 'none', border: 'none', color: P.roseDark, fontSize: '0.62rem', cursor: 'pointer', marginLeft: '0.6rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                cambiar
              </button>
            </p>
          </div>
        )}

        {pasoActivo > 3 && (
          <div style={{ borderTop: `1px solid ${P.creamDark}`, marginBottom: '2.5rem' }} />
        )}

        {/* PASO 4 — Tamaño */}
        <Paso numero={4} titulo="Elige el tamaño" subtitulo="¿Para cuántas personas?" completado={pasoActivo > 4} activo={pasoActivo === 4}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {TAMANIOS.map(t => (
              <TamanioCard
                key={t.id}
                tamanio={t}
                seleccionado={tamanio === t.id}
                onSelect={() => setTamanio(t.id)}
              />
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: P.brownLight, marginTop: '0.75rem', fontStyle: 'italic' }}>
            * Las porciones son aproximadas y varían según el corte.
          </p>
        </Paso>

        {/* ── Resumen final ── */}
        {pasoActivo === 5 && tamanioSeleccionado && (
          <div style={{
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

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Image
                src="/images/arma-tu-torta/flor-corona.webp"
                alt=""
                width={120}
                height={90}
                style={{ opacity: 0.65 }}
              />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: P.roseDark, margin: '0 0 0.5rem' }}>
                Tu torta
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, color: P.brown, margin: 0 }}>
                Una creación artesanal única
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ height: '1px', width: '30px', background: `linear-gradient(to right, transparent, ${P.roseDark})` }} />
                <span style={{ color: P.roseDark, fontSize: '0.7rem' }}>✿</span>
                <div style={{ height: '1px', width: '30px', background: `linear-gradient(to left, transparent, ${P.roseDark})` }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {[
                { label: 'Base',       valor: baseSeleccionada?.nombre },
                { label: 'Relleno',    valor: rellenosSeleccionados.map(r => r.nombre).join(' · ') },
                { label: 'Decoración', valor: decoracionesSeleccionadas.map(d => d.nombre).join(' · ') },
                { label: 'Tamaño',     valor: `${tamanioSeleccionado.nombre} · ${tamanioSeleccionado.desc}` },
              ].map(item => (
                <div key={item.label} style={{
                  background: P.white,
                  border: `1px solid ${P.creamDark}`,
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 2px 6px rgba(61,32,16,0.05)',
                }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: P.roseDark, margin: '0 0 0.3rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 400, color: P.brown, margin: 0, lineHeight: 1.3 }}>
                    {item.valor}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: `${P.peach}33`, border: `1px solid ${P.peachDark}44`, borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: P.brownMid, margin: 0, lineHeight: 1.65, fontStyle: 'italic' }}>
                🌸 Nota técnica: recomendamos un corte en bloques rectangulares para apreciar las capas de relleno y asegurar la estabilidad de cada porción.
              </p>
            </div>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', fontWeight: 300, color: P.brownMid, textAlign: 'center', marginBottom: '1.5rem' }}>
              El valor se cotiza según tu combinación elegida.
            </p>

            <a
              href={`https://wa.me/56990991011?text=${mensajeWsp}`}
              target="_blank"
              rel="noopener noreferrer"
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
              onClick={() => { setBase(null); setRellenos([]); setRellenosConf(false); setDecoraciones([]); setDecoConf(false); setTamanio(null); }}
              style={{
                display: 'block',
                margin: '1.1rem auto 0',
                background: 'none',
                border: 'none',
                color: P.brownLight,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                letterSpacing: '0.05em',
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
