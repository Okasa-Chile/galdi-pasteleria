// Falla ruidosamente si lib/deliveryPricing.ts y functions/src/deliveryPricing.ts
// divergen. Deben existir duplicados (Firebase solo empaqueta functions/ al
// desplegar), pero eso no puede significar que se desincronicen en silencio.
//
// Se ejecuta con: node --experimental-strip-types --no-warnings <este archivo>
// Enganchado en: "prebuild" (package.json) y "predeploy" de functions/hosting
// (firebase.json). Ver también scripts/README-delivery-pricing-sync.md si se
// necesita correrlo manualmente.

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

compararValor('ORIGEN_GALDI', web.ORIGEN_GALDI, fn.ORIGEN_GALDI);
compararValor('PEDIDO_MINIMO_DELIVERY', web.PEDIDO_MINIMO_DELIVERY, fn.PEDIDO_MINIMO_DELIVERY);
compararValor('TRAMOS_DELIVERY', web.TRAMOS_DELIVERY, fn.TRAMOS_DELIVERY);

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
