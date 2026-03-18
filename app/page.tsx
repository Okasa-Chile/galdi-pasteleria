import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Catalogo from '@/components/Catalogo';
import Servicios from '@/components/Servicios';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Catalogo />
      <Servicios />
    </main>
  );
}
