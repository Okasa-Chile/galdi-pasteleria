import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Banquetería Cóctel en Maipú — Galdi',
  description: 'Bocados dulces y salados para cócteles y recepciones en Maipú. Presentación elegante lista para servir. Cotiza con Galdi.',
  keywords: 'cóctel Maipú, banquetería cóctel Maipú, bocados cóctel Maipú, catering cóctel Maipú',
};
export default function Page() {
  return <SeoPage
    titulo="Banquetería para Cóctel en Maipú"
    subtitulo="Bocados dulces y salados con presentación elegante lista para servir."
    descripcion="Preparamos banquetería para cócteles y recepciones en Maipú: bocados dulces, salados y pasteles artesanales con una presentación elegante que impresiona a tus invitados."
    imagen="/images/eventos-coctel.webp"
    ctaTexto="Ver banquetería cóctel"
    ctaHref="/?servicio=eventos&tab=Cóctel"
    waTexto="Hola Galdi, quiero información sobre banquetería para un cóctel"
    breadcrumb="Galdi · Eventos · Cóctel"
  />;
}
