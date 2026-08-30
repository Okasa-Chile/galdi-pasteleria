// Falla ruidosamente si lib/deliveryPricing.ts y functions/src/deliveryPricing.ts
// divergen. Deben existir duplicados (Firebase solo empaqueta functions/ al
// desplegar), pero eso no puede significar que se desincronicen en silencio.
//
// Se ejecuta con: node --experimental-strip-types --no-warnings <este archivo>
// Enganchado en: "prebuild" (package.json) y "predeploy" de functions/hosting
// (firebase.json). Ver también scripts/README-delivery-pricing-sync.md si se
// necesita correrlo manualmente.
//
// Actualizado 30-08-2026 para el modelo RADIO EN LÍNEA RECTA: compara las
// constantes de datos (ORIGEN_GALDI, pedido mínimo, BANDAS_DELIVERY, techo) y el
// TEXTO de las funciones de cálculo (Haversine + selección de banda), porque la
// lógica está duplicada y desincronizarla daría precios distintos entre
// checkout, /gestion y la landing.

import * as web from '../lib/deliveryPricing.ts';
import * as fn from '../functions/src/deliveryPricing.ts';

const diffs = [];

function compararValor(campo, valorWeb, valorFn) {
  const a = JSON.stringify(valorWeb);
  const b = JSON.stringify(valorFn);
  if (a !== b) {
    diffs.push({ campo, web: a, functions: b });
  }
}

// Normaliza espacios para que diferencias de formato no cuenten como divergencia.
function cuerpoFn(f) {
  return typeof f === 'function' ? f.toString().replace(/\s+/g, ' ').trim() : String(f);
}
function compararFuncion(campo, fWeb, fFn) {
  const a = cuerpoFn(fWeb);
  const b = cuerpoFn(fFn);
  if (a !== b) {
    diffs.push({ campo: `${campo}()`, web: a, functions: b });
  }
}

// ── Constantes de datos ────────────────────────────────────────────────────
compararValor('ORIGEN_GALDI', web.ORIGEN_GALDI, fn.ORIGEN_GALDI);
compararValor('PEDIDO_MINIMO_DELIVERY', web.PEDIDO_MINIMO_DELIVERY, fn.PEDIDO_MINIMO_DELIVERY);
compararValor('BANDAS_DELIVERY', web.BANDAS_DELIVERY, fn.BANDAS_DELIVERY);
compararValor('TECHO_DELIVERY_KM', web.TECHO_DELIVERY_KM, fn.TECHO_DELIVERY_KM);

// ── Lógica de cálculo ──────────────────────────────────────────────────────
compararFuncion('distanciaRectaKm', web.distanciaRectaKm, fn.distanciaRectaKm);
compararFuncion('calcularCostoDespacho', web.calcularCostoDespacho, fn.calcularCostoDespacho);
compararFuncion('extraerComuna', web.extraerComuna, fn.extraerComuna);
compararFuncion('normalizarComuna', web.normalizarComuna, fn.normalizarComuna);

if (diffs.length > 0) {
  console.error('\n✗ lib/deliveryPricing.ts y functions/src/deliveryPricing.ts están DESINCRONIZADOS.\n');
  console.error('El checkout, /gestion y la landing calcularían costos de despacho distintos entre sí.\n');
  for (const d of diffs) {
    console.error(`  Campo: ${d.campo}`);
    console.error(`    lib/deliveryPricing.ts:            ${d.web}`);
    console.error(`    functions/src/deliveryPricing.ts:  ${d.functions}`);
    console.error('');
  }
  console.error('Corrige ambos archivos para que queden idénticos y vuelve a intentar.\n');
  process.exit(1);
}

console.log('✓ lib/deliveryPricing.ts y functions/src/deliveryPricing.ts están sincronizados.');
