import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://galdi.cl'),
  alternates: {
    canonical: 'https://galdi.cl',
  },
  title: 'Galdi — Pastelería Artesanal en Maipú',
  description: 'Pastelería artesanal en Maipú. Tortas, pasteles, pan y empanadas hechos con cariño. Distribución a almacenes, eventos y delivery en toda la comuna.',
  keywords: 'pastelería artesanal Maipú, panadería artesanal Maipú, panadería Maipú, tortas Maipú, pan amasado Maipú, empanadas Maipú, banquetería Maipú, matrimonios Maipú, cóctel Maipú, coffee break Maipú, eventos Maipú, eventos colegio Maipú, pan de pascua Maipú, cajas fiestas patrias, cajas navidad Maipú, delivery pasteles Maipú, distribución almacenes, queques artesanales, brunch Maipú',
  openGraph: {
    title: 'Galdi — Pastelería Artesanal en Maipú',
    description: 'Pastelería artesanal en Maipú. Tortas, pasteles, pan y empanadas hechos con cariño. Distribución a almacenes, eventos y delivery.',
    url: 'https://galdi.cl',
    siteName: 'Galdi Pastelería',
    images: [
      {
        url: '/images/og-galdi.webp',
        width: 1200,
        height: 630,
        alt: 'Galdi — Pastelería Artesanal en Maipú',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galdi — Pastelería Artesanal en Maipú',
    description: 'Pastelería artesanal en Maipú. Tortas, pasteles, pan y empanadas hechos con cariño.',
    images: ['/images/og-galdi.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          "name": "Galdi Pastelería Artesanal",
          "description": "Pastelería artesanal en Maipú. Tortas, pasteles, pan y empanadas hechos con cariño. Distribución a almacenes, eventos y delivery en toda la comuna.",
          "url": "https://galdi.cl",
          "telephone": "+56990991011",
          "email": "ventas@galdi.cl",
          "address": { "@type": "PostalAddress", "streetAddress": "Pasaje Marcos Echenique 809", "addressLocality": "Maipú", "addressRegion": "Región Metropolitana", "addressCountry": "CL" },
          "servesCuisine": "Chilean",
          "areaServed": "Maipú",
          "sameAs": "https://share.google/s9CQErdNSBOZ8y15P",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Productos Galdi",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Empanadas artesanales" } },
              { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Tortas por encargo" } },
              { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Pan artesanal" } },
              { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Delivery Maipú" } },
              { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Banquetería eventos" } }
            ]
          }
        })}} />
        {children}
      </body>
    </html>
  );
}
