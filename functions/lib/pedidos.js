"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDEN_VALIDA = void 0;
exports.extraerDatosPedido = extraerDatosPedido;
exports.guardarPedidoPendiente = guardarPedidoPendiente;
exports.registrarPagoConfirmado = registrarPagoConfirmado;
exports.detalleParaCorreo = detalleParaCorreo;
exports.conTimeout = conTimeout;
// Persistencia de pedidos Flow en la colección galdi_pedidos.
// Documento con id = commerceOrder (mismo valor que se envía a Flow), para
// poder buscarlo después y actualizarlo cuando Flow confirma el pago.
const COLECCION = 'galdi_pedidos';
const MAX_ITEMS = 100;
// El id del documento sale de un valor enviado por el cliente: se restringe el
// formato (un "/" crearía una ruta anidada) y se acota el largo.
exports.ORDEN_VALIDA = /^[A-Za-z0-9_-]{1,64}$/;
const texto = (v, max) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const numero = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
};
// Toma solo los campos conocidos del body y los acota (endpoint público).
function extraerDatosPedido(body) {
    const modoEntrega = body.modoEntrega === 'retiro' || body.modoEntrega === 'domicilio' ? body.modoEntrega : null;
    const items = (Array.isArray(body.items) ? body.items : [])
        .slice(0, MAX_ITEMS)
        .filter((it) => !!it && typeof it === 'object')
        .map(it => ({
        nombre: texto(it.nombre, 200),
        nombreVisible: texto(it.nombreVisible, 200),
        talla: texto(it.talla, 10) || null,
        precio: numero(it.precio),
        cantidad: numero(it.cantidad),
        unidad: texto(it.unidad, 20),
    }));
    return {
        nombre: texto(body.nombre, 200),
        telefono: texto(body.telefono, 30),
        direccion: modoEntrega === 'domicilio' ? (texto(body.direccion, 300) || null) : null,
        modoEntrega,
        fechaEntrega: texto(body.fechaEntrega, 32),
        items,
    };
}
// Escribe el pedido con estado 'pendiente_pago'. Usa create(): si ya existe un
// documento con ese id (p. ej. un pedido ya pagado) falla en vez de pisarlo.
async function guardarPedidoPendiente(db, serverTs, p) {
    const orden = typeof p.orden === 'string' ? p.orden : '';
    if (!exports.ORDEN_VALIDA.test(orden)) {
        throw new Error('orden con formato inválido, pedido no persistido');
    }
    await db.collection(COLECCION).doc(orden).create(Object.assign(Object.assign({ commerceOrder: orden }, extraerDatosPedido(p.body)), { monto: numero(p.monto), email: texto(p.email, 200), estado: 'pendiente_pago', fecha: serverTs }));
}
// Marca el pedido como pagado con los datos reales de Flow. Si el documento
// existe lo actualiza (conserva nombre/teléfono/dirección/items del paso
// anterior). Si no existe (pedido anterior a este cambio, o falló la escritura
// inicial) crea uno con los campos mínimos de siempre.
// Devuelve los datos previos del pedido (undefined si no existía).
async function registrarPagoConfirmado(db, serverTs, pago) {
    var _a, _b, _c;
    const orden = (_a = pago.commerceOrder) !== null && _a !== void 0 ? _a : '';
    const monto = (_b = pago.amount) !== null && _b !== void 0 ? _b : 0;
    const email = (_c = pago.email) !== null && _c !== void 0 ? _c : 'no registrado';
    if (exports.ORDEN_VALIDA.test(orden)) {
        const ref = db.collection(COLECCION).doc(orden);
        const snap = await ref.get();
        if (snap.exists) {
            await ref.update({ estado: 'pagado', monto, email, fechaPago: serverTs });
            return snap.data();
        }
        await ref.set({ commerceOrder: orden, monto, email, estado: 'pagado', fecha: serverTs });
        return undefined;
    }
    await db.collection(COLECCION).add({
        commerceOrder: orden || 'no registrado',
        monto,
        email,
        estado: 'pagado',
        fecha: serverTs,
    });
    return undefined;
}
// Líneas extra para el correo de notificación (vacío si no hay datos previos).
function detalleParaCorreo(pedido) {
    if (!pedido)
        return '';
    const lineas = [];
    if (pedido.nombre)
        lineas.push(`Cliente: ${pedido.nombre}`);
    if (pedido.telefono)
        lineas.push(`Teléfono: ${pedido.telefono}`);
    if (pedido.modoEntrega === 'domicilio') {
        lineas.push(`Entrega: despacho a domicilio${pedido.direccion ? ` — ${pedido.direccion}` : ''}`);
    }
    else if (pedido.modoEntrega === 'retiro') {
        lineas.push('Entrega: retiro en local');
    }
    if (pedido.fechaEntrega)
        lineas.push(`Fecha de entrega: ${pedido.fechaEntrega}`);
    const items = Array.isArray(pedido.items) ? pedido.items : [];
    if (items.length) {
        lineas.push('Detalle:');
        for (const it of items) {
            lineas.push(`  - ${it.cantidad} ${it.nombreVisible || it.nombre}${it.talla ? ` (${it.talla})` : ''}`);
        }
    }
    return lineas.length ? '\n' + lineas.join('\n') + '\n' : '';
}
// Evita que una escritura colgada retrase la creación de la orden de pago.
function conTimeout(p, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`timeout de ${ms} ms`)), ms);
        p.then(v => { clearTimeout(timer); resolve(v); }, e => { clearTimeout(timer); reject(e); });
    });
}
//# sourceMappingURL=pedidos.js.map