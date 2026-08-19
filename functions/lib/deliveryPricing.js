"use strict";
/**
 * Copia de ../../lib/deliveryPricing.ts para uso dentro de la Cloud Function.
 *
 * Por qué está duplicado: Firebase despliega SOLO el contenido de `functions/`
 * (ver "source": "functions" en firebase.json). Un import relativo hacia
 * `lib/` fuera de ese directorio no se empaqueta en el deploy y falla en
 * producción aunque funcione en el emulador local. Sin un monorepo con
 * paquetes compartidos, la copia es la opción confiable.
 *
 * REGLA: cualquier cambio en `lib/deliveryPricing.ts` (origen, pedido mínimo,
 * tramos) debe replicarse aquí en el mismo commit.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRAMOS_DELIVERY = exports.PEDIDO_MINIMO_DELIVERY = exports.ORIGEN_GALDI = void 0;
exports.calcularCostoPorKm = calcularCostoPorKm;
exports.ORIGEN_GALDI = {
    lat: -33.4776144,
    lng: -70.7521309,
};
exports.PEDIDO_MINIMO_DELIVERY = 15000;
exports.TRAMOS_DELIVERY = [
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
function calcularCostoPorKm(km) {
    const tramo = exports.TRAMOS_DELIVERY.find(t => t.hastaKm === null || km <= t.hastaKm);
    return tramo ? tramo.costo : null;
}
//# sourceMappingURL=deliveryPricing.js.map