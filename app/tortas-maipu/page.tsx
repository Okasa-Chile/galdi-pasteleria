import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Tortas en Maipú — Galdi Pastelería Artesanal',
  description: 'Tortas artesanales por encargo en Maipú: 3 leches, chocolate, selva negra, hojarasca y más. Delivery en toda la comuna.',
  keywords: 'tortas Maipú, tortas por encargo Maipú, tortas artesanales Maipú, tortas a domicilio Maipú',
};
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Tortas artesanales por encargo en Maipú: 3 leches, chocolate, selva negra, hojarasca y más.",
        "url": "https://galdi.cl/tortas-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú"
      })}} />
      <SeoPage
        titulo="Tortas por Encargo en Maipú"
        subtitulo="Tortas artesanales para cada ocasión. Delivery en toda la comuna."
        descripcion="Elaboramos tortas con recetas familiares: 3 leches, chocolate, moca, selva negra, panqueque, piña y hojarasca. Cada torta se prepara por encargo con ingredientes frescos y el cariño que nos caracteriza."
        imagen="/images/Torta 3 Leches.webp"
        ctaTexto="Ver todas las tortas"
        ctaHref="/?servicio=delivery&tab=Tortas"
        waTexto="Hola Galdi, quiero encargar una torta"
        breadcrumb="Galdi · Productos · Tortas"
      />
    </>
  );
}
