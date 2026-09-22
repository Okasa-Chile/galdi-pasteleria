// Datos y lógica de precios de "Arma tu Torta", compartidos con el
// componente (components/ArmaTuTorta.tsx). Se mantienen en un módulo sin
// JSX para que un futuro script de verificación pueda importar
// precioTamanio() directamente con `node --experimental-strip-types`,
// sin reimplementar la fórmula (ver "Pendientes abiertos" en CHANGELOG.md).

export const VARIANTES = [
  { id: 'con-azucar', nombre: 'Con azúcar', icono: '🍰', desc: 'Nuestra receta clásica, con el dulzor tradicional de Galdi.' },
  { id: 'sin-azucar',  nombre: 'Sin azúcar añadida', icono: '🌿', desc: 'Endulzada con alulosa, el endulzante más noble. Producto sin azúcar añadida.' },
];

export const BASES = [
  { id: 'bizcocho',  nombre: 'Bizcocho',  nombreSinAzucar: 'Bizcocho sin azúcar añadida',  imagen: '/images/arma-tu-torta/base-bizcocho.webp',  desc: 'Miga aireada y esponjosa. Base clásica para toda ocasión.', sinAzucar: true, intensivo: false },
  { id: 'hojarasca', nombre: 'Hojarasca', imagen: '/images/arma-tu-torta/base-hojarasca.webp', desc: 'Capas crocantes y mantequilladas. Carácter y textura propios.', sinAzucar: true, intensivo: false },
  { id: 'panqueque', nombre: 'Panqueque', nombreSinAzucar: 'Panqueque sin azúcar añadida',  imagen: '/images/arma-tu-torta/base-panqueque.webp',  desc: 'Finas láminas delicadas apiladas. Elegancia en cada corte.', sinAzucar: true, intensivo: false },
];

export const RELLENOS = [
  { id: 'manjar',              nombre: 'Manjar',                nombreSinAzucar: 'Manjar sin azúcar añadida',                imagen: '/images/arma-tu-torta/relleno-manjar.webp',              desc: 'Dulce de leche artesanal, denso y caramelizado.', sinAzucar: true, intensivo: true },
  { id: 'crema-pastelera',     nombre: 'Crema Pastelera',       nombreSinAzucar: 'Crema Pastelera sin azúcar añadida',       imagen: '/images/arma-tu-torta/relleno-crema-pastelera.webp',     desc: 'Crema de vainilla sedosa, equilibrada y tradicional.', sinAzucar: true, intensivo: false },
  { id: 'ganache-chocolate',   nombre: 'Ganache de Chocolate',  imagen: '/images/arma-tu-torta/relleno-ganache-chocolate.webp',   desc: 'Chocolate semi-amargo emulsionado. Intensidad pura.', sinAzucar: false, intensivo: false },
  { id: 'mermelada-guinda',    nombre: 'Mermelada de Guinda',   nombreSinAzucar: 'Mermelada de Guinda sin azúcar añadida',   imagen: '/images/arma-tu-torta/relleno-mermelada-guinda.webp',    desc: 'Acidez frutal que equilibra los rellenos dulces.', sinAzucar: true, intensivo: true },
  { id: 'mermelada-frambuesa', nombre: 'Mermelada de Frambuesa',nombreSinAzucar: 'Mermelada de Frambuesa sin azúcar añadida',imagen: '/images/arma-tu-torta/relleno-mermelada-frambuesa.webp', desc: 'Frambuesa fresca en conserva, vibrante y aromática.', sinAzucar: true, intensivo: true },
  { id: 'mermelada-durazno',   nombre: 'Mermelada de Durazno',  nombreSinAzucar: 'Mermelada de Durazno sin azúcar añadida',  imagen: '/images/arma-tu-torta/relleno-mermelada-durazno.webp',   desc: 'Suave y perfumada, ideal para maridajes delicados.', sinAzucar: true, intensivo: true },
  { id: 'crema-lucuma',        nombre: 'Crema de Lúcuma',       nombreSinAzucar: 'Crema de Lúcuma sin azúcar añadida',       imagen: '/images/arma-tu-torta/relleno-crema-lucuma.webp',        desc: 'Fruta andina transformada en crema noble y singular.', sinAzucar: true, intensivo: false },
  { id: 'frutas-conserva',     nombre: 'Frutas en Conserva',    imagen: '/images/arma-tu-torta/relleno-frutas-conserva.webp',     desc: 'Piña y durazno en almíbar, jugosos y refrescantes.', sinAzucar: false, intensivo: false },
  { id: 'mantequilla-mani',    nombre: 'Mantequilla de Maní',   imagen: '/images/arma-tu-torta/relleno-mantequilla-mani.webp',    desc: 'Textura cremosa con notas tostadas. Sorprendente.', sinAzucar: false, intensivo: false },
  { id: 'crema-diplomatica',   nombre: 'Crema Diplomática',     nombreSinAzucar: 'Crema Diplomática sin azúcar añadida',     imagen: '/images/arma-tu-torta/relleno-crema-diplomatica.webp',   desc: 'Pastelera aligerada con chantilly, suave y aterciopelada.', sinAzucar: true, intensivo: false },
];

export const DECORACIONES = [
  { id: 'merengue',         nombre: 'Merengue',           nombreSinAzucar: 'Merengue sin azúcar añadida',           imagen: '/images/arma-tu-torta/deco-merengue.webp',         desc: 'Picos blancos y livianos. Acabado clásico.', sinAzucar: true, intensivo: true },
  { id: 'chantilly',        nombre: 'Chantilly',           nombreSinAzucar: 'Chantilly sin azúcar añadida',          imagen: '/images/arma-tu-torta/deco-chantilly.webp',        desc: 'Crema batida sedosa y delicada.', sinAzucar: true, intensivo: false },
  { id: 'ganache',          nombre: 'Ganache',             imagen: '/images/arma-tu-torta/deco-ganache.webp',          desc: 'Cobertura brillante con caída artística.', sinAzucar: false, intensivo: false },
  { id: 'manjar-deco',      nombre: 'Manjar',              nombreSinAzucar: 'Manjar sin azúcar añadida',             imagen: '/images/arma-tu-torta/deco-manjar.webp',           desc: 'Hilos de dulce de leche. Acabado cálido.', sinAzucar: true, intensivo: true },
  { id: 'frutas-frescas',   nombre: 'Frutas Frescas',      imagen: '/images/arma-tu-torta/deco-frutas-frescas.webp',   desc: 'Fresas y frambuesas naturales. Frescura y color.', sinAzucar: true, intensivo: false },
  { id: 'trozos-chocolate', nombre: 'Trozos de Chocolate', nombreSinAzucar: 'Trozos de Chocolate sin azúcar añadida',imagen: '/images/arma-tu-torta/deco-trozos-chocolate.webp', desc: 'Escamas de chocolate oscuro. Textura y profundidad.', sinAzucar: true, intensivo: true },
  { id: 'crema-diplomatica-deco', nombre: 'Crema Diplomática', nombreSinAzucar: 'Crema Diplomática sin azúcar añadida', imagen: '/images/arma-tu-torta/deco-crema-diplomatica.webp', desc: 'Rosetones livianos y sedosos, textura delicada.', sinAzucar: true, intensivo: false },
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

// En el camino sin azúcar añadida, los ítems con nombreSinAzucar muestran ese
// nombre (cards, resumen, mensaje de WhatsApp) en vez del nombre normal.
export function conNombreVariante<T extends { nombre: string; nombreSinAzucar?: string }>(
  items: T[],
  sinAzucar: boolean
): T[] {
  if (!sinAzucar) return items;
  return items.map(item => item.nombreSinAzucar ? { ...item, nombre: item.nombreSinAzucar } : item);
}

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
