import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Empanadas en Maipú — Galdi Pastelería Artesanal',
  description: 'Las mejores empanadas artesanales de Maipú: pino, napolitana, queso camarón y mariscos. Hechas a mano con recetas familiares. Pedido por WhatsApp, delivery disponible.',
  keywords: 'empanadas Maipú, empanadas artesanales Maipú, empanadas a domicilio Maipú, empanadas por docena Maipú',
  alternates: { canonical: 'https://galdi.cl/empanadas-maipu' },
};
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Empanadas artesanales en Maipú: pino, napolitana, vegetariana, queso camarón y mariscos. Pedido mínimo 1 docena.",
        "url": "https://galdi.cl/empanadas-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú",
        "sameAs": "https://share.google/s9CQErdNSBOZ8y15P"
      })}} />
      <SeoPage
        titulo="Empanadas Artesanales en Maipú"
        subtitulo="Hechas a mano con rellenos generosos. Pedido mínimo 1 docena."
        descripcion="En Galdi elaboramos empanadas artesanales con recetas familiares: tradicional de pino, queso, napolitana, vegetariana (queso champiñón), queso camarón y la exquisita empanada de mariscos al horno. Perfectas para eventos, reuniones o para abastecer tu almacén."
        imagen="/images/empanada-pino.webp"
        ctaTexto="Ver todas las empanadas"
        ctaHref="/?servicio=b2b&tab=Empanadas"
        waTexto="Hola Galdi, quiero pedir empanadas artesanales"
        breadcrumb="Galdi · Productos · Empanadas"
      />
    </>
  );
}
