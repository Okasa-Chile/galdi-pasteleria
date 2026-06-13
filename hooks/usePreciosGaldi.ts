'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface PrecioProducto {
  nombre: string;
  precio: number;
  precioS?: number;
  precioM?: number;
  precioL?: number;
  precioXL?: number;
  unidad: string;
}

export function usePreciosGaldi() {
  const [precios, setPrecios] = useState<Record<string, PrecioProducto>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'galdi_productos'))
      .then(snap => {
        const mapa: Record<string, PrecioProducto> = {};
        snap.docs.forEach(d => {
          const p = d.data();
          mapa[p.nombre] = {
            nombre: p.nombre,
            precio: Number(p.precio) || 0,
            precioS: Number(p.precioS) || undefined,
            precioM: Number(p.precioM) || undefined,
            precioL: Number(p.precioL) || undefined,
            precioXL: Number(p.precioXL) || undefined,
            unidad: p.unidad,
          };
        });
        setPrecios(mapa);
      })
      .finally(() => setLoading(false));
  }, []);

  return { precios, loading };
}
