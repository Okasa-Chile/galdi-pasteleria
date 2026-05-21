import type { Metadata } from 'next';
import ArmaTuTorta from '@/components/ArmaTuTorta';

export const metadata: Metadata = {
  title: 'Arma tu Torta | Galdi Pastelería Artesanal Maipú',
  description: 'Diseña tu torta ideal: elige base, relleno, decoración y tamaño. Tortas artesanales por encargo con delivery en Maipú. Cotiza por WhatsApp.',
  keywords: 'torta personalizada maipú, arma tu torta maipú, torta a medida maipú, torta por encargo maipú',
  alternates: { canonical: 'https://galdi.cl/arma-tu-torta' },
  openGraph: {
    title: 'Arma tu Torta | Galdi Pastelería',
    description: 'Diseña tu torta ideal eligiendo base, relleno, decoración y tamaño. Hecho con cariño en Maipú.',
    url: 'https://galdi.cl/arma-tu-torta',
    images: [{ url: 'https://galdi.cl/images/og-galdi.webp', width: 1200, height: 630 }],
  },
};

export default function ArmaTuTortaPage() {
  return (
    <main style={{ background: '#fdf6ee', minHeight: '100vh' }}>
      <ArmaTuTorta />
    </main>
  );
}
