import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://galdi.cl'),
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
      { url: '/images/Nuevologo.webp', type: 'image/webp' },
    ],
    apple: [
      { url: '/images/Nuevologo.webp', type: 'image/webp' },
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
      <body>{children}</body>
    </html>
  );
}
