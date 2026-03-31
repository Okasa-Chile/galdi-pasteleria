import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Banquetería Matrimonios en Maipú — Galdi',
  description: 'Banquetería artesanal para matrimonios en Maipú. Tortas de novios, mesa de dulces y bocados artesanales para el día más especial.',
  keywords: 'banquetería matrimonios Maipú, torta matrimonio Maipú, mesa dulces matrimonio Maipú, pastelería eventos Maipú',
};
export default function Page() {
  return <SeoPage
    titulo="Banquetería para Matrimonios en Maipú"
    subtitulo="Tortas de novios, mesa de dulces y banquetería completa para el día más especial."
    descripcion="Coordinamos cada detalle de tu banquetería: torta de novios personalizada, mesa de dulces artesanales, bocados salados y más. Todo elaborado con recetas familiares y el cariño que merece tu matrimonio."
    imagen="/images/eventos-matrimonio.webp"
    ctaTexto="Ver banquetería matrimonios"
    ctaHref="/?servicio=eventos&tab=Matrimonios"
    waTexto="Hola Galdi, quiero información sobre banquetería para mi matrimonio"
    breadcrumb="Galdi · Eventos · Matrimonios"
  />;
}
