import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pasteles, Tortas y Pan Artesanal en Maipú · Galdi',
  description: 'Compra tortas, pasteles, empanadas y pan artesanal con delivery en Maipú. Pedidos por WhatsApp. Elaboración artesanal propia, sin conservantes añadidos.',
  alternates: {
    canonical: 'https://galdi.cl/productos',
  },
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
