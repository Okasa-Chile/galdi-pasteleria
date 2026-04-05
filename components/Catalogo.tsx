'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useScrollReveal from '@/hooks/useScrollReveal';

const WA_SVG = (
  <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: 'currentColor', flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const imagenes: Record<string, string> = {
  // Pan Artesanal
  'Pan Amasado':               '/images/pan-amasado-new.webp',
  'Tortilla con Chicharrones': '/images/tortilla-chicharrones-new.webp',
  'Pan Integral':              '/images/Pan integral.webp',
  'Pan Frica':                 '/images/Pan Frica.webp',
  'Dobloditas':                '/images/Dobladitas.webp',
  'Marraqueta':                '/images/Marraquetas.webp',
  'Chicharrones':              '/images/chicharrones.webp',
  // Pasteles & Tartas
  'Pie de Limón Merengado':    '/images/prod-pie.webp',
  'Kuchen Sureño':             '/images/kuchen-sureno.webp',
  'Kuchen de Nuez':            '/images/kuchen-nueces.webp',
  'Banofee':                   '/images/Banofee.webp',
  'Tartaletas':                '/images/Tartaletas.webp',
  // Tortas
  'Torta 3 Leches':            '/images/torta-3-leches.webp',
  'Torta de Chocolate':        '/images/torta-chocolate.webp',
  'Moca / Pralinée':           '/images/torta-moka.webp',
  'Selva Negra':               '/images/torta-selva-negra.webp',
  'Panqueque':                 '/images/torta-panqueques.webp',
  'Torta de Piña':             '/images/torta-pina-new.webp',
  'Torta de Hojarasca':        '/images/torta-hojarasca-new.webp',
  // Dulces & Alfajores
  'Berlines':                  '/images/Berlines.webp',
  'Alfajores de Manjar':       '/images/alfajores-manjar.webp',
  'Alfajores de Chocolate':    '/images/alfajores-chocolate.webp',
  'Chilenitos':                '/images/alfajores-manjar.webp',
  'Pasteles Rectangulares':    '/images/pasteles-rectangulares.webp',
  // Empanadas
  'Pino':                      '/images/empanada-pino.webp',
  'Napolitana':                '/images/empanada-napolitana.webp',
  'Vegetariana':               '/images/prod-empanada.webp',
  'Queso Camarón':             '/images/empanada-camaron.webp',
  'Empanada de Mariscos':      '/images/Empanada de Mariscos.webp',
  // Queques
  'Queque de Naranja':         '/images/queque-naranja.webp',
  'Queque Mármol':             '/images/queque-marmol.webp',
  'Queque Tradicional':        '/images/queque-tradicional.webp',
  'Muffins':                   '/images/muffins.webp',
};

const categorias = [
  {
    id: 'pan',
    label: 'Pan Artesanal',
    productos: [
      { nombre: 'Pan Amasado',               detalle: 'Nuestro pan de siempre, amasado a mano con harina selecta y el cariño que solo da la receta familiar. 16 unidades de 100g.' },
      { nombre: 'Tortilla con Chicharrones', detalle: 'Masa tierna enriquecida con chicharrones dorados, perfecta para el desayuno o la once en familia.' },
      { nombre: 'Pan Integral',              detalle: 'Elaborado con cereales integrales seleccionados, nutritivo y auténticamente artesanal de principio a fin.' },
      { nombre: 'Pan Frica',                 detalle: 'Pan esponjoso y dorado, opcionalmente coronado con sésamo tostado para un toque crujiente especial.' },
      { nombre: 'Dobloditas',                detalle: 'Rollitos de masa suave y tierna, ideales para el desayuno y once familiar.' },
      { nombre: 'Marraqueta',                detalle: 'El pan chileno por excelencia. Corteza crujiente, miga suave y aroma inconfundible, hecho a mano.' },
    ],
  },
  {
    id: 'pasteles',
    label: 'Pasteles & Tartas',
    productos: [
      { nombre: 'Pie de Limón Merengado', detalle: 'La acidez del limón en armonía perfecta con merengue tostado. Molde 26–28 cm.' },
      { nombre: 'Kuchen Sureño',          detalle: 'Masa mantequillada con fruta de temporada: frambuesa, manzana, arándano, frutilla o durazno.' },
      { nombre: 'Kuchen de Nuez',         detalle: 'Nueces caramelizadas sobre masa crocante y mantequillada.' },
      { nombre: 'Banofee',                detalle: 'Capas de galleta, dulce de leche y plátano fresco cubiertas con crema batida.' },
      { nombre: 'Tartaletas',             detalle: 'Pequeñas tartas individuales con rellenos de temporada.' },
    ],
  },
  {
    id: 'tortas',
    label: 'Tortas',
    productos: [
      { nombre: 'Torta 3 Leches',      detalle: 'Bizcocho empapado en tres leches que derrite todo en el primer bocado.' },
      { nombre: 'Torta de Chocolate',  detalle: 'Húmeda, intensa y con cobertura de cacao puro.' },
      { nombre: 'Moca / Pralinée',     detalle: 'Café aromático y frutos secos caramelizados en una torta de elegancia incomparable.' },
      { nombre: 'Selva Negra',         detalle: 'Bizcocho de chocolate con cerezas y crema chantilly.' },
      { nombre: 'Panqueque',           detalle: 'Delicadas capas de panqueques con manjar entre cada una.' },
      { nombre: 'Torta de Piña',       detalle: 'Bizcocho esponjoso con piña natural, crema batida y un toque dulce que refresca en cada bocado.' },
      { nombre: 'Torta de Hojarasca', detalle: 'Delicadas capas de masa crocante unidas con manjar, un clásico chileno irresistible.' },
    ],
  },
  {
    id: 'dulces',
    label: 'Dulces & Alfajores',
    productos: [
      { nombre: 'Berlines',                 detalle: 'Suaves y esponjosos, rellenos de manjar o crema pastelera, espolvoreados con azúcar flor.' },
{ nombre: 'Alfajores de Chocolate',   detalle: 'Rellenos de manjar y bañados en cobertura de chocolate semi amargo o blanco.' },
      { nombre: 'Chilenitos',               detalle: 'El dulce más chileno: masa crocante con manjar y bañados en merengue azucarado.' },
      { nombre: 'Pasteles Rectangulares',   detalle: 'Torta en trozo, ideal para eventos y pedidos por unidad. Mismos sabores de nuestras tortas completas.' },
    ],
  },
  {
    id: 'queques',
    label: 'Queques & Muffins',
    productos: [
      { nombre: 'Queque de Naranja', detalle: 'Esponjoso y perfumado, con toda la frescura cítrica de naranjas naturales.' },
      { nombre: 'Queque Mármol',     detalle: 'Veteado de chocolate y vainilla, húmedo y esponjoso en cada corte.' },
      { nombre: 'Queque Tradicional', detalle: 'Esponjoso y dorado, elaborado con la receta de siempre. Un clásico del horno artesanal que nunca falla.' },
      { nombre: 'Muffins',           detalle: 'Pequeños bizcochos individuales en distintos sabores de temporada.' },
    ],
  },
  {
    id: 'empanadas',
    label: 'Empanadas',
    badge: 'Pedido mínimo: 1 docena',
    productos: [
      { nombre: 'Pino',          detalle: 'Nuestra empanada clásica con pino chileno tradicional: jugosa y bien sazonada.' },
      { nombre: 'Napolitana',    detalle: 'Rellena de jamón, tomate y queso fundido en masa artesanal dorada.' },
      { nombre: 'Vegetariana',   detalle: 'Relleno colorido de verduras salteadas con el punto justo de sazón.' },
      { nombre: 'Queso Camarón', detalle: 'Camarones frescos con queso derretido en masa artesanal dorada.' },
      { nombre: 'Empanada de Mariscos', detalle: 'Generosa mezcla de mariscos frescos sazonados con especias, envuelta en masa artesanal dorada y crocante.' },
    ],
  },
];

const delays = ['0s', '0.06s', '0.12s', '0.18s', '0.24s', '0.30s'];

function CatalogoInner() {
  const [activeTab, setActiveTab] = useState('pan');

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo');
    if (target === 'productos') {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        const el = document.getElementById('productos');
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 50);
    }
  }, []);

  const categoriaActiva = categorias.find((c) => c.id === activeTab)!;
  useScrollReveal(activeTab);

  return (
    <>
      <style>{`
        @keyframes catFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-tab-btn {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 1rem 1.4rem;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          transition: color var(--transition);
          color: rgba(26,15,10,0.65);
        }
        .cat-tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--terracota);
          transform: scaleX(0);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .cat-tab-btn:hover { color: rgba(26,15,10,0.72); }
        .cat-tab-btn.active { color: var(--terracota); }
        .cat-tab-btn.active::after { transform: scaleX(1); }

        .cat-card-item {
          background: rgba(26,15,10,0.6);
          border: 1px solid rgba(212,168,83,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
          animation: catFadeUp 0.45s ease both;
        }
        .cat-card-item:hover {
          border-color: rgba(212,168,83,0.32);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.4);
        }
        .cat-card-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          align-self: flex-start;
          background: transparent;
          border: 1px solid rgba(37,211,102,0.32);
          color: rgba(37,211,102,0.7);
          text-decoration: none;
          font-size: 0.63rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.48rem 0.95rem;
          border-radius: 2px;
          transition: background var(--transition), border-color var(--transition), color var(--transition);
          cursor: pointer;
        }
        .cat-card-wa-btn:hover {
          background: rgba(37,211,102,0.1);
          border-color: #25D366;
          color: #25D366;
        }
        .cat-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.8rem;
          padding: 0.45rem 1.1rem;
          background: rgba(92,51,23,0.08);
          border: 1px solid rgba(92,51,23,0.25);
          border-radius: 2px;
          font-size: 0.67rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--brown-warm);
          font-family: var(--font-sans);
        }
        .cat-badge-pill::before {
          content: '◆';
          font-size: 0.48rem;
          color: var(--terracota);
        }
      `}</style>

      <section id="productos" style={{ padding: '1rem 0 3rem', background: '#f5ede3', scrollMarginTop: '90px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '0 5%', marginBottom: '0.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.67rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--terracota)',
            marginBottom: '0.75rem',
          }}>
            Nuestros Productos
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: 'var(--brown-dark)',
            lineHeight: 1.2,
          }}>
            Elaborados con <em style={{ fontStyle: 'italic', color: 'var(--terracota)' }}>amor</em>
          </h2>
          <div style={{ width: 48, height: 1, background: 'var(--terracota)', margin: '1rem auto 0' }} />
        </div>

        {/* Tabs */}
        <div style={{
          overflowX: 'auto',
          padding: '0 5%',
          borderBottom: '1px solid rgba(26,15,10,0.14)',
          scrollbarWidth: 'none',
          position: 'sticky',
          top: '90px',
          zIndex: 100,
          backgroundColor: 'var(--cream)',
        }}>
          <div role="tablist" aria-label="Categorías de productos" style={{ display: 'inline-flex', minWidth: '100%' }}>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-btn${activeTab === cat.id ? ' active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
                role="tab"
                aria-selected={activeTab === cat.id}
                aria-label={cat.label}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel activo */}
        <div key={activeTab} style={{ padding: '0.5rem 5% 0' }}>


          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            background: 'rgba(26,15,10,0.07)',
          }}>
            {categoriaActiva.productos.map((prod, i) => (
              <article
                key={prod.nombre}
                className="cat-card-item"
                style={{ animationDelay: delays[i] ?? '0s' }}
              >
                {/* Visual */}
                {imagenes[prod.nombre] ? (
                  <div style={{ position: 'relative', height: 118, overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={imagenes[prod.nombre]}
                      alt={prod.nombre}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(26,15,10,0.18) 0%, rgba(26,15,10,0.6) 100%)',
                    }} />
                  </div>
                ) : (
                  <div style={{
                    height: 118,
                    flexShrink: 0,
                    background: categoriaActiva.id === 'tortas'
                      ? 'linear-gradient(135deg, #120608 0%, #3d0f0e 55%, #5c1812 100%)'
                      : 'linear-gradient(135deg, #2a1605 0%, #5c3812 55%, #7a5222 100%)',
                  }} />
                )}

                {/* Body */}
                <div style={{ padding: '0.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    fontWeight: 400,
                    color: 'var(--cream-light)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3,
                  }}>
                    {prod.nombre}
                  </h3>
                  <p style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.01em',
                    color: 'rgba(245,230,211,0.75)',
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: '1.1rem',
                    fontFamily: 'var(--font-sans)',
                  }}>
                    {prod.detalle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

export default function Catalogo() {
  return <CatalogoInner />;
}
