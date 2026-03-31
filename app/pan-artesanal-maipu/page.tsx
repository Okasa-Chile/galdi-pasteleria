import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Pan Artesanal en Maipú — Galdi Pastelería',
  description: 'Pan artesanal en Maipú: pan amasado, marraqueta, integral, dobladitas y más. Distribución fresca a almacenes y negocios de Maipú.',
  keywords: 'pan artesanal Maipú, panadería Maipú, pan amasado Maipú, distribución pan Maipú',
};
export default function Page() {
  return <SeoPage
    titulo="Pan Artesanal en Maipú"
    subtitulo="Amasado a mano con receta familiar. Distribución fresca a tu negocio."
    descripcion="Elaboramos pan artesanal todos los días: pan amasado, marraqueta, integral, pan frica, dobladitas y tortilla con chicharrones. Distribuimos a almacenes, cafeterías y negocios de Maipú con entrega fresca."
    imagen="/images/pan-amasado-new.webp"
    ctaTexto="Ver distribución"
    ctaHref="/?servicio=b2b&tab=Pan"
    waTexto="Hola Galdi, quiero información sobre pan artesanal"
    breadcrumb="Galdi · Productos · Pan Artesanal"
  />;
}
