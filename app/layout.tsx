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
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo hago un pedido?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La forma más rápida es escribirnos por WhatsApp al +56 9 9099 1011. Cuéntanos qué necesitas, la fecha de entrega y la dirección, y te respondemos con disponibilidad y precio el mismo día. También puedes escribirnos a ventas@galdi.cl si prefieres el correo."
              }
            },
            {
              "@type": "Question",
              "name": "¿Hacen delivery? ¿A qué sectores despachan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, hacemos delivery dentro de Maipú y comunas cercanas. El pedido llega directamente a tu domicilio o lugar de evento en el horario que acordemos. Los costos y la cobertura exacta los confirmamos por WhatsApp según tu dirección."
              }
            },
            {
              "@type": "Question",
              "name": "¿Con cuánta anticipación debo hacer mi pedido?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Las tortas personalizadas requieren mínimo 5 días de anticipación. Para el resto de productos — pan, empanadas, galletas, kuchen, desayunos — con 48 horas es suficiente."
              }
            },
            {
              "@type": "Question",
              "name": "¿Pueden adaptarse a restricciones alimentarias?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, trabajamos con restricciones específicas según el pedido. Consúltanos directamente por WhatsApp: te indicamos qué productos son aptos para distintas necesidades y evaluamos si podemos preparar versiones adaptadas. Siempre es mejor avisarnos antes para coordinar los ingredientes y evitar contaminación cruzada."
              }
            },
            {
              "@type": "Question",
              "name": "¿Tienen precios especiales para eventos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Para eventos con 20 o más personas preparamos una cotización personalizada según el tipo de preparación, la cantidad y la modalidad de entrega. Escríbenos con la fecha, el número de invitados y el tipo de servicio que necesitas — coffee break, mesa dulce, cóctel, matrimonio — y te enviamos la propuesta en el día."
              }
            },
            {
              "@type": "Question",
              "name": "¿Hacen tortas para celíacos o diabéticos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Consultamos caso a caso. Para celíacos, nuestra cocina no es libre de gluten por defecto y existe riesgo de contaminación cruzada, algo que siempre informamos con honestidad. Para personas diabéticas o con restricción de azúcar, podemos preparar versiones con endulzante alternativo en varias de nuestras tortas."
              }
            },
            {
              "@type": "Question",
              "name": "¿Puedo ir a buscar el pedido o solo hacen despacho?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, puedes retirar tu pedido directamente en nuestra cocina en Maipú. Coordinas el día y la hora de retiro al momento de hacer el pedido por WhatsApp. Si prefieres que lleguemos a ti, también hacemos despacho a domicilio dentro de Maipú y comunas cercanas."
              }
            }
          ]
        })}} />
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
