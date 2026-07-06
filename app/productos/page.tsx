'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicioDetalle from '@/components/ServicioDetalle';

export default function ProductosPage() {
  return (
    <>
      <Header />
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        Pasteles, Tortas y Pan Artesanal en Maipú — Galdi Pastelería
      </h1>
      <main>
        <ServicioDetalle
          id="delivery"
          nombre="Nuestros Productos"
          imagen="/images/svc-delivery.webp"
          pageMode={true}
          onClose={() => {}}
        />
      </main>
      <Footer />
    </>
  );
}
