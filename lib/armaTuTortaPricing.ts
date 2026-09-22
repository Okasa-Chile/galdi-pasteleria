// Datos y lógica de precios de "Arma tu Torta", compartidos entre el
// componente (components/ArmaTuTorta.tsx) y el script de verificación
// (scripts/verify-arma-tu-torta-precios.mjs). Se mantienen en un módulo
// sin JSX para que el script pueda importar precioTamanio() directamente
// con `node --experimental-strip-types`, sin reimplementar la fórmula.

export const VARIANTES = [
  { id: 'con-azucar', nombre: 'Con azúcar', icono: '🍰', desc: 'Nuestra receta clásica, con el dulzor tradicional de Galdi.' },
  { id: 'sin-azucar',  nombre: 'Sin azúcar añadida', icono: '🌿', desc: 'Endulzada con alulosa, el endulzante más noble. Producto sin azúcar añadida.' },
];

export const BASES = [
  { id: 'bizcocho',  nombre: 'Bizcocho',  imagen: '/images/arma-tu-torta/base-bizcocho.webp',  desc: 'Miga aireada y esponjosa. Base clásica para toda ocasión.', sinAzucar: true, intensivo: false },
  { id: 'hojarasca', nombre: 'Hojarasca', imagen: '/images/arma-tu-torta/base-hojarasca.webp', desc: 'Capas crocantes y mantequilladas. Carácter y textura propios.', sinAzucar: true, intensivo: false },
  { id: 'panqueque', nombre: 'Panqueque', imagen: '/images/arma-tu-torta/base-panqueque.webp',  desc: 'Finas láminas delicadas apiladas. Elegancia en cada corte.', sinAzucar: true, intensivo: false },
];

export const RELLENOS = [
  { id: 'manjar',              nombre: 'Manjar',                imagen: '/images/arma-tu-torta/relleno-manjar.webp',              desc: 'Dulce de leche artesanal, denso y caramelizado.', sinAzucar: true, intensivo: true },
  { id: 'crema-pastelera',     nombre: 'Crema Pastelera',       imagen: '/images/arma-tu-torta/relleno-crema-pastelera.webp',     desc: 'Crema de vainilla sedosa, equilibrada y tradicional.', sinAzucar: true, intensivo: false },
  { id: 'ganache-chocolate',   nombre: 'Ganache de Chocolate',  imagen: '/images/arma-tu-torta/relleno-ganache-chocolate.webp',   desc: 'Chocolate semi-amargo emulsionado. Intensidad pura.', sinAzucar: false, intensivo: false },
  { id: 'mermelada-guinda',    nombre: 'Mermelada de Guinda',   imagen: '/images/arma-tu-torta/relleno-mermelada-guinda.webp',    desc: 'Acidez frutal que equilibra los rellenos dulces.', sinAzucar: true, intensivo: true },
  { id: 'mermelada-frambuesa', nombre: 'Mermelada de Frambuesa',imagen: '/images/arma-tu-torta/relleno-mermelada-frambuesa.webp', desc: 'Frambuesa fresca en conserva, vibrante y aromática.', sinAzucar: true, intensivo: true },
  { id: 'mermelada-durazno',   nombre: 'Mermelada de Durazno',  imagen: '/images/arma-tu-torta/relleno-mermelada-durazno.webp',   desc: 'Suave y perfumada, ideal para maridajes delicados.', sinAzucar: true, intensivo: true },
  { id: 'crema-lucuma',        nombre: 'Crema de Lúcuma',       imagen: '/images/arma-tu-torta/relleno-crema-lucuma.webp',        desc: 'Fruta andina transformada en crema noble y singular.', sinAzucar: true, intensivo: false },
  { id: 'frutas-conserva',     nombre: 'Frutas en Conserva',    imagen: '/images/arma-tu-torta/relleno-frutas-conserva.webp',     desc: 'Piña y durazno en almíbar, jugosos y refrescantes.', sinAzucar: false, intensivo: false },
  { id: 'mantequilla-mani',    nombre: 'Mantequilla de Maní',   imagen: '/images/arma-tu-torta/relleno-mantequilla-mani.webp',    desc: 'Textura cremosa con notas tostadas. Sorprendente.', sinAzucar: true, intensivo: false },
  { id: 'crema-diplomatica',   nombre: 'Crema Diplomática',     imagen: '/images/arma-tu-torta/relleno-crema-diplomatica.webp',   desc: 'Pastelera aligerada con chantilly, suave y aterciopelada.', sinAzucar: true, intensivo: false },
];

export const DECORACIONES = [
  { id: 'merengue',         nombre: 'Merengue',           imagen: '/images/arma-tu-torta/deco-merengue.webp',         desc: 'Picos blancos y livianos. Acabado clásico.', sinAzucar: true, intensivo: true },
  { id: 'chantilly',        nombre: 'Chantilly',           imagen: '/images/arma-tu-torta/deco-chantilly.webp',        desc: 'Crema batida sedosa y delicada.', sinAzucar: true, intensivo: false },
  { id: 'ganache',          nombre: 'Ganache',             imagen: '/images/arma-tu-torta/deco-ganache.webp',          desc: 'Cobertura brillante con caída artística.', sinAzucar: false, intensivo: false },
  { id: 'manjar-deco',      nombre: 'Manjar',              imagen: '/images/arma-tu-torta/deco-manjar.webp',           desc: 'Hilos de dulce de leche. Acabado cálido.', sinAzucar: true, intensivo: true },
  { id: 'frutas-frescas',   nombre: 'Frutas Frescas',      imagen: '/images/arma-tu-torta/deco-frutas-frescas.webp',   desc: 'Fresas y frambuesas naturales. Frescura y color.', sinAzucar: true, intensivo: false },
  { id: 'trozos-chocolate', nombre: 'Trozos de Chocolate', imagen: '/images/arma-tu-torta/deco-trozos-chocolate.webp', desc: 'Escamas de chocolate oscuro. Textura y profundidad.', sinAzucar: true, intensivo: true },
  { id: 'crema-diplomatica-deco', nombre: 'Crema Diplomática', imagen: '/images/arma-tu-torta/deco-crema-diplomatica.webp', desc: 'Rosetones livianos y sedosos, textura delicada.', sinAzucar: true, intensivo: false },
];

export const TAMANIOS = [
  { id: 'S',  nombre: 'S',  desc: '6 a 8 porciones',   detalle: 'Celebraciones íntimas.',  precio: 22000 },
  { id: 'M',  nombre: 'M',  desc: '10 a 12 porciones', detalle: 'Reuniones familiares.',   precio: 30000 },
  { id: 'L',  nombre: 'L',  desc: '16 a 20 porciones', detalle: 'Eventos medianos.',       precio: 42000 },
  { id: 'XL', nombre: 'XL', desc: '25 a 30 porciones', detalle: 'Grandes celebraciones.',  precio: 55000 },
];

// Recargo sin azúcar añadida por composición (talla × base / relleno / deco).
// Estudio de mercado sept-2026: Ruyed, La Colonia, y precios de manjar sin
// azúcar y alulosa como insumos. El recargo de relleno/decoración se aplica
// en proporción a cuántos de los elegidos son "intensivos" (encarecen más
// su versión sin azúcar), no por conteo fijo — ver CHANGELOG.
export const RECARGO_SIN_AZUCAR: Record<string, { base: number; relleno: number; deco: number }> = {
  S:  { base: 2000, relleno: 1500, deco: 1000 },
  M:  { base: 2500, relleno: 2000, deco: 1500 },
  L:  { base: 3500, relleno: 3000, deco: 2000 },
  XL: { base: 4500, relleno: 4000, deco: 3000 },
};

export const fmtPrecio = (n: number) => '$' + n.toLocaleString('es-CL');

export function calcularRecargoSinAzucar(
  tamanioId: string,
  rellenosSel: { intensivo: boolean }[],
  decoSel: { intensivo: boolean }[]
) {
  const cfg = RECARGO_SIN_AZUCAR[tamanioId];
  const ratioRelleno = rellenosSel.length ? rellenosSel.filter(r => r.intensivo).length / rellenosSel.length : 0;
  const ratioDeco = decoSel.length ? decoSel.filter(d => d.intensivo).length / decoSel.length : 0;
  return cfg.base + cfg.relleno * ratioRelleno + cfg.deco * ratioDeco;
}

export function precioTamanio(
  tamanio: { id: string; precio: number },
  sinAzucar: boolean,
  rellenosSel: { intensivo: boolean }[],
  decoSel: { intensivo: boolean }[]
) {
  if (!sinAzucar) return tamanio.precio;
  const recargo = calcularRecargoSinAzucar(tamanio.id, rellenosSel, decoSel);
  return Math.ceil((tamanio.precio + recargo) / 500) * 500;
}
