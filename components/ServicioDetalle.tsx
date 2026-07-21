'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { imagenes } from './Catalogo';
import { usePreciosGaldi } from '@/hooks/usePreciosGaldi';

// ─── Productos por servicio y tab ───────────────────────────────────────────

const productosAlmacenes: Record<string, { nombre: string; nombreVisible?: string; imagen: string; unidad: string; detalle?: string }[]> = {
  'Pan': [
    { nombre: 'Pan Amasado',               imagen: imagenes['Pan Amasado'],               unidad: 'kg' },
    { nombre: 'Tortilla con Chicharrones', imagen: imagenes['Tortilla con Chicharrones'], unidad: 'unidad' },
    { nombre: 'Pan Integral',              imagen: imagenes['Pan Integral'],              unidad: 'kg' },
    { nombre: 'Pan Frica',                 imagen: imagenes['Pan Frica'],                 unidad: 'kg' },
    { nombre: 'Dobladitas',                imagen: imagenes['Dobladitas'],                unidad: 'kg' },
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
    { nombre: 'Empanada de Pino',       nombreVisible: 'Pino',          imagen: imagenes['Pino'],                    unidad: 'docena' },
    { nombre: 'Empanada Napolitana',    nombreVisible: 'Napolitana',    imagen: imagenes['Napolitana'],              unidad: 'docena' },
    { nombre: 'Empanada Vegetariana',   nombreVisible: 'Vegetariana',   imagen: imagenes['Vegetariana'],             unidad: 'docena' },
    { nombre: 'Empanada Queso Camarón', nombreVisible: 'Queso Camarón', imagen: imagenes['Queso Camarón'],           unidad: 'docena' },
    { nombre: 'Empanada de Mariscos',                                   imagen: imagenes['Empanada de Mariscos'],    unidad: 'docena' },
  ],
};

const productosDelivery: Record<string, { nombre: string; nombreVisible?: string; imagen: string; unidad: string; href?: string; detalle?: string }[]> = {
  'Tortas': [
    { nombre: 'Torta 3 Leches', imagen: imagenes['Torta 3 Leches'], unidad: 'un',
      detalle: 'Bizcocho, tres leches (evaporada, condensada, crema), merengue' },
    { nombre: 'Torta de Chocolate', imagen: imagenes['Torta de Chocolate'], unidad: 'un',
      detalle: 'Bizcocho de chocolate, relleno y cobertura de chocolate' },
    { nombre: 'Torta Moka', nombreVisible: 'Moka / Pralinée', imagen: imagenes['Moca / Pralinée'], unidad: 'un',
      detalle: 'Bizcocho, crema de café, praliné de frutos secos caramelizados' },
    { nombre: 'Torta Selva Negra', nombreVisible: 'Selva Negra', imagen: imagenes['Selva Negra'], unidad: 'un',
      detalle: 'Bizcocho de chocolate, mermelada de cerezas, crema chantilly' },
    { nombre: 'Torta Panqueque', imagen: imagenes['Torta Panqueque'], unidad: 'un',
      detalle: 'Panqueques finos, manjar (o chocolate/frambuesa a elección)' },
    { nombre: 'Torta de Piña', imagen: imagenes['Torta de Piña'], unidad: 'un',
      detalle: 'Bizcocho, piña natural, crema chantilly' },
    { nombre: 'Torta de Hojarasca', imagen: imagenes['Torta de Hojarasca'], unidad: 'un',
      detalle: 'Masa de hojarasca en capas crocantes, manjar' },
    { nombre: 'Torta Amor', imagen: imagenes['Torta Amor'], unidad: 'un',
      detalle: 'Hojarasca, crema pastelera, frambuesas, manjar, merengue' },
    { nombre: 'Arma tu Torta', imagen: '/images/torta-personalizada.webp', unidad: 'un', href: '/arma-tu-torta',
      detalle: 'Diseña tu torta ideal: elige base, relleno, decoración y tamaño a tu gusto' },
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
    { nombre: 'Empanada de Pino',       nombreVisible: 'Pino',          imagen: imagenes['Pino'],                 unidad: 'docena' },
    { nombre: 'Empanada Napolitana',    nombreVisible: 'Napolitana',    imagen: imagenes['Napolitana'],           unidad: 'docena' },
    { nombre: 'Empanada Vegetariana',   nombreVisible: 'Vegetariana',   imagen: imagenes['Vegetariana'],          unidad: 'docena' },
    { nombre: 'Empanada Queso Camarón', nombreVisible: 'Queso Camarón', imagen: imagenes['Queso Camarón'],        unidad: 'docena' },
    { nombre: 'Empanada de Mariscos',                                   imagen: imagenes['Empanada de Mariscos'], unidad: 'docena' },
  ],
  'Dulces': [
    { nombre: 'Berlines',               imagen: imagenes['Berlines'],               unidad: 'docena' },
    { nombre: 'Alfajores de Chocolate', imagen: imagenes['Alfajores de Chocolate'], unidad: 'docena' },
    { nombre: 'Chilenitos',             imagen: imagenes['Chilenitos'],             unidad: 'docena' },
    { nombre: 'Pasteles Rectangulares', imagen: imagenes['Pasteles Rectangulares'], unidad: 'docena' },
  ],
  'Pan': [
    { nombre: 'Pan Amasado',               imagen: imagenes['Pan Amasado'],               unidad: 'unidad' },
    { nombre: 'Tortilla con Chicharrones', imagen: imagenes['Tortilla con Chicharrones'], unidad: 'unidad' },
    { nombre: 'Ciabatta',                  imagen: imagenes['Pan Amasado'],               unidad: 'unidad' },
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
];

const corporativosSlides = [
  '/images/eventos/coffee01.webp',
  '/images/eventos/coffee02.webp',
  '/images/eventos/coffee03.webp',
  '/images/eventos/coffee04.webp',
  '/images/eventos/coffee05.webp',
  '/images/eventos/coffee06.webp',
  '/images/eventos/coffee07.webp',
  '/images/eventos/coffee08.webp',
  '/images/eventos/coffee09.webp',
  '/images/eventos/coffee10.webp',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pluralizar(cantidad: number, unidad: string): string {
  if (unidad === 'docena') return cantidad === 1 ? 'docena' : 'docenas';
  if (unidad === 'unidad') return cantidad === 1 ? 'unidad' : 'unidades';
  return unidad;
}

// ─── Mínimos por producto ────────────────────────────────────────────────────

function getMinimo(tab: string, unidad: string, nombre: string = '', serviceId: string = ''): number {
  if (nombre === 'Tortilla con Chicharrones') return 2;
  if (tab === 'Pan' && nombre !== 'Tortilla con Chicharrones') return 3;
  if (tab === 'Empanadas' && serviceId === 'delivery') return 4;
  if (unidad === 'docena') return 1;
  if (tab === 'Queques') return 2;
  return 1;
}

function getLabelMinimo(tab: string, unidad: string, nombre: string = '', serviceId: string = ''): string {
  if (nombre === 'Tortilla con Chicharrones') return 'mín. 2 un';
  if (tab === 'Pan' && nombre !== 'Tortilla con Chicharrones') return 'mín. 3 kg';
  if (tab === 'Empanadas' && serviceId === 'delivery') return 'mín. 4 un';
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
  pageMode?: boolean;
}

type Carrito = Record<string, number>;

// ─── Componente principal ────────────────────────────────────────────────────

export default function ServicioDetalle({ id, nombre, imagen, initialTab, onClose, pageMode = false }: Props) {

  const tabsAlmacenes = Object.keys(productosAlmacenes);
  const tabsDelivery  = Object.keys(productosDelivery);
  const tabsEventos   = Object.keys(eventosData);

  const tabs =
    id === 'b2b'      ? tabsAlmacenes :
    id === 'delivery' ? tabsDelivery  :
    tabsEventos;

  const { precios } = usePreciosGaldi();

  const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0]);
  const [carrito, setCarrito]     = useState<Carrito>({});
  const [tallaActiva, setTallaActiva] = useState<Record<string, 'S'|'M'|'L'|'XL'>>({});
  const [eventoImg, setEventoImg] = useState(eventosData[tabs[0]]?.imagen ?? imagen);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (pageMode) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [pageMode]);

  // Sincronizar carrito a sessionStorage en cada cambio + disparar evento global
  useEffect(() => {
    const itemsCarrito = Object.entries(carrito).map(([key, cantidad]) => {
      const partes = key.split(' · ');
      const nomProd = partes[0];
      const tallaProd = partes[1] as 'S'|'M'|'L'|'XL' | undefined;
      const todosLosProductos = [
        ...Object.values(productosAlmacenes).flat(),
        ...Object.values(productosDelivery).flat(),
      ];
      const prod = todosLosProductos.find(p => p.nombre === nomProd);
      const precioInfo = precios[nomProd];
      const precio = tallaProd
        ? (precioInfo?.[`precio${tallaProd}` as keyof typeof precioInfo] as number ?? precioInfo?.precio ?? 0)
        : (precioInfo?.precio ?? 0);
      const esEmpanadasDelivery = productosDelivery['Empanadas']?.some(p => p.nombre === nomProd) && id === 'delivery';
      const unidad = esEmpanadasDelivery ? 'unidad' : (prod?.unidad ?? 'un');
      const nombreVisible = prod && 'nombreVisible' in prod && (prod as { nombreVisible?: string }).nombreVisible
        ? (prod as { nombreVisible?: string }).nombreVisible!
        : nomProd;
      return { nombre: nomProd, nombreVisible, talla: tallaProd, precio, cantidad, unidad };
    });
    try {
      sessionStorage.setItem('galdi_carrito', JSON.stringify(itemsCarrito));
      window.dispatchEvent(new Event('galdi:carrito-actualizado'));
    } catch { /* nada */ }
  }, [carrito, precios, id]);

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
      activeTab === 'Matrimonios'  ? matrimonioSlides  :
      activeTab === 'Cóctel'       ? coctelSlides       :
      activeTab === 'Cumpleaños'   ? cumpleanosSlides   :
      activeTab === 'Corporativos' ? corporativosSlides : null;
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
  function agregar(nombre: string, tab: string, unidad: string, carritoKey?: string) {
    const key = carritoKey ?? nombre;
    const min = getMinimo(tab, unidad, nombre, id);
    setCarrito(prev => ({
      ...prev,
      [key]: (prev[key] ?? 0) + min,
    }));
  }

  function quitar(nombre: string, tab: string, unidad: string, carritoKey?: string) {
    const key = carritoKey ?? nombre;
    const min = getMinimo(tab, unidad, nombre, id);
    setCarrito(prev => {
      const actual = prev[key] ?? 0;
      if (actual <= min) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: actual - min };
    });
  }

  function eliminarItem(key: string) {
    setCarrito(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const totalItems = Object.keys(carrito).length;

  const fmt = (n: number) => n > 0 ? '$' + n.toLocaleString('es-CL') : '—';

  const totalMonto = Object.entries(carrito).reduce((sum, [key, cantidad]) => {
    const partes = key.split(' · ');
    const nomProd = partes[0];
    const talla = partes[1] as 'S' | 'M' | 'L' | 'XL' | undefined;
    const p = precios[nomProd];
    if (!p) return sum;
    const precio = talla
      ? (talla === 'S' ? p.precioS : talla === 'M' ? p.precioM : talla === 'L' ? p.precioL : p.precioXL) ?? 0
      : p.precio;
    return sum + precio * cantidad;
  }, 0);

  function enviarWhatsApp() {
    // Validar mínimo 9 kg total de pan
    const productosPan = productosAlmacenes['Pan']
      ?.filter(p => p.nombre !== 'Tortilla con Chicharrones')
      .map(p => p.nombre) ?? [];
    const totalKgPan = productosPan.reduce((sum, nombre) => sum + (carrito[nombre] ?? 0), 0);
    if (totalKgPan > 0 && totalKgPan < 9) {
      alert(`El pedido de pan debe sumar al menos 9 kg en total (actualmente: ${totalKgPan} kg).`);
      return;
    }

    const lineas = Object.entries(carrito)
      .map(([key, cantidad]) => {
        const partes = key.split(' · ');
        const nomProd = partes[0];
        const tallaProd = partes[1] as 'S'|'M'|'L'|'XL' | undefined;
        const todosLosProductos = [
          ...Object.values(productosAlmacenes).flat(),
          ...Object.values(productosDelivery).flat(),
        ];
        const prod = todosLosProductos.find(p => p.nombre === nomProd);
        const esEmpanada = productosDelivery['Empanadas']?.some(p => p.nombre === nomProd);
        const unidad = (id === 'delivery' && esEmpanada) ? 'unidad' : (prod?.unidad ?? 'un');
        const tallaStr = tallaProd ? ` (talla ${tallaProd}, ${DESC_TALLA[tallaProd].split(' — ')[1] ?? DESC_TALLA[tallaProd]})` : '';
        return `• ${cantidad} ${pluralizar(cantidad, unidad)} — ${nomProd}${tallaStr}`;
      })
      .join('\n');
    const tipo = id === 'b2b' ? 'distribución a almacén' : 'delivery';
    const msg = `Hola Galdi, quiero hacer un pedido de ${tipo}:\n${lineas}\n¿Me pueden cotizar?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function irACarrito() {
    router.push('/carrito');
  }

  const DESC_TALLA: Record<string, string> = {
    S: 'S — 8 a 10 personas',
    M: 'M — 14 a 16 personas',
    L: 'L — 20 a 22 personas',
    XL: '25 personas',
  };

  return (
    <div
      id={pageMode ? 'productos' : undefined}
      style={pageMode
        ? { position: 'relative', display: 'block', minHeight: '100vh', scrollMarginTop: '116px', paddingTop: '2.5rem' }
        : { position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', animation: 'svcFadeIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both' }
      }
    >
      <style>{`
        @keyframes svcFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes svcPrecioIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .svc-tab {
          background: none;
          border: none;
          color: rgba(245,230,211,0.55);
          font-family: var(--font-sans);
          font-size: 0.82rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.9rem 1.4rem 1.1rem;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          min-width: 120px;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1), text-shadow 0.4s ease;
        }
        .svc-tab::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
          transform: translateX(-50%);
          transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .svc-tab::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: width 0.5s ease, height 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }
        .svc-tab:hover {
          color: rgba(245,230,211,0.95);
        }
        .svc-tab:hover::before {
          width: 40%;
        }
        .svc-tab.active {
          color: var(--gold);
          text-shadow: 0 0 12px rgba(212,168,83,0.35);
        }
        .svc-tab.active::before {
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
          box-shadow: 0 0 8px rgba(212,168,83,0.4);
        }
        .svc-tab.active::after {
          width: 120%;
          height: 200%;
        }
        .svc-prod-card { position: relative; background: rgba(26,15,10,0.55); backdrop-filter: blur(4px); border: 1px solid rgba(212,168,83,0.15); display: flex; flex-direction: column; overflow: hidden; transition: border-color 0.25s; }
        .svc-prod-card:hover { border-color: rgba(212,168,83,0.4); }
        .svc-btn-add { background: #f0c040; border: none; color: #1a0f0a; font-weight: 600; font-family: var(--font-sans); font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.5rem; cursor: pointer; width: 100%; transition: background 0.2s; }
        .svc-btn-add:hover { background: var(--terracota); color: var(--cream); }
        .svc-counter { display: flex; align-items: center; justify-content: space-between; background: rgba(212,168,83,0.15); padding: 0.3rem 0.5rem; }
        .svc-counter button { background: none; border: 1px solid rgba(212,168,83,0.4); color: var(--gold); width: 1.4rem; height: 1.4rem; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; }
        .svc-whatsapp-bar {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: linear-gradient(180deg, rgba(26,15,10,0.92) 0%, rgba(26,15,10,0.98) 100%);
          backdrop-filter: blur(12px);
          border-top: 2px solid var(--gold);
          padding: 1rem 5%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
          z-index: 10001;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.4);
        }
        .svc-cart-btn {
          display: flex; align-items: center; gap: 0.7rem;
          background: var(--gold);
          color: var(--dark);
          border: none;
          padding: 0.7rem 1.4rem;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(212,168,83,0.35);
          flex: 1;
          justify-content: center;
        }
        .svc-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212,168,83,0.55);
        }
        .svc-cart-icon-wrap {
          position: relative;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
        }
        .svc-cart-badge {
          position: absolute;
          top: -6px; right: -8px;
          background: var(--terracota);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--dark);
          animation: badgePop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes badgePop {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .svc-vaciar-btn {
          background: transparent;
          border: 1px solid rgba(245,100,100,0.4);
          color: rgba(245,150,150,0.9);
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.55rem 0.9rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .svc-vaciar-btn:hover {
          background: rgba(245,100,100,0.15);
          color: rgba(255,180,180,1);
        }
        .svc-resumen-overlay { position: fixed; inset: 0; background: rgba(26,15,10,0.7); backdrop-filter: blur(4px); z-index: 10002; display: flex; align-items: flex-start; padding-top: 4vh; justify-content: center; }
        .svc-resumen-panel {
          background: #2a1205;
          border: 1px solid rgba(212,168,83,0.25);
          border-bottom: none;
          width: 100%;
          max-width: 720px;
          padding: 1.75rem;
          border-radius: 14px 14px 0 0;
          animation: slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 88vh;
          overflow-y: auto;
        }
        .svc-resumen-item-card {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(212,168,83,0.12);
        }
        .svc-resumen-item-img {
          width: 64px;
          height: 64px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(212,168,83,0.2);
          position: relative;
        }
        .svc-resumen-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }
        .svc-resumen-item-nombre {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--cream);
          font-weight: 500;
        }
        .svc-resumen-item-cant {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--gold);
          font-weight: 600;
          flex-shrink: 0;
        }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .svc-resumen-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid rgba(212,168,83,0.1); font-family: var(--font-sans); font-size: 0.8rem; color: var(--cream); }
        .talla-btn {
          position: relative;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          background: transparent;
          color: var(--gold);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          padding: 0;
          line-height: 1;
        }
        .talla-btn:hover {
          background: rgba(212,168,83,0.15);
          color: var(--cream);
          transform: scale(1.08);
        }
        .talla-btn.sel {
          background: var(--gold);
          color: var(--dark);
          transform: scale(1.18);
          box-shadow: 0 0 0 3px rgba(212,168,83,0.25), 0 0 14px rgba(212,168,83,0.55);
          animation: tallaPulse 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .talla-btn.sel:hover {
          background: var(--gold);
          color: var(--dark);
          transform: scale(1.18);
        }
        @keyframes tallaPulse {
          0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(212,168,83,0.6); }
          50%  { transform: scale(1.28); box-shadow: 0 0 0 8px rgba(212,168,83,0.15); }
          100% { transform: scale(1.18); box-shadow: 0 0 0 3px rgba(212,168,83,0.25), 0 0 14px rgba(212,168,83,0.55); }
        }
        .talla-personas { font-size: 9px; color: rgba(201,165,90,0.8); text-align: center; padding: 4px 0 6px; letter-spacing: 0.04em; min-height: 18px; }
        div[style*="overflowX: auto"]::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Imagen de fondo ── */}
      {id === 'eventos' ? (
        <img src={eventoImg} alt={activeTab} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'opacity 0.5s' }} />
      ) : (
        <Image src={bgImagen} alt={nombre} fill style={{ objectFit: 'cover', objectPosition: 'top' }} priority />
      )}

      {/* Gradiente */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,10,0.6) 0%, rgba(26,15,10,0.5) 40%, rgba(26,15,10,0.92) 100%)' }} />

      {/* ── Header: logo + nombre + cerrar (solo modo overlay) ── */}
      {!pageMode && (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 5%' }}>
            <button onClick={() => { onClose(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img src="/images/Nuevologo.webp" alt="Galdi" style={{ height: '52px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </button>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)' }}>{nombre}</span>
            <button onClick={() => { onClose(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'rgba(26,15,10,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(245,230,211,0.25)', color: 'var(--cream)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,230,211,0.15)', overflowX: 'auto', scrollbarWidth: 'none', paddingLeft: '5%' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`svc-tab${t === activeTab ? ' active' : ''}`}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── Título (solo pageMode) ── */}
      {pageMode && (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 5% 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.08em', margin: 0 }}>{nombre}</h2>
        </div>
      )}

      {/* ── Tabs sticky (solo pageMode) — hijo directo del root para que sticky funcione ── */}
      {pageMode && (
        <div style={{
          position: 'sticky',
          top: '76px',
          zIndex: 499,
          display: 'flex',
          borderBottom: '1px solid rgba(245,230,211,0.15)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
          paddingLeft: '5%',
          backgroundColor: 'rgba(26,15,10,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`svc-tab${t === activeTab ? ' active' : ''}`}>{t}</button>
          ))}
        </div>
      )}

      {/* ── Contenido scrolleable ── */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: pageMode ? 'visible' : 'auto', overflowX: 'hidden', padding: '0.5rem 5%', paddingBottom: totalItems > 0 ? '5rem' : '1.5rem' }}>

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
        {(activeTab === 'Matrimonios' || activeTab === 'Cóctel' || activeTab === 'Cumpleaños' || activeTab === 'Corporativos') && (() => {
          const slides =
            activeTab === 'Matrimonios'  ? matrimonioSlides  :
            activeTab === 'Cóctel'       ? coctelSlides       :
            activeTab === 'Cumpleaños'   ? cumpleanosSlides   :
            corporativosSlides;
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
              const tabsConTalla = ['Tortas', 'Pasteles', 'Queques'];
              const esConTallas = id === 'delivery' && tabsConTalla.includes(activeTab);
              const esTorta = esConTallas; // alias para no romper otras referencias en el componente
              const tallaSeleccionada = tallaActiva[prod.nombre];
              const carritoKey = esTorta && tallaSeleccionada ? `${prod.nombre} · ${tallaSeleccionada}` : prod.nombre;
              const enCarrito = carrito[carritoKey] ?? 0;
              const min = getMinimo(activeTab, prod.unidad, prod.nombre, id);
              const label = getLabelMinimo(activeTab, prod.unidad, prod.nombre, id);
              const esArmaTuTorta = prod.nombre === 'Arma tu Torta';
              const card = (
                <div key={prod.nombre} className="svc-prod-card">
                  {/* Imagen */}
                  <div style={{ position: 'relative', height: '260px' }}>
                    <Image src={prod.imagen} alt={prod.nombre} fill style={{ objectFit: 'cover' }} />
                  </div>
                  {/* Nombre + mínimo + selector talla */}
                  <div style={{ padding: '0.4rem 0.5rem 0.3rem', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                    <div>
                      {esArmaTuTorta ? (
                        <Link href="/arma-tu-torta" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {/* Pseudo-elemento: hace clickeable toda la tarjeta (menos los botones, que van con z-index superior) */}
                          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
                          <p style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--cream)', fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{prod.nombreVisible ?? prod.nombre}</p>
                        </Link>
                      ) : (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--cream)', fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{prod.nombreVisible ?? prod.nombre}</p>
                      )}
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'rgba(212,168,83,0.7)', margin: '0.15rem 0 0', letterSpacing: '0.05em' }}>{label}</p>
                      {prod.detalle && (
                        <p style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.6rem',
                          color: 'rgba(245,230,211,0.55)',
                          margin: '0.15rem 0 0',
                          lineHeight: 1.35,
                        }}>
                          {prod.detalle}
                        </p>
                      )}
                    </div>
                    {esTorta && (
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginTop: '1px', position: 'relative', zIndex: 1 }}>
                        {(() => {
                          let tallas: ('S'|'M'|'L'|'XL')[];
                          if (activeTab === 'Queques') tallas = ['S', 'M'];
                          else if (activeTab === 'Pasteles') tallas = ['S', 'M', 'L'];
                          else tallas = ['S', 'M', 'L', ...(prod.nombre === 'Torta Panqueque' || prod.nombre === 'Torta de Chocolate' ? ['XL' as const] : [])];
                          return tallas;
                        })().map(t => (
                          <button
                            key={t}
                            className={`talla-btn${tallaSeleccionada === t ? ' sel' : ''}`}
                            onClick={() => setTallaActiva(prev => {
                              const actual = prev[prod.nombre];
                              if (actual === t) {
                                const copia = { ...prev };
                                delete copia[prod.nombre];
                                return copia;
                              }
                              return { ...prev, [prod.nombre]: t as 'S'|'M'|'L'|'XL' };
                            })}
                          >{t}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Precio Firestore */}
                  {(() => {
                    const p = precios[prod.nombre];
                    if (!p) return null;
                    const tieneTallas = p.precioS || p.precioM || p.precioL || p.precioXL;

                    // Torta con talla seleccionada: solo precio centrado de esa talla
                    if (esTorta && tallaSeleccionada && tieneTallas) {
                      const precioTalla = p[`precio${tallaSeleccionada}` as 'precioS'|'precioM'|'precioL'|'precioXL'];
                      if (!precioTalla) return null;
                      return (
                        <div
                          key={`precio-${tallaSeleccionada}`}
                          style={{
                            padding: '0.55rem 0.6rem',
                            borderTop: '1px solid rgba(212,168,83,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.15rem',
                            animation: 'svcPrecioIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', color: 'rgba(212,168,83,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                            Talla {tallaSeleccionada}
                          </span>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.02em', textShadow: '0 0 10px rgba(212,168,83,0.25)' }}>
                            {fmt(precioTalla)}
                          </span>
                        </div>
                      );
                    }

                    // Torta sin talla seleccionada: ocultar precios (no mostrar nada)
                    if (esTorta && tieneTallas) {
                      return null;
                    }

                    // Producto con tallas pero no es torta: lista referencial centrada
                    if (tieneTallas) {
                      return (
                        <div style={{ padding: '0.3rem 0.5rem', borderTop: '1px solid rgba(212,168,83,0.1)', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                          {p.precioS  && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', color: 'rgba(212,168,83,0.75)' }}>S {fmt(p.precioS)}</span>}
                          {p.precioM  && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', color: 'rgba(212,168,83,0.75)' }}>M {fmt(p.precioM)}</span>}
                          {p.precioL  && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', color: 'rgba(212,168,83,0.75)' }}>L {fmt(p.precioL)}</span>}
                          {p.precioXL && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', color: 'rgba(212,168,83,0.75)' }}>XL {fmt(p.precioXL)}</span>}
                        </div>
                      );
                    }

                    // Producto sin tallas: precio único centrado
                    return (
                      <div style={{ padding: '0.4rem 0.5rem', borderTop: '1px solid rgba(212,168,83,0.1)', textAlign: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 600 }}>{fmt(p.precio)}</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'rgba(212,168,83,0.6)', marginLeft: '4px' }}>/ {p.unidad}</span>
                      </div>
                    );
                  })()}
                  {/* Botón agregar / contador */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {esTorta && !tallaSeleccionada ? (
                      <button className="svc-btn-add" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        Elige tamaño
                      </button>
                    ) : enCarrito === 0 ? (
                      <button className="svc-btn-add" onClick={() => agregar(carritoKey, activeTab, prod.unidad)}><span style={{fontSize:'1rem'}}>🛒</span> AGREGAR</button>
                    ) : (
                      <div className="svc-counter">
                        <button onClick={() => quitar(carritoKey, activeTab, prod.unidad)}>−</button>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--cream)' }}>{enCarrito} {pluralizar(enCarrito, (activeTab === 'Empanadas' && id === 'delivery') ? 'unidad' : prod.unidad)}</span>
                        <button onClick={() => agregar(carritoKey, activeTab, prod.unidad)}>+</button>
                      </div>
                    )}
                  </div>
                  {/* Texto personas — solo tortas en delivery */}
                  {esTorta && (
                    <div className="talla-personas" style={{ color: tallaSeleccionada ? 'rgba(201,165,90,0.8)' : 'rgba(220,100,100,0.8)' }}>
                      {tallaSeleccionada ? DESC_TALLA[tallaSeleccionada] : '← Elige un tamaño primero'}
                    </div>
                  )}
                </div>
              );
              return card;
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.9rem', borderBottom: '1px solid rgba(212,168,83,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--cream)', fontWeight: 300 }}>Mi Carrito</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button onClick={() => { setCarrito({}); setMostrarResumen(false); }} style={{ background: 'transparent', border: '1px solid rgba(245,100,100,0.5)', color: 'rgba(245,150,150,0.9)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.4rem 0.75rem', cursor: 'pointer', fontFamily: 'var(--font-sans)', borderRadius: '5px' }}>Vaciar</button>
                    <button onClick={() => setMostrarResumen(false)} style={{ background: 'none', border: 'none', color: 'rgba(245,230,211,0.6)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                  </div>
                </div>
                {/* Lista de productos */}
                <div style={{ marginBottom: '1.4rem', maxHeight: '50vh', overflowY: 'auto' }}>
                  {Object.entries(carrito).map(([key, cantidad]) => {
                    const partes = key.split(' · ');
                    const nomProd = partes[0];
                    const tallaProd = partes[1] as 'S'|'M'|'L'|'XL' | undefined;
                    const todosLosProductos = [
                      ...Object.values(productosAlmacenes).flat(),
                      ...Object.values(productosDelivery).flat(),
                    ];
                    const prod = todosLosProductos.find(p => p.nombre === nomProd);
                    const nombreVisible = prod && 'nombreVisible' in prod && (prod as { nombreVisible?: string }).nombreVisible
                      ? (prod as { nombreVisible?: string }).nombreVisible!
                      : nomProd;
                    const esEmpanadasDelivery = productosDelivery['Empanadas']?.some(p => p.nombre === nomProd) && id === 'delivery';
                    const unidad = esEmpanadasDelivery ? 'unidad' : (prod?.unidad ?? 'un');
                    const precioInfo = precios[nomProd];
                    const precioUnit = tallaProd && precioInfo
                      ? (precioInfo[`precio${tallaProd}` as 'precioS'|'precioM'|'precioL'|'precioXL'] ?? precioInfo.precio ?? 0)
                      : (precioInfo?.precio ?? 0);
                    const subtotal = precioUnit * cantidad;
                    return (
                      <div key={key} className="svc-resumen-item-card">
                        {prod?.imagen && (
                          <div className="svc-resumen-item-img">
                            <Image src={prod.imagen} alt={nombreVisible} fill style={{ objectFit: 'cover' }} />
                          </div>
                        )}
                        <div className="svc-resumen-item-info">
                          <span className="svc-resumen-item-nombre">{nombreVisible}</span>
                          {tallaProd && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ background: 'var(--gold)', color: 'var(--dark)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.08em' }}>
                                {tallaProd}
                              </span>
                              <span style={{ fontSize: '0.68rem', color: 'rgba(201,165,90,0.8)' }}>
                                {DESC_TALLA[tallaProd].split(' — ')[1] ?? DESC_TALLA[tallaProd]}
                              </span>
                            </div>
                          )}
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'rgba(245,230,211,0.6)' }}>
                            {cantidad} {pluralizar(cantidad, unidad)} {precioUnit > 0 && `· ${fmt(precioUnit)} c/u`}
                          </span>
                        </div>
                        <span className="svc-resumen-item-cant">{precioUnit > 0 ? fmt(subtotal) : `${cantidad} ${pluralizar(cantidad, unidad)}`}</span>
                        <button
                          onClick={() => eliminarItem(key)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(245,150,150,0.7)',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            padding: '0 0.25rem',
                            lineHeight: 1,
                            flexShrink: 0,
                            marginLeft: 'auto',
                          }}
                          title="Eliminar"
                        >×</button>
                      </div>
                    );
                  })}
                </div>
                {/* Total */}
                {totalMonto > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(212,168,83,0.2)' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'rgba(245,230,211,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 600 }}>{fmt(totalMonto)}</span>
                  </div>
                )}
                {/* Botones acción */}
                <button onClick={() => { irACarrito(); setMostrarResumen(false); }} style={{ width: '100%', background: '#d4a853', border: 'none', color: '#1a0f0a', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '6px', fontWeight: 700, marginBottom: '0.65rem' }}>
                  Pagar online con Flow →
                </button>
                <button onClick={() => { enviarWhatsApp(); setMostrarResumen(false); }} style={{ width: '100%', background: 'transparent', border: '1px solid #25D366', color: '#25D366', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '6px' }}>
                  Cotizar por WhatsApp
                </button>
              </div>
            </div>
          )}
          {/* Barra inferior */}
          <div className="svc-whatsapp-bar">
            <button className="svc-vaciar-btn" onClick={() => setCarrito({})}>Vaciar</button>
            <button className="svc-cart-btn" onClick={() => setMostrarResumen(true)}>
              <span className="svc-cart-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span className="svc-cart-badge">{totalItems}</span>
              </span>
              <span>Mi Carrito · {fmt(totalMonto)}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
