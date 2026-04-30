import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';
export const metadata: Metadata = {
  title: 'Distribución Panadería y Pastelería Maipú — Galdi',
  description: 'Distribución de pan, queques, dulces y empanadas artesanales a almacenes y negocios de Maipú. Productos frescos con factura disponible.',
  keywords: 'distribución panadería Maipú, distribución pastelería Maipú, proveedor almacenes Maipú, pan mayorista Maipú',
  alternates: { canonical: 'https://galdi.cl/distribucion-maipu' },
};
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Galdi Pastelería Artesanal",
        "description": "Distribución de pan, queques, dulces y empanadas artesanales a almacenes y negocios de Maipú.",
        "url": "https://galdi.cl/distribucion-maipu",
        "telephone": "+56990991011",
        "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
        "servesCuisine": "Chilean",
        "areaServed": "Maipú",
        "sameAs": "https://share.google/s9CQErdNSBOZ8y15P"
      })}} />
      <SeoPage
        titulo="Distribución a Almacenes en Maipú"
        subtitulo="Abastecemos tu negocio con productos frescos y consistentes. Factura disponible."
        descripcion="Somos proveedores de pan, queques, muffins, dulces y empanadas artesanales para almacenes, cafeterías y negocios de Maipú. Entrega fresca, precios por volumen y factura para empresas."
        imagen="/images/svc-b2b.webp"
        ctaTexto="Ver catálogo distribución"
        ctaHref="/?servicio=b2b&tab=Pan"
        waTexto="Hola Galdi, quiero información sobre distribución a mi negocio"
        breadcrumb="Galdi · Servicios · Distribución"
      />
    </>
  );
}
