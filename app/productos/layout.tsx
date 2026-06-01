import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pasteles, Tortas y Pan Artesanal en Maipú · Galdi',
  description: 'Tortas, pasteles, pan amasado y empanadas artesanales en Maipú. Pedidos con delivery a domicilio. Encarga ahora por WhatsApp +56 9 9099 1011 o en línea en galdi.cl',
  alternates: {
    canonical: 'https://galdi.cl/productos',
  },
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
