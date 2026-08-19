"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularCostoDelivery = exports.flowConfirmar = exports.flowCrearOrden = exports.placesReviews = void 0;
const https_1 = require("firebase-functions/v2/https");
const crypto = require("crypto");
const deliveryPricing_1 = require("./deliveryPricing");
const PLACE_ID = 'ChIJf7l5N6LDYpYR6uNj83Fqd9g';
const ALLOWED_ORIGINS = [
    'https://galdi.cl',
    'https://www.galdi.cl',
    'https://galdi-web.web.app',
    'http://localhost:3000',
];
exports.placesReviews = (0, https_1.onRequest)({ region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public' }, async (req, res) => {
    var _a, _b;
    res.set('Cache-Control', 'public, max-age=86400');
    try {
        const apiKey = process.env.PLACES_API_KEY;
        if (!apiKey) {
            res.status(500).json({ error: 'API key not configured' });
            return;
        }
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=es&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const resenas = ((_b = (_a = data.result) === null || _a === void 0 ? void 0 : _a.reviews) !== null && _b !== void 0 ? _b : []).slice(0, 5);
        res.json(resenas);
    }
    catch (_c) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
});
// ─── Flow ─────────────────────────────────────────────────────────────────────
const FLOW_API_URL = 'https://www.flow.cl/api';
function firmarFlow(params, secret) {
    const keys = Object.keys(params).sort();
    const cadena = keys.map(k => `${k}${params[k]}`).join('');
    return crypto.createHmac('sha256', secret).update(cadena).digest('hex');
}
exports.flowCrearOrden = (0, https_1.onRequest)({ region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['FLOW_API_KEY', 'FLOW_SECRET_KEY'] }, async (req, res) => {
    var _a, _b;
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método no permitido' });
        return;
    }
    try {
        const apiKey = (_a = process.env.FLOW_API_KEY) === null || _a === void 0 ? void 0 : _a.trim();
        const secret = (_b = process.env.FLOW_SECRET_KEY) === null || _b === void 0 ? void 0 : _b.trim();
        if (!apiKey || !secret) {
            res.status(500).json({ error: 'Credenciales Flow no configuradas' });
            return;
        }
        const { orden, monto, email, descripcion } = req.body;
        const params = {
            apiKey,
            commerceOrder: orden,
            subject: descripcion,
            currency: 'CLP',
            amount: String(monto),
            email,
            urlConfirmation: 'https://us-central1-galdi-web.cloudfunctions.net/flowConfirmar',
            urlReturn: 'https://galdi.cl/pago-exitoso',
        };
        params.s = firmarFlow(params, secret);
        const form = new URLSearchParams(params);
        const response = await fetch(`${FLOW_API_URL}/payment/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: form.toString(),
        });
        const data = await response.json();
        if (!data.url || !data.token) {
            res.status(502).json({ error: 'Flow no retornó URL', detalle: data });
            return;
        }
        res.json({ urlPago: `${data.url}?token=${data.token}`, token: data.token });
    }
    catch (err) {
        res.status(500).json({ error: 'Error interno', detalle: String(err) });
    }
});
exports.flowConfirmar = (0, https_1.onRequest)({ region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['FLOW_API_KEY', 'FLOW_SECRET_KEY', 'ZOHO_USER', 'ZOHO_PASS'] }, async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const apiKey = (_a = process.env.FLOW_API_KEY) === null || _a === void 0 ? void 0 : _a.trim();
        const secret = (_b = process.env.FLOW_SECRET_KEY) === null || _b === void 0 ? void 0 : _b.trim();
        if (!apiKey || !secret) {
            res.status(500).json({ error: 'Credenciales Flow no configuradas' });
            return;
        }
        const token = req.body.token || req.query.token;
        if (!token) {
            res.status(400).json({ error: 'Token no recibido' });
            return;
        }
        const params = { apiKey, token };
        params.s = firmarFlow(params, secret);
        const response = await fetch(`${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params)}`, { method: 'GET' });
        const pago = await response.json();
        if (pago.status === 2) {
            console.log('✅ Pago confirmado:', pago.commerceOrder, pago.amount, pago.email);
            // Guardar pedido confirmado en Firestore
            try {
                const { initializeApp, getApps } = await Promise.resolve().then(() => require('firebase-admin/app'));
                if (getApps().length === 0)
                    initializeApp();
                const { getFirestore, FieldValue } = await Promise.resolve().then(() => require('firebase-admin/firestore'));
                const db = getFirestore();
                await db.collection('galdi_pedidos').add({
                    commerceOrder: (_c = pago.commerceOrder) !== null && _c !== void 0 ? _c : 'no registrado',
                    monto: (_d = pago.amount) !== null && _d !== void 0 ? _d : 0,
                    email: (_e = pago.email) !== null && _e !== void 0 ? _e : 'no registrado',
                    estado: 'pagado',
                    fecha: FieldValue.serverTimestamp(),
                });
                console.log('[flowConfirmar] Pedido guardado:', pago.commerceOrder);
            }
            catch (dbErr) {
                console.error('[flowConfirmar] Error guardando pedido:', dbErr);
            }
            try {
                const nodemailer = await Promise.resolve().then(() => require('nodemailer'));
                const transporter = nodemailer.createTransport({
                    host: 'smtp.zoho.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.ZOHO_USER,
                        pass: process.env.ZOHO_PASS,
                    },
                });
                const descripcion = (_f = pago.commerceOrder) !== null && _f !== void 0 ? _f : 'sin referencia';
                const monto = (_h = (_g = pago.amount) === null || _g === void 0 ? void 0 : _g.toLocaleString('es-CL')) !== null && _h !== void 0 ? _h : '0';
                await transporter.sendMail({
                    from: '"Galdi Pastelería" <ventas@galdi.cl>',
                    to: 'ventas@galdi.cl, ingridgalvezd@gmail.com, jacquelinegalvezd@gmail.com, claudioferrarila@gmail.com',
                    subject: `🛒 Nuevo pedido confirmado — ${descripcion}`,
                    text: `Se confirmó un nuevo pedido en galdi.cl\n\nOrden: ${descripcion}\nMonto: $${monto} CLP\nEmail cliente: ${(_j = pago.email) !== null && _j !== void 0 ? _j : 'no registrado'}\n\nRevisa el panel en galdi.cl/gestion`,
                });
                console.log('[flowConfirmar] Email de notificación enviado.');
            }
            catch (mailErr) {
                console.error('[flowConfirmar] Error enviando email:', mailErr);
            }
        }
        res.json({ ok: true, status: pago.status });
    }
    catch (err) {
        res.status(500).json({ error: 'Error interno', detalle: String(err) });
    }
});
// ─── Delivery por radio de km ──────────────────────────────────────────────
//
// Contrato de respuesta:
// - Éxito:                  { km, costoDelivery, requiereCotizacionManual: false }
// - Fuera del radio (>24km): { km, costoDelivery: null, requiereCotizacionManual: true, motivo: 'fuera_de_radio' }
// - Dirección no ubicada:    HTTP 422 { error }  — culpa del input, bloquea hasta corregir
// - Falla de infraestructura (red, timeout, cuota, Google caído, etc.):
//                            HTTP 200 { km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura' }
//   El detalle real del error se loguea server-side y NUNCA se expone al cliente.
//   Este caso es HTTP 200 (no un error) a propósito: el checkout no debe tratarlo
//   como fallo bloqueante — debe dejar avanzar el pedido con el despacho a coordinar
//   por WhatsApp. Un fallo nuestro de infraestructura no puede bloquear una venta.
const ERROR_DIRECCION_NO_UBICADA = 'No pudimos ubicar esa dirección, verifica que esté completa (calle, número, comuna).';
const TIMEOUT_MS = 8000;
function respuestaFallbackInfraestructura(res) {
    res.json({ km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura' });
}
// CORS (arriba) solo gobierna el navegador: no detiene curl, scripts ni
// llamadas servidor-a-servidor (lo comprobé yo mismo diagnosticando este
// endpoint). Esta función consume cuota de Google Maps por request, así que
// además exige el header Origin y lo valida server-side contra la misma
// lista — defensa mínima contra martilleo directo del endpoint.
function origenPermitido(origin) {
    return !!origin && ALLOWED_ORIGINS.includes(origin);
}
exports.calcularCostoDelivery = (0, https_1.onRequest)({ region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['GOOGLE_MAPS_API_KEY_GALDI'], maxInstances: 5 }, async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método no permitido' });
        return;
    }
    if (!origenPermitido(req.headers.origin)) {
        res.status(403).json({ error: 'Origen no autorizado' });
        return;
    }
    const direccion = String((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.direccion) !== null && _b !== void 0 ? _b : '').trim();
    if (!direccion) {
        res.status(400).json({ error: 'Falta la dirección.' });
        return;
    }
    try {
        const apiKey = (_c = process.env.GOOGLE_MAPS_API_KEY_GALDI) === null || _c === void 0 ? void 0 : _c.trim();
        if (!apiKey) {
            console.error('[calcularCostoDelivery] GOOGLE_MAPS_API_KEY_GALDI no configurada');
            respuestaFallbackInfraestructura(res);
            return;
        }
        // a) Geocoding: dirección → coordenadas
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&region=cl&language=es&components=country:CL&key=${apiKey}`;
        let geoData;
        try {
            const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(TIMEOUT_MS) });
            geoData = await geoRes.json();
        }
        catch (fetchErr) {
            console.error('[calcularCostoDelivery] Error de red en Geocoding API:', fetchErr);
            respuestaFallbackInfraestructura(res);
            return;
        }
        if (geoData.status === 'ZERO_RESULTS') {
            res.status(422).json({ error: ERROR_DIRECCION_NO_UBICADA });
            return;
        }
        if (geoData.status !== 'OK') {
            console.error('[calcularCostoDelivery] Geocoding status no-OK:', geoData.status, geoData.error_message);
            respuestaFallbackInfraestructura(res);
            return;
        }
        const primerResultado = (_d = geoData.results) === null || _d === void 0 ? void 0 : _d[0];
        if (!primerResultado || primerResultado.partial_match) {
            res.status(422).json({ error: ERROR_DIRECCION_NO_UBICADA });
            return;
        }
        const destino = primerResultado.geometry.location;
        // b) Distance Matrix: distancia real en auto desde el origen
        const distUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${deliveryPricing_1.ORIGEN_GALDI.lat},${deliveryPricing_1.ORIGEN_GALDI.lng}&destinations=${destino.lat},${destino.lng}&mode=driving&language=es&key=${apiKey}`;
        let distData;
        try {
            const distRes = await fetch(distUrl, { signal: AbortSignal.timeout(TIMEOUT_MS) });
            distData = await distRes.json();
        }
        catch (fetchErr) {
            console.error('[calcularCostoDelivery] Error de red en Distance Matrix API:', fetchErr);
            respuestaFallbackInfraestructura(res);
            return;
        }
        if (distData.status !== 'OK') {
            console.error('[calcularCostoDelivery] Distance Matrix status no-OK:', distData.status, distData.error_message);
            respuestaFallbackInfraestructura(res);
            return;
        }
        const elemento = (_g = (_f = (_e = distData.rows) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.elements) === null || _g === void 0 ? void 0 : _g[0];
        if (!elemento || elemento.status === 'NOT_FOUND' || elemento.status === 'ZERO_RESULTS') {
            res.status(422).json({ error: ERROR_DIRECCION_NO_UBICADA });
            return;
        }
        if (elemento.status !== 'OK' || !elemento.distance) {
            console.error('[calcularCostoDelivery] Distance Matrix element status no-OK:', elemento.status);
            respuestaFallbackInfraestructura(res);
            return;
        }
        const km = elemento.distance.value / 1000;
        // c) Aplica la tabla de tramos
        const costoDelivery = (0, deliveryPricing_1.calcularCostoPorKm)(km);
        // d) Fuera del radio de despacho automático
        if (costoDelivery === null) {
            res.json({ km, costoDelivery: null, requiereCotizacionManual: true, motivo: 'fuera_de_radio' });
            return;
        }
        res.json({ km, costoDelivery, requiereCotizacionManual: false });
    }
    catch (err) {
        console.error('[calcularCostoDelivery] Error inesperado:', err);
        respuestaFallbackInfraestructura(res);
    }
});
//# sourceMappingURL=index.js.map