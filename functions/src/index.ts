import { onRequest } from 'firebase-functions/v2/https';
import * as crypto from 'crypto';
import { calcularCostoDespacho, extraerComuna, type AddressComponent } from './deliveryPricing';

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
            commerceOrder: pago.commerceOrder ?? 'no registrado',
            monto:         pago.amount ?? 0,
            email:         pago.email ?? 'no registrado',
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

// ─── Delivery: RADIO EN LÍNEA RECTA ───────────────────────────────────────────
//
// Se geocodifica la dirección (una sola llamada a Google, Geocoding API) para
// obtener lat/lng. El precio sale de calcularCostoDespacho() en
// deliveryPricing.ts: distancia Haversine a ORIGEN_GALDI → banda de precio. NO
// se llama a Distance Matrix — el modelo por ruta se abandonó (ver el comentario
// de cabecera de deliveryPricing.ts).
//
// La comuna se lee de address_components del mismo resultado de Geocoding SOLO
// para logging y para mostrarla en el pedido — no interviene en el precio.
//
// Contrato de respuesta:
// - Éxito (dentro del radio): { km, costoDelivery, requiereCotizacionManual: false, comuna }
//   `km` es la distancia en LÍNEA RECTA (no de ruta). `comuna` puede ser null.
// - Fuera del radio (>31,1 km): { km, costoDelivery: null, requiereCotizacionManual: true, motivo: 'fuera_de_radio', comuna }
//   No hay despacho automático; se coordina y cotiza por WhatsApp.
// - Dirección no ubicada:    HTTP 422 { error }  — culpa del input, bloquea hasta corregir
// - Falla de infraestructura (red, timeout, cuota, Google caído, etc.):
//                            HTTP 200 { km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura' }
//   El detalle real del error se loguea server-side y NUNCA se expone al cliente.
//   Este caso es HTTP 200 (no un error) a propósito: el checkout no debe tratarlo
//   como fallo bloqueante — debe dejar avanzar el pedido con el despacho a coordinar
//   por WhatsApp. Un fallo nuestro de infraestructura no puede bloquear una venta.

const ERROR_DIRECCION_NO_UBICADA =
  'No pudimos ubicar esa dirección, verifica que esté completa (calle, número, comuna).';

const TIMEOUT_MS = 8000;

interface GeocodingResponse {
  status: string;
  error_message?: string;
  results: Array<{
    partial_match?: boolean;
    geometry: { location: { lat: number; lng: number } };
    address_components?: AddressComponent[];
  }>;
}

// extraerComuna() vive en ./deliveryPricing. Prioriza
// administrative_area_level_3 sobre locality — ver el comentario allí, con el
// caso "Av. Apoquindo 4501" (locality:"Santiago", admin3:"Las Condes"). Solo
// para logging/recibo; no decide precio.

function respuestaFallbackInfraestructura(res: import('express').Response) {
  res.json({ km: null, costoDelivery: null, requiereCotizacionManual: true, motivo: 'error_infraestructura' });
}

// CORS (arriba) solo gobierna el navegador: no detiene curl, scripts ni
// llamadas servidor-a-servidor (lo comprobé yo mismo diagnosticando este
// endpoint). Esta función consume cuota de Google Maps por request, así que
// además exige el header Origin y lo valida server-side contra la misma
// lista — defensa mínima contra martilleo directo del endpoint.
function origenPermitido(origin: string | undefined): boolean {
  return !!origin && ALLOWED_ORIGINS.includes(origin);
}

export const calcularCostoDelivery = onRequest(
  { region: 'us-central1', cors: ALLOWED_ORIGINS, invoker: 'public', secrets: ['GOOGLE_MAPS_API_KEY_GALDI'], maxInstances: 5 },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Método no permitido' });
      return;
    }

    if (!origenPermitido(req.headers.origin)) {
      res.status(403).json({ error: 'Origen no autorizado' });
      return;
    }

    const direccion = String(req.body?.direccion ?? '').trim();
    if (!direccion) {
      res.status(400).json({ error: 'Falta la dirección.' });
      return;
    }

    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY_GALDI?.trim();
      if (!apiKey) {
        console.error('[calcularCostoDelivery] GOOGLE_MAPS_API_KEY_GALDI no configurada');
        respuestaFallbackInfraestructura(res);
        return;
      }

      // a) Geocoding: dirección → coordenadas
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&region=cl&language=es&components=country:CL&key=${apiKey}`;
      let geoData: GeocodingResponse;
      try {
        const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(TIMEOUT_MS) });
        geoData = await geoRes.json() as GeocodingResponse;
      } catch (fetchErr) {
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

      const primerResultado = geoData.results?.[0];
      if (!primerResultado || primerResultado.partial_match) {
        res.status(422).json({ error: ERROR_DIRECCION_NO_UBICADA });
        return;
      }

      const destino = primerResultado.geometry.location;
      const comuna = extraerComuna(primerResultado.address_components);

      // b) Banda de precio por distancia en LÍNEA RECTA (ver deliveryPricing.ts).
      //    Sin llamada a Distance Matrix: el modelo por ruta se abandonó.
      const { km, costo, fueraDeRadio, banda } = calcularCostoDespacho(destino);
      console.log(
        `[calcularCostoDelivery] km=${km.toFixed(2)} comuna="${comuna ?? ''}" banda="${banda}" costo=${costo}`,
      );

      if (fueraDeRadio) {
        res.json({
          km, costoDelivery: null, requiereCotizacionManual: true,
          motivo: 'fuera_de_radio', comuna: comuna ?? null,
        });
        return;
      }

      res.json({
        km, costoDelivery: costo, requiereCotizacionManual: false, comuna: comuna ?? null,
      });

    } catch (err) {
      console.error('[calcularCostoDelivery] Error inesperado:', err);
      respuestaFallbackInfraestructura(res);
    }
  }
);
