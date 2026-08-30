// ─────────────────────────────────────────────────────────────────────────────
// RETIRADO (30-08-2026). Pertenece al modelo COMUNA-PRIMERO / tramos driving,
// que se abandonó. El modelo vigente (radio en línea recta) no se calibra por
// ruta. Se conserva solo como registro del método. Para re-auditar el modelo
// actual usar scripts/generar-tabla-validacion.mjs + public/validacion-delivery.html.
// ─────────────────────────────────────────────────────────────────────────────
// Calibración del modelo de delivery COMUNA-PRIMERO (29-08-2026)
//
// Ejecuta las llamadas a Google Maps que NO deben correr en runtime:
//   Paso 0 — Geocoding de UNA dirección de referencia por comuna (sector
//            poblado real, NO el centroide geométrico: ver por qué en el
//            comentario de DIRECCIONES_REFERENCIA_COMUNAS en lib/deliveryPricing.ts)
//   Paso 1 — Distance Matrix (driving) desde ORIGEN_GALDI → cada dirección
//   Paso 3 — Techo global = km(Lo Barnechea) × 1.25, redondeado al km superior
//   Paso 4 — Límites de tramo por km, derivados de los km reales
//   Paso 6 — Geocoding + Distance Matrix + address_components de las 10
//            direcciones de verificación
//
// Uso (necesita la API key real, la misma que usa la Cloud Function):
//   GOOGLE_MAPS_API_KEY_GALDI="$(firebase functions:secrets:access GOOGLE_MAPS_API_KEY_GALDI)" \
//     node --experimental-strip-types --no-warnings scripts/calibrar-delivery.mjs
//
// El script NO escribe nada: imprime tablas y un bloque de constantes listo
// para pegar en DIRECCIONES_REFERENCIA_COMUNAS (campo kmReal) y para calibrar
// TRAMOS_DELIVERY / TECHO_GLOBAL_KM.
// ─────────────────────────────────────────────────────────────────────────────

import { ORIGEN_GALDI } from '../lib/deliveryPricing.ts';
import { DIRECCIONES_REFERENCIA_COMUNAS } from './calibracion-data.mjs';

// Direcciones de referencia por comuna (en DIRECCIONES_REFERENCIA_COMUNAS del
// lib). Criterio: dirección CON NÚMERO sobre la arteria principal o el casco
// urbano consolidado, en zona donde habría clientes de una pastelería. Elegidas
// y aprobadas el 29-08-2026:
//   maipu            → Av. 5 de Abril 190       (Plaza de Maipú, 5 de Abril × Pajaritos)
//   cerrillos        → Av. Pedro Aguirre Cerda 6000  (cerca del cruce con Av. Cerrillos)
//   pudahuel         → Av. San Pablo 8300       (casco antiguo, Pudahuel Sur)
//   estacion central → Av. Las Rejas Norte 20   (nodo Alameda × Las Rejas; test del caso Apoquindo)
//   san miguel       → Gran Avenida J.M. Carrera 3600  (junto a Metro San Miguel)
//   padre hurtado    → Camino San Alberto Hurtado 2900 (casco urbano)
//       ⚠ Padre Hurtado no tiene grilla urbana densa. Si esta dirección devuelve
//         PARTIAL_MATCH o cae fuera del casco, reemplazar en el lib por
//         'Plaza de Padre Hurtado, Padre Hurtado' y volver a correr.
// Las 5 restantes (lo prado, santiago, providencia, las condes, lo barnechea)
// conservan la dirección real ya medida en la corrida v1.

const API_KEY = process.env.GOOGLE_MAPS_API_KEY_GALDI?.trim();
if (!API_KEY) {
  console.error('Falta GOOGLE_MAPS_API_KEY_GALDI en el entorno.');
  process.exit(1);
}

// Se geocodifica una DIRECCIÓN real por comuna (no el nombre de la comuna a
// secas). El sufijo ", Región Metropolitana, Chile" ayuda a desambiguar.
const SUFIJO = ', Región Metropolitana, Chile';

const DIRECCIONES_VERIFICACION = [
  'Av. Américo Vespucio 399, Maipú',
  'Av. 5 de Abril 81, Maipú',
  'Río Snake, Lo Prado',
  'República 40, Santiago',
  'Paseo Ahumada, Santiago',
  'Av. Providencia 2124, Providencia',
  'Av. Apoquindo 4501, Las Condes',
  'Av. La Dehesa 1445, Lo Barnechea',
  'Camino Farellones, Lo Barnechea',            // sector alto, para probar el recargo
  'Av. Irarrázaval 3400, Ñuñoa',                // comuna NO listada
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=cl&language=es&components=country:CL&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK' || !data.results?.[0]) {
    throw new Error(`Geocoding "${address}" → ${data.status} ${data.error_message ?? ''}`);
  }
  const r = data.results[0];
  const comp = (type) =>
    r.address_components?.find((c) => c.types?.includes(type))?.long_name ?? null;
  return {
    loc: r.geometry.location,
    partial: !!r.partial_match,
    locality: comp('locality'),
    admin3: comp('administrative_area_level_3'), // la comuna real (ver Paso C)
    formatted: r.formatted_address,
  };
}

async function drivingKm(dest) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ORIGEN_GALDI.lat},${ORIGEN_GALDI.lng}&destinations=${dest.lat},${dest.lng}&mode=driving&language=es&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const el = data.rows?.[0]?.elements?.[0];
  if (data.status !== 'OK' || !el || el.status !== 'OK' || !el.distance) {
    throw new Error(`Distance Matrix → ${data.status} / ${el?.status}`);
  }
  return el.distance.value / 1000;
}

async function main() {
  // ── Paso 0 + 1 — direcciones de referencia por comuna ────────────────────
  const filas = [];
  for (const [clave, { direccion }] of Object.entries(DIRECCIONES_REFERENCIA_COMUNAS)) {
    const query = /,\s*(Región|Chile)/i.test(direccion) ? direccion : direccion + SUFIJO;
    const g = await geocode(query);
    await sleep(120);
    const km = await drivingKm(g.loc);
    await sleep(120);
    filas.push({ clave, direccion, km, locality: g.locality, admin3: g.admin3, partial: g.partial });
  }
  filas.sort((a, b) => a.km - b.km);

  console.log('\n═══ PASO 0+1 — DIRECCIONES DE REFERENCIA · KM REAL (driving) ═══\n');
  console.log('comuna'.padEnd(18), 'km'.padEnd(8), 'admin3'.padEnd(18), 'locality'.padEnd(14), 'dirección');
  for (const f of filas) {
    const flag = f.admin3 && f.clave !== normal(f.admin3) ? '  ⚠ admin3≠clave' : '';
    console.log(
      f.clave.padEnd(18),
      f.km.toFixed(2).padEnd(8),
      String(f.admin3).padEnd(18),
      String(f.locality).padEnd(14),
      f.direccion + (f.partial ? '  [PARTIAL_MATCH]' : '') + flag,
    );
  }

  console.log('\n─── Pegar en DIRECCIONES_REFERENCIA_COMUNAS (campo kmReal) ───\n');
  for (const clave of Object.keys(DIRECCIONES_REFERENCIA_COMUNAS)) {
    const row = filas.find((x) => x.clave === clave);
    console.log(`  '${clave}': kmReal: ${row.km.toFixed(2)},`);
  }

  // ── Paso 3 — Techo global ────────────────────────────────────────────────
  const kmLoBarnechea = filas.find((f) => f.clave === 'lo barnechea').km;
  const techo = Math.ceil(kmLoBarnechea * 1.25);
  console.log('\n═══ PASO 3 — TECHO GLOBAL ═══\n');
  console.log(`km(Lo Barnechea) = ${kmLoBarnechea.toFixed(2)}  ×1.25 = ${(kmLoBarnechea * 1.25).toFixed(2)}  → TECHO_GLOBAL_KM = ${techo}`);

  // ── Paso 4 — Límites de tramos calibrados ────────────────────────────────
  const kmDe = (c) => filas.find((f) => f.clave === c).km;
  console.log('\n═══ PASO 4 — LÍMITES DE TRAMOS (hastaKm; redondear como definas) ═══\n');
  console.log(`  5.00                     → $3.000`);
  console.log(`  ${kmDe('lo prado').toFixed(2)}  (Lo Prado)           → $5.000`);
  console.log(`  ${Math.max(kmDe('san miguel'), kmDe('santiago')).toFixed(2)}  (max San Miguel/Santiago) → $6.000`);
  console.log(`  ${kmDe('providencia').toFixed(2)}  (Providencia)        → $7.000`);
  console.log(`  ${kmDe('las condes').toFixed(2)}  (Las Condes)         → $10.000`);
  console.log(`  ${techo}  (techo global)       → $12.000`);
  console.log(`  sobre ${techo}                   → $12.000 + recargo`);
  console.log('\n  ⚠ Los hastaKm deben quedar en orden estrictamente creciente.');
  console.log('    Si km(Lo Prado) <= 5, el tramo de $5.000 se colapsa: avisar a las socias.');

  // ── Paso 6 — Direcciones de verificación ─────────────────────────────────
  console.log('\n═══ PASO 6 — DIRECCIONES DE VERIFICACIÓN ═══\n');
  console.log('dirección'.padEnd(38), 'km'.padEnd(8), 'admin3'.padEnd(18), 'locality'.padEnd(14), 'partial');
  for (const dir of DIRECCIONES_VERIFICACION) {
    try {
      const g = await geocode(dir);
      await sleep(120);
      const km = await drivingKm(g.loc);
      await sleep(120);
      console.log(
        dir.padEnd(38),
        km.toFixed(2).padEnd(8),
        String(g.admin3).padEnd(18),
        String(g.locality).padEnd(14),
        g.partial ? 'PARTIAL' : '',
      );
    } catch (e) {
      console.log(dir.padEnd(38), 'ERROR', e.message);
    }
  }
  console.log('\nListo. Pega los kmReal y pásame las tablas para calibrar tramos y techo.');
}

// Igual que normalizarComuna() en lib/, para el flag "admin3≠clave".
function normal(raw) {
  return String(raw ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // diacriticos combinantes
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
