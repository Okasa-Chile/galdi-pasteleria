import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Tortas y Dulces Cumpleaños en Maipú — Galdi',
  description: 'Tortas personalizadas, cupcakes y mesa de dulces para cumpleaños en Maipú. Pedidos con 48 hrs de anticipación. Delivery disponible.',
  keywords: 'torta cumpleaños Maipú, dulces cumpleaños Maipú, mesa dulces cumpleaños Maipú, pastelería cumpleaños Maipú',
  alternates: { canonical: 'https://galdi.cl/cumpleanos-maipu' },
};
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Tortas personalizadas, cupcakes y mesa de dulces para cumpleaños en Maipú. Delivery disponible.",
        "url": "https://galdi.cl/cumpleanos-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú",
        "sameAs": "https://share.google/s9CQErdNSBOZ8y15P"
      })}} />
      <SeoPage
        titulo="Tortas y Dulces para Cumpleaños en Maipú"
        subtitulo="Tortas personalizadas y mesa de dulces para celebrar como se merece."
        descripcion="Elaboramos tortas personalizadas, cupcakes y mesas de dulces artesanales para cumpleaños en Maipú. Pedidos con 48 horas de anticipación. Coordinamos delivery a tu domicilio en toda la comuna."
        imagen="/images/eventos-cumpleanos.webp"
        ctaTexto="Ver opciones cumpleaños"
        ctaHref="/?servicio=eventos&tab=Cumpleaños"
        waTexto="Hola Galdi, quiero información para un cumpleaños"
        breadcrumb="Galdi · Eventos · Cumpleaños"
      />
    </>
  );
}
