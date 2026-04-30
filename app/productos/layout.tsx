import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://galdi.cl/productos',
  },
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
