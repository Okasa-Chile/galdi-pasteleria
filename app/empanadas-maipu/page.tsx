import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Empanadas en Maipú — Galdi Pastelería Artesanal',
  description: 'Empanadas artesanales en Maipú: pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo 1 docena. Delivery y distribución a almacenes.',
  keywords: 'empanadas Maipú, empanadas artesanales Maipú, empanadas a domicilio Maipú, empanadas por docena Maipú',
};
export default function Page() {
  return <SeoPage
    titulo="Empanadas Artesanales en Maipú"
    subtitulo="Hechas a mano con rellenos generosos. Pedido mínimo 1 docena."
    descripcion="En Galdi elaboramos empanadas artesanales con recetas familiares: pino chileno tradicional, napolitana, vegetariana, queso camarón y mariscos frescos. Perfectas para eventos, reuniones o para abastecer tu almacén."
    imagen="/images/empanada-pino.webp"
    ctaTexto="Ver todas las empanadas"
    ctaHref="/?servicio=b2b&tab=Empanadas"
    waTexto="Hola Galdi, quiero pedir empanadas artesanales"
    breadcrumb="Galdi · Productos · Empanadas"
  />;
}
