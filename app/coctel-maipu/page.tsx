import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Banquetería Cóctel en Maipú — Galdi',
  description: 'Bocados dulces y salados para cócteles y recepciones en Maipú. Presentación elegante lista para servir. Cotiza con Galdi.',
  keywords: 'cóctel Maipú, banquetería cóctel Maipú, bocados cóctel Maipú, catering cóctel Maipú',
};
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Bocados dulces y salados para cócteles y recepciones en Maipú. Presentación elegante lista para servir.",
        "url": "https://galdi.cl/coctel-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú",
        "sameAs": "https://share.google/s9CQErdNSBOZ8y15P"
      })}} />
      <SeoPage
        titulo="Banquetería para Cóctel en Maipú"
        subtitulo="Bocados dulces y salados con presentación elegante lista para servir."
        descripcion="Preparamos banquetería para cócteles y recepciones en Maipú: bocados dulces, salados y pasteles artesanales con una presentación elegante que impresiona a tus invitados."
        imagen="/images/eventos-coctel.webp"
        ctaTexto="Ver banquetería cóctel"
        ctaHref="/?servicio=eventos&tab=Cóctel"
        waTexto="Hola Galdi, quiero información sobre banquetería para un cóctel"
        breadcrumb="Galdi · Eventos · Cóctel"
      />
    </>
  );
}
