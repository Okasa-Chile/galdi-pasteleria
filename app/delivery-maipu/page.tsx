import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Delivery Pasteles y Tortas en Maipú — Galdi',
  description: 'Delivery de pasteles, tortas y dulces artesanales en Maipú. Recibe en tu puerta tortas, empanadas, queques y más. Pedido por WhatsApp.',
  keywords: 'delivery pasteles Maipú, delivery tortas Maipú, pastelería a domicilio Maipú, delivery dulces Maipú',
};
export default function Page() {
  return <SeoPage
    titulo="Delivery de Pasteles en Maipú"
    subtitulo="Llevamos nuestros productos directo a tu puerta en toda la comuna."
    descripcion="Hacemos delivery de tortas, pasteles, empanadas y queques artesanales en toda la comuna de Maipú. Solo escríbenos por WhatsApp con tu pedido y coordinaremos la entrega en el horario que más te acomode."
    imagen="/images/svc-delivery.webp"
    ctaTexto="Ver productos delivery"
    ctaHref="/?servicio=delivery&tab=Tortas"
    waTexto="Hola Galdi, quiero hacer un pedido con delivery en Maipú"
    breadcrumb="Galdi · Servicios · Delivery"
  />;
}
