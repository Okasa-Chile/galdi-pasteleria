import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galdi — Gozo en cada bocado",
  description: "Galdi — Pastelería artesanal, banquetería y distribución B2B en Maipú, Chile. Gozo en cada bocado.",
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
