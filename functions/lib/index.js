"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowConfirmar = exports.flowCrearOrden = exports.placesReviews = void 0;
const https_1 = require("firebase-functions/v2/https");
const crypto = require("crypto");
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
    var _a, _b, _c, _d, _e, _f;
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
                    commerceOrder: pago.commerceOrder,
                    monto: pago.amount,
                    email: pago.email,
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
                const descripcion = (_c = pago.commerceOrder) !== null && _c !== void 0 ? _c : 'sin referencia';
                const monto = (_e = (_d = pago.amount) === null || _d === void 0 ? void 0 : _d.toLocaleString('es-CL')) !== null && _e !== void 0 ? _e : '0';
                await transporter.sendMail({
                    from: '"Galdi Pastelería" <ventas@galdi.cl>',
                    to: 'ventas@galdi.cl, ingridgalvezd@gmail.com, jacquelinegalvezd@gmail.com, claudioferrarila@gmail.com',
                    subject: `🛒 Nuevo pedido confirmado — ${descripcion}`,
                    text: `Se confirmó un nuevo pedido en galdi.cl\n\nOrden: ${descripcion}\nMonto: $${monto} CLP\nEmail cliente: ${(_f = pago.email) !== null && _f !== void 0 ? _f : 'no registrado'}\n\nRevisa el panel en galdi.cl/gestion`,
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
//# sourceMappingURL=index.js.map