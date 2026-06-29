This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Jornada 30-04-2026

**Completado:**
- ✅ fix: 9 canonicals SEO agregados a páginas sin ellos (tortas, empanadas, pan-artesanal, delivery, distribucion, coctel, cumpleanos, coffee-break, productos) — commit c03bb9a
- ✅ feat: app/productos/layout.tsx creado con canonical https://galdi.cl/productos
- ✅ feat: app/validar-presupuesto/layout.tsx creado con robots noindex/nofollow
- ✅ seo: "Las Palmas" agregado en Footer.tsx y Nosotras.tsx — commit 7c1030b
- ✅ seo: meta descriptions CTR mejoradas en /matrimonios-maipu y /empanadas-maipu — commit f47c50e

**Search Console (28 días a 30-04-2026):**
- Clics: 30 · Impresiones: 1.270 · CTR: 2,4% · Posición media: 8,7
- Sitio con ~1,5 meses de vida · 172 consultas distintas
- Keywords con mayor potencial: banquetes maipú (29 imp), torta bodas maipú (27 imp), pastelerías en maipu (13 imp)
- Tendencia impresiones: despegue notable desde 13-04-2026 (5x en 2 semanas)

**Pendiente próxima sesión:**
- Revisar resultados Search Console en 2-3 semanas
- Reseñas Google Business: **53 reseñas, todas ⭐⭐⭐⭐⭐** (meta de 50 superada ✅)
- Posición media actual: 8,7 — objetivo bajar a 5-6

_Última actualización: 12 de mayo, 2026_

### Rutas locales
- Galdi: C:\OKasa\Web\galdi-nextjs
- Okasa: C:\OKasa\Web\okasa-proyecto

## Advertencias de desarrollo

**Banner/AnnouncementBar:** El texto del banner superior NO está en `BannerDiaMadre.tsx` — está hardcodeado en `components/Header.tsx` línea ~116. Siempre modificar `Header.tsx` para cambiar el texto del banner de producción.

## Jornada 24-06-2026

### Cambios realizados

#### Eliminación referencias Día del Padre
- Removida franja Día del Padre de `components/Header.tsx` (bloque background #c4704f con link a /dia-del-padre)
- Removido bloque completo de `components/BannerDiaMadre.tsx`
- Removida sección "Bloque Día del Padre" de `app/page.tsx`

#### Catálogo galdi_productos — 21 productos nuevos
Productos agregados sin tocar existentes (costos en 0, solo precio de venta):

**Cóctel Salado** (12 productos, unidad: 'unidad'):
- Mechada Premium $700 · Mechada Clásica $650 · Mechada Tradicional $600
- Brochetas Mixtas $800 · Empanadas Cóctel $650 · Brochetas de Camarón $600
- Mini Pizzas $600 · Brochetas Serrano $550 · Bolitas de Carne/Cucharitas Ceviche $500
- Canapés Surtidos $450 · Brochetas Frescas $400 · Sopaipillitas con Pebre $300

**Cóctel Dulce** (5 productos, unidad: 'unidad'):
- Cheesecake $470 · Pastelitos Surtidos $450 · Muffins Surtidos Cóctel $450
- Brochetas de Frutas $400 · Galletas Artesanales $350

**Tablas** (4 productos, unidad: 'unidad'):
- Tabla Tradicional 5p $28.900 · Tabla Tradicional 10p $48.900
- Tabla Carnes y Picoteo 5p $42.900 · Tabla Carnes y Picoteo 10p $69.900

Nota: precios originales del PDF Lista de Precios 2026 estaban "por ciento" — se convirtieron a precio unitario para permitir cotizaciones flexibles (50, 75, 120 unidades).

#### Fix cotizaciones — bug $36
Problema: productos nuevos con `costo:0` mostraban precio $36 en cotizaciones porque:
1. `fsLoad()` sobreescribía `logistica:0` con `30` (`Number(p.logistica) || 30`)
2. Dropdown usaba `cpx(p)` ignorando el `precio` ya guardado en Firestore
3. Cálculo: `(0+0+30+0) * 1.19 = $35.7 ≈ $36`

Fix aplicado en `public/gestion/index.html`:
- `p.logistica = p.logistica !== undefined ? Number(p.logistica) : 30` (respeta 0 explícito)
- Dropdown: `value="' + (p.precio || cpx(p)) + '"` (usa precio guardado, fallback a cpx)

### Aprendizajes
- Productos sin estructura de costos (solo precio de venta) son válidos para acelerar cotizaciones
- `Number(x) || default` falla cuando x es 0 — usar `x !== undefined ? Number(x) : default`
- Lista de Precios PDF (para clientes) debe sincronizarse con galdi_productos (fuente de verdad)

## Jornada 24-06-2026

**Completado:**
- ✅ 21 productos nuevos cargados en Firestore (galdi_productos):
  - 12 productos Cóctel Salado
  - 5 productos Cóctel Dulce
  - 4 Tablas
  - Solo precio de venta (sin costo). Cóctel se vende por unidad.
- ✅ fix: Bug $36 corregido en public/gestion/index.html
  - logística respeta valor 0 explícito
  - dropdown usa p.precio con fallback a cpx(p)
- ✅ Integración Flow.cl confirmada operativa end-to-end
