'use client';

import Header from '@/components/Header';
import BannerDiaMadre from '@/components/BannerDiaMadre';
import Hero from '@/components/Hero';
import Catalogo from '@/components/Catalogo';
import Servicios from '@/components/Servicios';
import Nosotras from '@/components/Nosotras';
import FAQ from '@/components/FAQ';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();
  return (
    <>
      <Header />
      <BannerDiaMadre />
      <main style={{ paddingTop: '90px' }}>
      <Hero />
      <Catalogo />
      <Servicios />
      <Nosotras />
      <FAQ />
      <Contacto />
      <Footer />
      <WhatsAppFloat />
      </main>
    </>
  );
}
