import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="es" className="light">
      <head>
        <meta name="color-scheme" content="light only" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Bakery", "LocalBusiness"],
          "name": "Galdi SPA - Pastelería, Panadería, Eventos",
          "description": "Pastelería y panadería artesanal en Maipú. Tortas, pan amasado, empanadas y banquetería para eventos. Delivery en Maipú y Gran Santiago.",
          "url": "https://galdi.cl",
          "telephone": "+56990991011",
          "email": "ventas@galdi.cl",
          "priceRange": "$$",
          "servesCuisine": "Pastelería Artesanal Chilena",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pasaje Marcos Echenique N° 809",
            "addressLocality": "Las Palmas, Maipú",
            "addressRegion": "Región Metropolitana",
            "postalCode": "9293891",
            "addressCountry": "CL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -33.4776144,
            "longitude": -70.7521309
          },
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "54",
            "bestRating": "5",
            "worstRating": "1"
          },
          "sameAs": [
            "https://www.instagram.com/galdi_banqueteria/",
            "https://www.google.com/maps?cid=15591011647306482666"
          ],
          "areaServed": ["Maipú","Cerrillos","Pudahuel","Estación Central","Padre Hurtado","Lo Prado"]
        })}} />
      </head>
      <body>
        {children}
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LW81BNRRFP"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LW81BNRRFP');
        `}
      </Script>
    </html>
  );
}
