import { onRequest } from 'firebase-functions/v2/https';
import * as crypto from 'crypto';

const PLACE_ID = 'ChIJf7l5N6LDYpYR6uNj83Fqd9g';

const ALLOWED_ORIGINS = [
  'https://galdi.cl',
  'https://www.galdi.cl',
  'https://galdi-web.web.app',
  'http://localhost:3000',
];

export const placesReviews = onRequest(
  { region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public' },
  async (req, res) => {
    res.set('Cache-Control', 'public, max-age=86400');

    try {
      const apiKey = process.env.PLACES_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'API key not configured' });
        return;
      }

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=es&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json() as {
        result?: { reviews?: Array<{ rating: number }> };
      };

      const resenas = (data.result?.reviews ?? []).slice(0, 5);

      res.json(resenas);
    } catch {
      res.status(500).json({ error: 'Error fetching reviews' });
    }
  }
);

// ─── Flow ─────────────────────────────────────────────────────────────────────

const FLOW_API_URL = 'https://www.flow.cl/api';

function firmarFlow(params: Record<string, string>, secret: string): string {
  const keys = Object.keys(params).sort();
  const cadena = keys.map(k => `${k}${params[k]}`).join('');
  return crypto.createHmac('sha256', secret).update(cadena).digest('hex');
}

export const flowCrearOrden = onRequest(
  { region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['FLOW_API_KEY', 'FLOW_SECRET_KEY'] },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Método no permitido' });
      return;
    }
    try {
      const apiKey = process.env.FLOW_API_KEY?.trim();
      const secret = process.env.FLOW_SECRET_KEY?.trim();
      if (!apiKey || !secret) {
        res.status(500).json({ error: 'Credenciales Flow no configuradas' });
        return;
      }

      const { orden, monto, email, descripcion } = req.body;

      const params: Record<string, string> = {
        apiKey,
        commerceOrder: orden,
        subject:       descripcion,
        currency:      'CLP',
        amount:        String(monto),
        email,
        urlConfirmation: 'https://us-central1-galdi-web.cloudfunctions.net/flowConfirmar',
        urlReturn:     'https://galdi.cl/pago-exitoso',
      };
      params.s = firmarFlow(params, secret);

      const form = new URLSearchParams(params);
      const response = await fetch(`${FLOW_API_URL}/payment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });

      const data = await response.json() as { url?: string; token?: string; message?: string; code?: number };

      if (!data.url || !data.token) {
        res.status(502).json({ error: 'Flow no retornó URL', detalle: data });
        return;
      }

      res.json({ urlPago: `${data.url}?token=${data.token}`, token: data.token });

    } catch (err) {
      res.status(500).json({ error: 'Error interno', detalle: String(err) });
    }
  }
);

export const flowConfirmar = onRequest(
  { region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['FLOW_API_KEY', 'FLOW_SECRET_KEY', 'ZOHO_USER', 'ZOHO_PASS'] },
  async (req, res) => {
    try {
      const apiKey = process.env.FLOW_API_KEY?.trim();
      const secret = process.env.FLOW_SECRET_KEY?.trim();
      if (!apiKey || !secret) {
        res.status(500).json({ error: 'Credenciales Flow no configuradas' });
        return;
      }

      const token = req.body.token || req.query.token as string;
      if (!token) {
        res.status(400).json({ error: 'Token no recibido' });
        return;
      }

      const params: Record<string, string> = { apiKey, token };
      params.s = firmarFlow(params, secret);

      const response = await fetch(
        `${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params)}`,
        { method: 'GET' }
      );

      const pago = await response.json() as {
        status?: number;
        commerceOrder?: string;
        amount?: number;
        email?: string;
      };

      if (pago.status === 2) {
        console.log('✅ Pago confirmado:', pago.commerceOrder, pago.amount, pago.email);
        // Guardar pedido confirmado en Firestore
        try {
          const { initializeApp, getApps } = await import('firebase-admin/app');
          if (getApps().length === 0) initializeApp();
          const { getFirestore, FieldValue } = await import('firebase-admin/firestore');
          const db = getFirestore();
          await db.collection('galdi_pedidos').add({
            commerceOrder: pago.commerceOrder,
            monto:         pago.amount,
            email:         pago.email,
            estado:        'pagado',
            fecha:         FieldValue.serverTimestamp(),
          });
          console.log('[flowConfirmar] Pedido guardado:', pago.commerceOrder);
        } catch (dbErr) {
          console.error('[flowConfirmar] Error guardando pedido:', dbErr);
        }
        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.ZOHO_USER,
              pass: process.env.ZOHO_PASS,
            },
          });
          const descripcion = pago.commerceOrder ?? 'sin referencia';
          const monto = pago.amount?.toLocaleString('es-CL') ?? '0';
          await transporter.sendMail({
            from: '"Galdi Pastelería" <ventas@galdi.cl>',
            to: 'ventas@galdi.cl, ingridgalvezd@gmail.com, jacquelinegalvezd@gmail.com, claudioferrarila@gmail.com',
            subject: `🛒 Nuevo pedido confirmado — ${descripcion}`,
            text: `Se confirmó un nuevo pedido en galdi.cl\n\nOrden: ${descripcion}\nMonto: $${monto} CLP\nEmail cliente: ${pago.email ?? 'no registrado'}\n\nRevisa el panel en galdi.cl/gestion`,
          });
          console.log('[flowConfirmar] Email de notificación enviado.');
        } catch (mailErr) {
          console.error('[flowConfirmar] Error enviando email:', mailErr);
        }
      }

      res.json({ ok: true, status: pago.status });

    } catch (err) {
      res.status(500).json({ error: 'Error interno', detalle: String(err) });
    }
  }
);
