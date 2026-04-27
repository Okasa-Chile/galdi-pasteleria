import type { Metadata } from 'next';
import SeoPage from '@/components/SeoPage';

export const metadata: Metadata = {
  title: 'Tortas para el Día de la Madre en Maipú | Galdi Pastelería',
  description: 'Regala una torta artesanal para el Día de la Madre. Torta Amor, Torta 3 Leches y Torta Panqueque con delivery en Maipú. Pedidos por WhatsApp +56 9 9099 1011.',
  alternates: { canonical: 'https://galdi.cl/dia-de-la-madre' },
  openGraph: {
    title: 'Tortas para el Día de la Madre en Maipú | Galdi',
    description: 'Tortas artesanales con delivery en Maipú para el Día de la Madre.',
    url: 'https://galdi.cl/dia-de-la-madre',
    images: [{ url: 'https://galdi.cl/images/og-galdi.webp', width: 1200, height: 630 }],
  },
};

export default function DiaDeLaMadrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Galdi Pastelería",
            "url": "https://galdi.cl",
            "telephone": "+56990991011",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Pasaje Marcos Echenique N° 809",
              "addressLocality": "Maipú",
              "addressRegion": "Región Metropolitana",
              "addressCountry": "CL"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tortas Día de la Madre",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Amor" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta 3 Leches" } },
                { "@type": "Offer", "itemOffered": { "@type": "MenuItem", "name": "Torta Panqueque" } }
              ]
            }
          })
        }}
      />
      <SeoPage
        titulo="Tortas para el Día de la Madre"
        subtitulo="Sorpréndela con algo hecho con cariño"
        descripcion="El Día de la Madre merece algo especial y artesanal. En Galdi elaboramos tortas personalizadas con los mejores ingredientes, con delivery directo en Maipú. Encarga con anticipación y asegura tu pedido."
        imagen="/images/torta-amor.webp"
        ctaTexto="Ver productos"
        ctaHref="/#productos"
        waTexto="Hola Galdi, quiero encargar una torta para el Día de la Madre 🎂💐"
        breadcrumb="Galdi · Día de la Madre"
        items={[
          {
            nombre: "Torta Amor",
            detalle: "Hojarasca, crema pastelera, frambuesas y manjar decorada con merengue. Nuestra edición especial para el Día de la Madre.",
            imagen: "/images/torta-amor.webp"
          },
          {
            nombre: "Torta 3 Leches",
            detalle: "Húmeda, esponjosa y con crema chantilly. Un clásico irresistible para mamá.",
            imagen: "/images/torta-tres-leches.webp"
          },
          {
            nombre: "Torta Panqueque",
            detalle: "Finas capas de panqueque con chocolate y frambuesa o manjar. Irresistible.",
            imagen: "/images/torta-panqueques-dia-madre.webp"
          },
        ]}
      />
    </>
  );
}
