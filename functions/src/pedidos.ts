import type { Firestore } from 'firebase-admin/firestore';

// Persistencia de pedidos Flow en la colección galdi_pedidos.
// Documento con id = commerceOrder (mismo valor que se envía a Flow), para
// poder buscarlo después y actualizarlo cuando Flow confirma el pago.

const COLECCION = 'galdi_pedidos';
const MAX_ITEMS = 100;

// El id del documento sale de un valor enviado por el cliente: se restringe el
// formato (un "/" crearía una ruta anidada) y se acota el largo.
export const ORDEN_VALIDA = /^[A-Za-z0-9_-]{1,64}$/;

const texto = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const numero = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export interface ItemPedido {
  nombre: string;
  nombreVisible: string;
  talla: string | null;
  precio: number;
  cantidad: number;
  unidad: string;
}

export interface DatosPedido {
  nombre: string;
  telefono: string;
  direccion: string | null;
  modoEntrega: 'retiro' | 'domicilio' | null;
  fechaEntrega: string;
  items: ItemPedido[];
}

// Toma solo los campos conocidos del body y los acota (endpoint público).
export function extraerDatosPedido(body: Record<string, unknown>): DatosPedido {
  const modoEntrega =
    body.modoEntrega === 'retiro' || body.modoEntrega === 'domicilio' ? body.modoEntrega : null;

  const items: ItemPedido[] = (Array.isArray(body.items) ? body.items : [])
    .slice(0, MAX_ITEMS)
    .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
    .map(it => ({
      nombre:        texto(it.nombre, 200),
      nombreVisible: texto(it.nombreVisible, 200),
      talla:         texto(it.talla, 10) || null,
      precio:        numero(it.precio),
      cantidad:      numero(it.cantidad),
      unidad:        texto(it.unidad, 20),
    }));

  return {
    nombre:       texto(body.nombre, 200),
    telefono:     texto(body.telefono, 30),
    direccion:    modoEntrega === 'domicilio' ? (texto(body.direccion, 300) || null) : null,
    modoEntrega,
    fechaEntrega: texto(body.fechaEntrega, 32),
    items,
  };
}

// Escribe el pedido con estado 'pendiente_pago'. Usa create(): si ya existe un
// documento con ese id (p. ej. un pedido ya pagado) falla en vez de pisarlo.
export async function guardarPedidoPendiente(
  db: Firestore,
  serverTs: unknown,
  p: { orden: unknown; monto: unknown; email: unknown; body: Record<string, unknown> },
): Promise<void> {
  const orden = typeof p.orden === 'string' ? p.orden : '';
  if (!ORDEN_VALIDA.test(orden)) {
    throw new Error('orden con formato inválido, pedido no persistido');
  }
  await db.collection(COLECCION).doc(orden).create({
    commerceOrder: orden,
    ...extraerDatosPedido(p.body),
    monto:  numero(p.monto),
    email:  texto(p.email, 200),
    estado: 'pendiente_pago',
    fecha:  serverTs,
  });
}

// Marca el pedido como pagado con los datos reales de Flow. Si el documento
// existe lo actualiza (conserva nombre/teléfono/dirección/items del paso
// anterior). Si no existe (pedido anterior a este cambio, o falló la escritura
// inicial) crea uno con los campos mínimos de siempre.
// Devuelve los datos previos del pedido (undefined si no existía).
export async function registrarPagoConfirmado(
  db: Firestore,
  serverTs: unknown,
  pago: { commerceOrder?: string; amount?: number; email?: string },
): Promise<Record<string, unknown> | undefined> {
  const orden = pago.commerceOrder ?? '';
  const monto = pago.amount ?? 0;
  const email = pago.email ?? 'no registrado';

  if (ORDEN_VALIDA.test(orden)) {
    const ref = db.collection(COLECCION).doc(orden);
    const snap = await ref.get();
    if (snap.exists) {
      await ref.update({ estado: 'pagado', monto, email, fechaPago: serverTs });
      return snap.data() as Record<string, unknown>;
    }
    await ref.set({ commerceOrder: orden, monto, email, estado: 'pagado', fecha: serverTs });
    return undefined;
  }

  await db.collection(COLECCION).add({
    commerceOrder: orden || 'no registrado',
    monto,
    email,
    estado: 'pagado',
    fecha:  serverTs,
  });
  return undefined;
}

// Líneas extra para el correo de notificación (vacío si no hay datos previos).
export function detalleParaCorreo(pedido: Record<string, unknown> | undefined): string {
  if (!pedido) return '';
  const lineas: string[] = [];
  if (pedido.nombre)   lineas.push(`Cliente: ${pedido.nombre}`);
  if (pedido.telefono) lineas.push(`Teléfono: ${pedido.telefono}`);
  if (pedido.modoEntrega === 'domicilio') {
    lineas.push(`Entrega: despacho a domicilio${pedido.direccion ? ` — ${pedido.direccion}` : ''}`);
  } else if (pedido.modoEntrega === 'retiro') {
    lineas.push('Entrega: retiro en local');
  }
  if (pedido.fechaEntrega) lineas.push(`Fecha de entrega: ${pedido.fechaEntrega}`);
  const items = Array.isArray(pedido.items) ? (pedido.items as ItemPedido[]) : [];
  if (items.length) {
    lineas.push('Detalle:');
    for (const it of items) {
      lineas.push(`  - ${it.cantidad} ${it.nombreVisible || it.nombre}${it.talla ? ` (${it.talla})` : ''}`);
    }
  }
  return lineas.length ? '\n' + lineas.join('\n') + '\n' : '';
}

// Evita que una escritura colgada retrase la creación de la orden de pago.
export function conTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout de ${ms} ms`)), ms);
    p.then(
      v => { clearTimeout(timer); resolve(v); },
      e => { clearTimeout(timer); reject(e); },
    );
  });
}
