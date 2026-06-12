import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pasteles, Tortas y Pan Artesanal en Maipú · Galdi',
  description: 'Compra tortas, pasteles, empanadas y pan artesanal con delivery en Maipú. Pedidos por WhatsApp. Elaborados sin conservantes, frescos el mismo día.',
  alternates: {
    canonical: 'https://galdi.cl/productos',
  },
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
