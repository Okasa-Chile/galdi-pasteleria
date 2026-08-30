// ─────────────────────────────────────────────────────────────────────────────
// Genera public/validacion-delivery.json — la "foto" para validar en mapa las
// BANDAS DE PRECIO POR RADIO (distancia en RECTA / Haversine desde el local).
//
// Modelo en validación (NO está en lib/ todavía):
//   banda 0  ≤ 0,5 km  → gratis
//   banda 1  ≤ 6   km  → $3.000
//   banda 2  ≤ 8,5 km  → $5.000   (colchón sin ancla — ver resumen.banda2)
//   banda 3  ≤ 11,5 km → $6.000
//   banda 4  ≤ 15  km  → $7.000
//   banda 5  ≤ 19  km  → $10.000
//   banda 6  ≤ 32  km  → $12.000  (techo = recta(Lo Barnechea) 25,54 × 1,25)
//   > 32 km            → fuera de radio (cotizar)
//
// PRINCIPIO: no reimplementa el cálculo de comuna. Usa extraerComuna() real de
// lib/deliveryPricing.ts y compara el precio de banda contra PRECIOS_COMUNA
// (decisión de las socias) — los conflictos se marcan, no se silencian.
//
// Uso:
//   GOOGLE_MAPS_API_KEY_GALDI="$(firebase functions:secrets:access GOOGLE_MAPS_API_KEY_GALDI)" \
//     node --experimental-strip-types --no-warnings scripts/generar-tabla-validacion.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync } from 'node:fs';
import { ORIGEN_GALDI, extraerComuna, normalizarComuna } from '../lib/deliveryPricing.ts';
import { PRECIOS_COMUNA, DIRECCIONES_REFERENCIA_COMUNAS } from './calibracion-data.mjs';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY_GALDI?.trim();
if (!API_KEY) {
  console.error('Falta GOOGLE_MAPS_API_KEY_GALDI en el entorno.');
  process.exit(1);
}

// ─── Bandas por radio en RECTA (km) — RADIOS POR DEFECTO ─────────────────────
// El HTML de validación los deja ajustar en vivo (sliders); estos son solo el
// punto de partida y el "Restablecer".
const BANDAS = [
  { indice: 0, hastaKm: 0.5,      precio: 0,     etiqueta: 'Gratis',         color: '#9e9e9e' },
  { indice: 1, hastaKm: 3.8,      precio: 3000,  etiqueta: '$3.000',         color: '#2e7d32' }, // cierra en Plaza de Maipú
  { indice: 2, hastaKm: 8.5,      precio: 5000,  etiqueta: '$5.000',         color: '#66bb6a' },
  { indice: 3, hastaKm: 11.5,     precio: 6000,  etiqueta: '$6.000',         color: '#cddc39' },
  { indice: 4, hastaKm: 15,       precio: 8000,  etiqueta: '$8.000',         color: '#fdd835' },
  { indice: 5, hastaKm: 19,       precio: 10000, etiqueta: '$10.000',        color: '#fb8c00' },
  { indice: 6, hastaKm: 25.5,     precio: 12000, etiqueta: '$12.000',        color: '#e53935' }, // se achicó (mitad de 19–32) para dejar sitio a la de $14.000
  { indice: 7, hastaKm: 32,       precio: 14000, etiqueta: '$14.000',        color: '#6a1b9a' }, // nueva — hasta el techo
  { indice: 8, hastaKm: Infinity, precio: null,  etiqueta: 'Fuera de radio', color: '#455a64' },
];
const TECHO_KM = 32;
const BORDES = BANDAS.filter((b) => Number.isFinite(b.hastaKm)).map((b) => b.hastaKm);
const CERCA_BORDE_KM = 1.5;

function bandaDe(recta) {
  return BANDAS.find((b) => recta <= b.hastaKm);
}
function distanciaABorde(recta) {
  return Math.min(...BORDES.map((e) => Math.abs(recta - e)));
}

// Haversine — MISMA fórmula que usará lib/ para el modelo por radio.
function haversineKm(a, b) {
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(s));
}

// ─── Comunas urbanas de la RM ───────────────────────────────────────────────
const EXTRA = [
  { nombre: 'Cerro Navia',           direccion: 'Av. J. J. Pérez 6500, Cerro Navia' },
  { nombre: 'Conchalí',              direccion: 'Av. Independencia 5200, Conchalí' },
  { nombre: 'El Bosque',             direccion: 'Gran Avenida José Miguel Carrera 10600, El Bosque' },
  { nombre: 'Huechuraba',            direccion: 'Av. Recoleta 5900, Huechuraba' },
  { nombre: 'Independencia',         direccion: 'Av. Independencia 2100, Independencia' },
  { nombre: 'La Cisterna',           direccion: 'Gran Avenida José Miguel Carrera 8500, La Cisterna' },
  { nombre: 'La Florida',            direccion: 'Av. Vicuña Mackenna 8800, La Florida' },
  { nombre: 'La Granja',             direccion: 'Av. Santa Rosa 8100, La Granja' },
  { nombre: 'La Pintana',            direccion: 'Av. Santa Rosa 12700, La Pintana' },
  { nombre: 'La Reina',              direccion: 'Av. Larraín 9500, La Reina' },
  { nombre: 'Lo Espejo',             direccion: 'Av. Central 6900, Lo Espejo' },
  { nombre: 'Macul',                 direccion: 'Av. Macul 3800, Macul' },
  { nombre: 'Ñuñoa',                 direccion: 'Av. Irarrázaval 3400, Ñuñoa' },
  { nombre: 'Pedro Aguirre Cerda',   direccion: 'Av. Club Hípico 4700, Pedro Aguirre Cerda' },
  { nombre: 'Peñalolén',             direccion: 'Av. Grecia 8800, Peñalolén' },
  { nombre: 'Quilicura',             direccion: 'Av. Manuel Antonio Matta 1400, Quilicura' },
  { nombre: 'Quinta Normal',         direccion: 'Av. Carrascal 4600, Quinta Normal' },
  { nombre: 'Recoleta',              direccion: 'Av. Recoleta 2600, Recoleta' },
  { nombre: 'Renca',                 direccion: 'Av. Domingo Santa María 4200, Renca' },
  { nombre: 'San Joaquín',           direccion: 'Av. Santa Rosa 3600, San Joaquín' },
  { nombre: 'San Ramón',             direccion: 'Av. Ossa 1300, San Ramón' },
  { nombre: 'Vitacura',              direccion: 'Av. Vitacura 6600, Vitacura' },
  { nombre: 'Puente Alto',           direccion: 'Av. Concha y Toro 1500, Puente Alto' },
  { nombre: 'San Bernardo',          direccion: 'Av. Colón 700, San Bernardo' },
  { nombre: 'Peñaflor',              direccion: 'Av. Vicuña Mackenna 1500, Peñaflor' },
  { nombre: 'Calera de Tango',       direccion: 'Av. Calera de Tango 3900, Calera de Tango' },
  { nombre: 'Colina',                direccion: 'Calle Concepción 200, Colina' },
  { nombre: 'Lampa',                 direccion: 'Calle Baquedano 800, Lampa' },
  { nombre: 'Buin',                  direccion: 'Av. José Manuel Balmaceda 200, Buin' },
  { nombre: 'Talagante',             direccion: "Av. Bernardo O'Higgins 700, Talagante" },
];

const NOMBRE_BONITO = {
  'maipu': 'Maipú', 'cerrillos': 'Cerrillos', 'pudahuel': 'Pudahuel',
  'estacion central': 'Estación Central', 'lo prado': 'Lo Prado',
  'padre hurtado': 'Padre Hurtado', 'santiago': 'Santiago', 'san miguel': 'San Miguel',
  'providencia': 'Providencia', 'las condes': 'Las Condes', 'lo barnechea': 'Lo Barnechea',
};

const COMUNAS = [
  ...Object.entries(DIRECCIONES_REFERENCIA_COMUNAS).map(([clave, v]) => ({
    nombre: NOMBRE_BONITO[clave] ?? clave, direccion: v.direccion,
  })),
  ...EXTRA,
].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

const SUFIJO = ', Región Metropolitana, Chile';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(address) {
  const q = /,\s*(Región|Chile)/i.test(address) ? address : address + SUFIJO;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}&region=cl&language=es&components=country:CL&key=${API_KEY}`;
  const data = await (await fetch(url)).json();
  if (data.status !== 'OK' || !data.results?.[0]) {
    throw new Error(`Geocoding "${address}" → ${data.status} ${data.error_message ?? ''}`);
  }
  const r = data.results[0];
  return {
    loc: r.geometry.location,
    tipo: r.geometry.location_type,
    componentes: r.address_components ?? [],
    partial: !!r.partial_match,
  };
}

async function main() {
  const comunas = [];
  for (const { nombre, direccion } of COMUNAS) {
    try {
      const g = await geocode(direccion);
      await sleep(110);

      const recta = haversineKm(ORIGEN_GALDI, g.loc);
      const banda = bandaDe(recta);
      const comunaDetectada = extraerComuna(g.componentes);
      const claveEsperada = normalizarComuna(nombre);
      const precioSocias = claveEsperada in PRECIOS_COMUNA ? PRECIOS_COMUNA[claveEsperada] : null;
      const conflictoBanda = precioSocias !== null && precioSocias !== banda.precio;
      const dBorde = distanciaABorde(recta);

      // Datos CRUDOS por comuna. La clasificación en banda / precio / conflicto /
      // cercanía a borde la calcula el HTML EN VIVO desde `recta` + los radios
      // que el usuario deje con los sliders (por eso no se hornean aquí).
      comunas.push({
        nombre,
        direccion,
        lat: Number(g.loc.lat.toFixed(6)),
        lng: Number(g.loc.lng.toFixed(6)),
        recta: Number(recta.toFixed(2)),
        geocodeTipo: g.tipo,
        partialMatch: g.partial,
        comunaDetectada: comunaDetectada ?? null,
        comunaDetectadaDistinta:
          !!comunaDetectada && normalizarComuna(comunaDetectada) !== claveEsperada,
        esComunaSocias: precioSocias !== null,
        precioSocias,
      });

      const flags = [
        conflictoBanda ? `CONFLICTO socias=$${precioSocias}` : '',
        dBorde < CERCA_BORDE_KM ? `borde±${dBorde.toFixed(2)}` : '',
        comunaDetectada && normalizarComuna(comunaDetectada) !== claveEsperada ? `detect=${comunaDetectada}` : '',
        g.partial ? 'PARTIAL' : '',
      ].filter(Boolean).join('  ');
      console.log(
        `${precioSocias !== null ? '· socias ' : '        '}${nombre.padEnd(20)} ` +
        `recta ${recta.toFixed(2).padStart(6)}  b${banda.indice} ${banda.etiqueta.padEnd(8)} ${flags}`,
      );
    } catch (e) {
      console.error(`✗ ${nombre}: ${e.message}`);
      comunas.push({
        nombre, direccion, lat: null, lng: null, recta: null, error: e.message,
        geocodeTipo: null, partialMatch: false, comunaDetectada: null,
        comunaDetectadaDistinta: false, esComunaSocias: false, precioSocias: null,
      });
    }
  }

  // Snapshot informativo con los radios POR DEFECTO (el HTML recalcula todo en vivo).
  const clasif = (r) => BANDAS.find((b) => r <= b.hastaKm);
  const porBandaDefault = {};
  const conflictosDefault = [];
  for (const c of comunas) {
    if (c.recta == null) continue;
    const b = clasif(c.recta);
    porBandaDefault[b.indice] = (porBandaDefault[b.indice] ?? 0) + 1;
    if (c.esComunaSocias && c.precioSocias !== b.precio) {
      conflictosDefault.push({ nombre: c.nombre, precioBanda: b.precio, precioSocias: c.precioSocias });
    }
  }

  const salida = {
    generadoEl: new Date().toISOString(),
    modelo: 'radio-recta',
    origen: ORIGEN_GALDI,
    // Radios POR DEFECTO. El HTML los deja ajustar en vivo y "Restablecer" vuelve a estos.
    bandas: BANDAS.map((b) => ({
      indice: b.indice,
      hastaKm: Number.isFinite(b.hastaKm) ? b.hastaKm : null,
      precio: b.precio,
      etiqueta: b.etiqueta,
      color: b.color,
    })),
    cercaDeBordeKm: CERCA_BORDE_KM,
    nota:
      'Distancia en RECTA (Haversine) desde el local. Los radios de `bandas` son el ' +
      'punto de partida; el HTML de validación los ajusta en vivo y exporta los finales.',
    resumenConDefault: { porBanda: porBandaDefault, conflictos: conflictosDefault },
    comunas,
  };

  writeFileSync('public/validacion-delivery.json', JSON.stringify(salida, null, 2) + '\n', 'utf8');

  console.log('\n─────────────────────────────────────────────');
  console.log('Con radios por defecto:');
  console.log('  por banda:', JSON.stringify(porBandaDefault));
  console.log('  conflictos socias≠banda:');
  for (const c of conflictosDefault) console.log(`    ${c.nombre}: banda $${c.precioBanda} vs socias $${c.precioSocias}`);
  console.log(`\n✓ public/validacion-delivery.json — ${comunas.length} comunas ` +
    `(${comunas.filter((c) => c.partialMatch).length} PARTIAL).`);
  console.log('  Ajusta los radios en vivo en http://localhost:3000/validacion-delivery.html');
}

main().catch((e) => { console.error(e); process.exit(1); });
