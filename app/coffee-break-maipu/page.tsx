import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';

export const metadata: Metadata = {
  title: 'Coffee Break y Eventos Corporativos en Maipú — Galdi',
  description: 'Coffee break y celebraciones corporativas en Maipú con productos artesanales. Factura disponible para empresas. Cotiza con Galdi.',
  keywords: 'coffee break Maipú, eventos corporativos Maipú, catering empresas Maipú, banquetería corporativa Maipú',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Coffee break y eventos corporativos en Maipú con productos artesanales. Factura disponible.",
        "url": "https://galdi.cl/coffee-break-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú",
        "sameAs": "https://share.google/s9CQErdNSBOZ8y15P"
      })}} />
      <SeoPage
        titulo="Coffee Break y Eventos Corporativos en Maipú"
        subtitulo="Productos artesanales para tu empresa. Factura disponible."
        descripcion="Organizamos coffee breaks y celebraciones corporativas en Maipú con productos artesanales: queques, muffins, dulces, empanadas y más. Presentación prolija, puntualidad garantizada y factura disponible para empresas."
        imagen="/images/Corporativo.webp"
        ctaTexto="Ver opciones corporativas"
        ctaHref="/?servicio=eventos&tab=Corporativos"
        waTexto="Hola Galdi, quiero información sobre coffee break o evento corporativo"
        breadcrumb="Galdi · Eventos · Corporativos"
      />
    </>
  );
}
