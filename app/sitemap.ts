import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

/**
 * Sitemap generado automáticamente en cada build.
 *
 * Reemplaza a public/sitemap.xml, que era estático y escrito a mano: sus
 * lastmod quedaban congelados y no reflejaban cambios reales del sitio.
 *
 * REGLA: al crear una landing nueva, agregarla acá. No crear archivos
 * sitemap.xml manuales.
 *
 * Excluidas a propósito: /carrito y /pago-exitoso (transaccionales),
 * /experimental/* (rutas de desarrollo, con noindex),
 * /distribucion-maipu (redirige a "/", servicio retirado).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://galdi.cl';
  const now = new Date();

  const rutas: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/productos', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/arma-tu-torta', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tortas-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tortas-bodas-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/empanadas-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/pan-artesanal-maipu', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/delivery-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/matrimonios-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/coctel-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/cumpleanos-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/coffee-break-maipu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dia-de-la-madre', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/dia-del-padre', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/validar-presupuesto', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return rutas.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
