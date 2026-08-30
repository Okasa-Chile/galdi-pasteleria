/**
 * Fuente única de verdad de la política de delivery.
 *
 * MODELO: RADIO EN LÍNEA RECTA (Haversine).
 *
 * El precio de despacho depende ÚNICAMENTE de la distancia en línea recta entre
 * ORIGEN_GALDI y la coordenada del cliente (que la Cloud Function ya obtiene por
 * Geocoding). Bandas concéntricas de precio plano; más allá del techo no hay
 * despacho automático y se cotiza aparte.
 *
 * POR QUÉ RECTA Y NO RUTA (driving):
 * El local está embolsado en Rinconada de Maipú (Autopista del Sol + Américo
 * Vespucio lo rodean). El factor de rodeo driving/recta medido va de ~1,3×
 * (rumbo NE, por autopista) a ~2,9× (comunas pegadas: Lo Prado, Pudahuel),
 * sin patrón usable. Calibrar por ruta daba precios incoherentes entre vecinas
 * — Cerrillos salía más lejos que Lo Prado, Padre Hurtado a ~49 km siendo
 * limítrofe con Maipú — y además gastaba una llamada extra a Distance Matrix por
 * request. La recta es estable, auditable, dibujable como lista de radios y no
 * consume cuota de ruteo.
 *
 * Las bandas se calibraron visualmente sobre mapa (Leaflet/OSM, círculos
 * concéntricos) el 30-08-2026. Ver README.md § "delivery por radio en recta".
 *
 * Reemplaza al modelo comuna-primero + tramos driving (08-2026) y al de radio
 * driving previo. El precio por comuna (PRECIOS_COMUNA) y las direcciones de
 * referencia se movieron a scripts/calibracion-data.mjs — ya no son parte del
 * modelo.
 *
 * REGLA: ORIGEN_GALDI, PEDIDO_MINIMO_DELIVERY y BANDAS_DELIVERY van
 * EXCLUSIVAMENTE aquí. Nunca hardcodear estos datos en páginas, componentes ni
 * en la Cloud Function — todos deben importar de acá. Cualquier cambio se
 * replica en functions/src/deliveryPricing.ts en el mismo commit
 * (scripts/check-delivery-pricing-sync.mjs lo verifica y aborta el build/deploy
 * si divergen).
 */

export const ORIGEN_GALDI = {
  lat: -33.4776144,
  lng: -70.7521309,
} as const;

export const PEDIDO_MINIMO_DELIVERY = 15000;

export interface BandaDelivery {
  /**
   * Radio superior INCLUSIVO de la banda, en km de línea recta. `null` en la
   * última banda: representa "sin techo" (fuera de radio, se cotiza aparte).
   */
  hastaKm: number | null;
  /** Precio plano de despacho de la banda. `null` en la banda "fuera de radio". */
  precio: number | null;
  etiqueta: string;
}

/**
 * Bandas ordenadas de menor a mayor radio. `hastaKm` es el límite superior
 * inclusivo (una dirección a exactamente 3,8 km paga $3.000, no $5.000). La
 * última banda (`hastaKm: null`, `precio: null`) es "fuera de radio": no hay
 * despacho automático, se coordina y cotiza por WhatsApp.
 *
 * Cortes calibrados sobre mapa el 30-08-2026 (bandas-delivery.json exportado
 * desde la herramienta de validación). NO recalcular en runtime.
 */
export const BANDAS_DELIVERY: BandaDelivery[] = [
  { hastaKm: 0.5,  precio: 0,     etiqueta: 'Gratis — hasta 0,5 km' },
  { hastaKm: 3.8,  precio: 3000,  etiqueta: 'Hasta 3,8 km — $3.000' },
  { hastaKm: 8.5,  precio: 5000,  etiqueta: 'Hasta 8,5 km — $5.000' },
  { hastaKm: 11.5, precio: 6000,  etiqueta: 'Hasta 11,5 km — $6.000' },
  { hastaKm: 15,   precio: 8000,  etiqueta: 'Hasta 15 km — $8.000' },
  { hastaKm: 19,   precio: 10000, etiqueta: 'Hasta 19 km — $10.000' },
  { hastaKm: 25,   precio: 12000, etiqueta: 'Hasta 25 km — $12.000' },
  { hastaKm: 31.1, precio: 14000, etiqueta: 'Hasta 31,1 km — $14.000' },
  { hastaKm: null, precio: null,  etiqueta: 'Más de 31,1 km — se cotiza aparte' },
];

/** Radio máximo (km, recta) con despacho automático. Más allá se cotiza aparte. */
export const TECHO_DELIVERY_KM = 31.1;

/**
 * Distancia Haversine (línea recta sobre la esfera) en km entre dos puntos
 * {lat, lng} en grados decimales.
 */
export function distanciaRectaKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Un elemento de `address_components` de la Geocoding API de Google. */
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Extrae la comuna desde los `address_components` de un resultado de Geocoding.
 *
 * ⚠️ NO decide precio. En el modelo por radio el precio sale solo de la
 * distancia. Esta función queda para LOGGING y para mostrar la comuna en el
 * pedido/recibo. Ninguna función de precio la llama.
 *
 * La comuna en Chile llega de forma inconsistente:
 *   - administrative_area_level_3 = la comuna real.
 *   - locality                    = a veces la comuna, a veces "Santiago" para
 *                                   toda el área metropolitana.
 * Caso real (30-08-2026): "Av. Apoquindo 4501" devolvió locality:"Santiago" y
 * administrative_area_level_3:"Las Condes". Por eso admin3 tiene prioridad;
 * locality queda como fallback (hay resultados sin admin3). Si ninguno resuelve
 * → null.
 */
export function extraerComuna(
  componentes: AddressComponent[] | null | undefined,
): string | null {
  if (!componentes) return null;
  const porTipo = (tipo: string) =>
    componentes.find((c) => c.types?.includes(tipo))?.long_name ?? null;
  return porTipo('administrative_area_level_3') ?? porTipo('locality');
}

/**
 * Normaliza un nombre de comuna: minúsculas, sin tildes ni diacríticos, sin
 * espacios de más, trim. Utilidad de presentación (ej. comparar/mostrar la
 * comuna). NO participa en el cálculo de precio.
 */
export function normalizarComuna(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita tildes y diacriticos combinantes
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export interface ResultadoDespacho {
  /** Distancia en línea recta desde el local, en km. */
  km: number;
  /** Precio de despacho, o `null` si la dirección está fuera del radio automático. */
  costo: number | null;
  /** `true` cuando `km` excede el techo: no hay despacho automático, se cotiza aparte. */
  fueraDeRadio: boolean;
  /** Etiqueta de la banda aplicada (para logging / recibo). */
  banda: string;
}

/**
 * Precio de despacho para la coordenada de un cliente.
 *
 * Recibe lat/lng ya georreferenciados (la Cloud Function los obtiene por
 * Geocoding), calcula la distancia recta a ORIGEN_GALDI y devuelve la banda que
 * corresponde. Más allá del techo → `{ costo: null, fueraDeRadio: true }`
 * (mismo contrato de "cotizar aparte" que el modelo anterior).
 */
export function calcularCostoDespacho(
  destino: { lat: number; lng: number },
): ResultadoDespacho {
  const km = distanciaRectaKm(ORIGEN_GALDI, destino);
  const banda =
    BANDAS_DELIVERY.find((b) => b.hastaKm === null || km <= b.hastaKm) ??
    BANDAS_DELIVERY[BANDAS_DELIVERY.length - 1];
  return {
    km,
    costo: banda.precio,
    fueraDeRadio: banda.precio === null,
    banda: banda.etiqueta,
  };
}
