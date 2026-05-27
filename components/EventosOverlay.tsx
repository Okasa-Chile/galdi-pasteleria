'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ServicioDetalle from './ServicioDetalle';

const servicioEventos = {
  id: 'eventos',
  nombre: 'Eventos',
  imagen: '/images/svc-eventos.webp',
};

function EventosOverlayInner() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const tabParam = searchParams.get('tab') ?? undefined;

  useEffect(() => {
    const s = searchParams.get('servicio');
    if (s === 'eventos') setOpen(true);
    else setOpen(false);
  }, [searchParams]);

  if (!open) return null;

  return (
    <ServicioDetalle
      id="eventos"
      nombre="Eventos"
      imagen="/images/svc-eventos.webp"
      initialTab={tabParam}
      onClose={() => setOpen(false)}
    />
  );
}

export default function EventosOverlay() {
  return (
    <Suspense fallback={null}>
      <EventosOverlayInner />
    </Suspense>
  );
}
