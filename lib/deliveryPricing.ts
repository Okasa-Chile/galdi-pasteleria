/**
 * Fuente única de verdad de la política de delivery por radio de kilómetros.
 *
 * REGLA: coordenadas de origen, pedido mínimo y tramos de precio van
 * EXCLUSIVAMENTE aquí. Nunca hardcodear estos datos en páginas, componentes
 * ni en la Cloud Function — todos deben importar desde este archivo.
 *
 * Reemplaza la política anterior basada en comunas (vigente hasta 08-2026).
 */

export const ORIGEN_GALDI = {
  lat: -33.4776144,
  lng: -70.7521309,
} as const;

export const PEDIDO_MINIMO_DELIVERY = 15000;

export interface TramoDelivery {
  hastaKm: number | null;
  costo: number | null;
  etiqueta: string;
}

/**
 * Tramos ordenados de menor a mayor distancia. `hastaKm` es el límite
 * superior INCLUSIVO del tramo (ej. una dirección a exactamente 3 km paga
 * $3.000, no $5.000). El último tramo (`hastaKm: null`) representa "más de
 * 24 km": no hay despacho automático, se cotiza caso a caso.
 */
export const TRAMOS_DELIVERY: TramoDelivery[] = [
  { hastaKm: 0.3, costo: 0, etiqueta: 'Hasta 0,3 km — gratis' },
  { hastaKm: 3, costo: 3000, etiqueta: 'Hasta 3 km — $3.000' },
  { hastaKm: 6, costo: 5000, etiqueta: 'Hasta 6 km — $5.000' },
  { hastaKm: 9, costo: 8000, etiqueta: 'Hasta 9 km — $8.000' },
  { hastaKm: 12, costo: 11000, etiqueta: 'Hasta 12 km — $11.000' },
  { hastaKm: 15, costo: 14000, etiqueta: 'Hasta 15 km — $14.000' },
  { hastaKm: 18, costo: 17000, etiqueta: 'Hasta 18 km — $17.000' },
  { hastaKm: 21, costo: 20000, etiqueta: 'Hasta 21 km — $20.000' },
  { hastaKm: 24, costo: 23000, etiqueta: 'Hasta 24 km — $23.000' },
  { hastaKm: null, costo: null, etiqueta: 'Más de 24 km — se cotiza caso a caso' },
];

/**
 * Devuelve el costo de delivery para una distancia en km, o `null` si la
 * distancia excede el radio de despacho automático (requiere cotización
 * manual).
 */
export function calcularCostoPorKm(km: number): number | null {
  const tramo = TRAMOS_DELIVERY.find(t => t.hastaKm === null || km <= t.hastaKm);
  return tramo ? tramo.costo : null;
}
