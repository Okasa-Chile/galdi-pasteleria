'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicioDetalle from '@/components/ServicioDetalle';

export default function ProductosPage() {
  return (
    <>
      <Header />
      <ServicioDetalle
        id="delivery"
        nombre="Nuestros Productos"
        imagen="/images/svc-delivery.webp"
        pageMode={true}
        onClose={() => {}}
      />
      <Footer />
    </>
  );
}
