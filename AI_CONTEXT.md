# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: 13 abril 2026

---

## 🏗️ Arquitectura del Proyecto

### Stack base

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Framework  | Next.js 16 + React 19 + TypeScript      |
| Estilos    | Tailwind CSS v4 + shadcn/ui             |
| Backend/DB | Firebase (Firestore + Auth + Hosting)   |
| Deploy     | Firebase Hosting (static export out/)   |
| Analytics  | Google Analytics 4 (G-LW81BNRRFP)      |

### Dos aplicaciones en un mismo proyecto

**CRÍTICO:** Dos apps conviven en el mismo repositorio:

1. **Next.js (SPA pública)** → compilada como static export a `out/` → Firebase Hosting sirve `out/`
2. **`/gestion` (vanilla HTML/JS)** → vive en `public/gestion/index.html` → se copia manualmente a `out/gestion/index.html` antes de cada deploy → Firebase Hosting lo sirve vía rewrite

⚠️ Antes de cada deploy ejecutar obligatoriamente:
cp public/gestion/index.html out/gestion/index.html

### Colecciones Firestore

| Colección          | Acceso                                    | Uso                                 |
|--------------------|-------------------------------------------|-------------------------------------|
| galdi_productos    | Solo autorizados                          | Catálogo interno con costos/tallas  |
| galdi_ventas       | Solo autorizados                          | Registro de ventas                  |
| galdi_compras      | Solo autorizados                          | Registro de compras/insumos         |
| galdi_presupuestos | Escritura: autorizados / Lectura: pública | Vista de presupuesto vía token      |

---

## 📋 Sesión 15-04-2026 — Sistema costosTalla completo + mejoras /gestion

### Cambios realizados
- **fix:** costosTalla guarda y recupera TODOS los campos por talla (mat, mdo, energía, logística, margen) — antes solo guardaba mat
- **fix:** calculadora Tab 1 — todos los inputs editables (eliminado readonly)
- **fix:** modal Editar simplificado — eliminados campos financieros (costo, energía, logística, mdo, margen); ahora solo nombre, categoría, tipo, unidad y precio combate. saveProd() preserva valores financieros existentes
- **feat:** talla XL exclusiva Torta Panqueque — mat:20000, mdo:5190, energia:400, logistica:30, margen:23, precio final ~$37.500
  - Aparece en: calculadora, badge catálogo, registro ventas, presupuestos, delivery público
- **feat:** Torta Panqueque agregada a productosDelivery en ServicioDetalle.tsx (faltaba)
- **fix:** imagen Torta Panqueque en delivery — agregada clave en objeto imagenes
- **fix:** Registro Ventas mejorado:
  - Producto muestra solo nombre (sin precio)
  - Label "Talla" → "Tamaño"
  - Eliminado selector N° de personas
  - Input cantidad achicado (max-width:80px)
  - Monto total calculado automático: cantidad × precio por talla (con fallback COSTOS_TALLA)
- **fix:** presTallaChanged() en presupuestos — actualizada a nueva estructura costosTalla {mat,mdo,energia,logistica,margen}
- **fix:** plural "docenas" marcado como resuelto en AI_CONTEXT ✅
- **fix:** COSTOS_TALLA cambiada de const a let para permitir actualizaciones en memoria

### Commits sesión
be93717 · ad1e1ff · 9b921f3 · 64ab780 · 64ab780 · e6c3aad · 60e9b74 · 4f65d0d · 6f6a7e0 · 34cbffe · dd7e028 · 778b8b6 · y otros

### Aprendizajes clave
- costosTalla debe guardar objeto completo {mat,mdo,energia,logistica,margen} por talla — no solo mat
- presTallaChanged() y calcularMonto() deben usar vals.mat, no costoTalla directamente
- Nombres de productos deben ser consistentes entre Catalogo.tsx, ServicioDetalle.tsx y gestion/index.html
- COSTOS_TALLA necesita fallback en todas las funciones que calculan precio por talla

### Pendiente actualizado
- [ ] Confirmar precios reales S/M/L con Jacqueline e Ingrid → actualizar COSTOS_TALLA
- [x] GSD descartado — viene dentro de everything-claude-code, no se puede desinstalar de forma independiente. Simplemente no usar. ✅
- [x] Favicon: actualizado src/app/favicon.ico y public/favicon.ico ✅
- [ ] Link discreto a /gestion en header
- [ ] Desactivar GitHub Pages workflow (llegan correos de error)
- [ ] Reseñas Google Business (meta: 30, ~18 al 11-04)

---

## 📋 Sesión 13-04-2026 (tarde) — Tallas S/M/L en /gestion completo

### Cambios realizados
- **Catálogo Tab 1:** badges S · M · L en filas Tortas y Pasteles & Tartas
  - Solo visuales, sin interacción
  - Fix stopPropagation: clic en badge no dispara selProd() ni modifica c-mat
- **Calculadora Tab 1:** selector "Tamaño" aparece al abrir calculadora de Torta/Pastel
  - selProd() no precarga c-mat para Tortas/Pasteles → campo vacío hasta elegir tamaño
  - Al elegir tamaño → carga COSTOS_TALLA[cat][talla] en c-mat y recalcula
  - Para Pan/Queques/etc → c-mat se carga normal desde sel.costo
- **Tab Ventas:** selector talla visible al elegir categoría Torta o Pastel
  - Monto libre, sin autocompletar
  - Historial muestra "Torta 3 Leches (M)"
- **Tab Presupuestos:** selector talla en líneas CAT para Tortas y Pasteles
  - Al elegir producto → precio unit = cpx(p) recalculado en tiempo real
  - Al elegir talla → precio recalcula: cn = COSTOS_TALLA[cat][talla] + prod.mdo + prod.energia + prod.logistica, aplica margen e IVA
  - Map global lineaProds almacena objeto prod por lineaId
  - Al eliminar línea → lineaProds.delete(lineaId)
  - Descripción guardada: "Torta Panqueque (talla L)"
  - Desplegable producto muestra solo nombre, sin precio
  - COSTOS_TALLA queda exclusivamente para calculadora del Tab Catálogo

### Constantes agregadas
- COSTOS_TALLA = { 'Tortas': {S:18000, M:25000, L:35000}, 'Pasteles & Tartas': {S:12000, M:18000, L:26000} }
  → PROVISIONALES hasta confirmación de las socias

### Aprendizajes clave
- Event bubbling: clic en badge dentro de `<tr onclick="selProd()">` dispara selProd() → siempre usar stopPropagation en elementos visuales dentro de filas clicables
- readonly en inputs bloquea escritura via JS → usar removeAttribute/setAttribute alrededor de la asignación
- cpx(p) siempre más confiable que p.precio (que puede estar desactualizado en Firestore)
- COSTOS_TALLA son costos de materiales, no precios de venta — el precio final se recalcula con cpx usando esos costos + mdo/energía/logística/margen/IVA del producto

### Pendiente futuro
- [ ] Confirmar precios reales por talla con Jaqueline e Ingrid → actualizar COSTOS_TALLA
- [ ] Integrar pedido WhatsApp con registro automático en /gestion (pedidos entrantes)

---

## 📋 Sesión 13-04-2026 — Fix ortográfico + Selector tallas tortas

### Cambios realizados
- **fix:** corrección ortográfica "Dobloditas" → "Dobladitas" en 3 lugares:
  - `components/Catalogo.tsx` línea 19 (key imagenes)
  - `components/Catalogo.tsx` línea 64 (campo nombre)
  - `components/ServicioDetalle.tsx` línea 15 (nombre + key imagenes)
- **feat:** selector de talla S/M/L en cards de Tortas (delivery)
  - Botones circulares S/M/L al lado derecho del nombre
  - Texto descriptivo debajo del botón AGREGAR:
    S = 8-10 personas · M = 14-16 personas · L = 20-22 personas
  - Sin talla seleccionada: botón deshabilitado con texto rojizo
  - Carrito con key compuesta "Torta 3 Leches · M" → permite
    misma torta en tallas distintas como entradas independientes
  - Badge dorado con talla en resumen modal
  - Mensaje WhatsApp incluye talla y rango de personas
  - Pan, Queques, Dulces, Empanadas, Pasteles → sin cambios
- Commits: fix `c50ca5a` · deploy Release complete

### Pendiente futuro anotado
- [ ] Integrar pedido WhatsApp con registro automático en /gestion
  → nueva sección "Pedidos entrantes" con estado pendiente/confirmado/entregado

### Aprendizajes clave
- Key del carrito debe ser compuesta (nombre · talla) desde el inicio
  cuando un producto tiene variantes — no se puede agregar después sin refactorizar
- `enCarrito` debe buscar por la misma key compuesta que usa AGREGAR,
  de lo contrario el contador bloquea agregar variantes del mismo producto

---

## 📋 Sesión 12-04-2026 — Tab 5 Presupuestos completo + QR + /validar-presupuesto

### Cambios realizados
- **Tab 5 Presupuestos — completado al 100%:**
  - Phase 3: guardar en Firestore (colección `galdi_presupuestos`) con token único
  - Phase 4: vista previa imprimible con logo, QR y botón PDF
  - Phase 5: historial de presupuestos con botón reimprimir
- **Fix Firestore rules:** agregadas colecciones `galdi_presupuestos` (lectura pública, escritura autorizados) y `galdi_compras` (solo autorizados)
- **QR único por presupuesto:** generado con QRCode.js, apunta a galdi.cl/validar-presupuesto?token=XXX
- **Página /validar-presupuesto:** live en galdi.cl, muestra presupuesto validado con colores Galdi
- **Vista previa mejorada:** logo oficial, web galdi.cl en encabezado, orden correcto de secciones
- **Tipo de evento reordenado:** opciones más comunes primero
- **Precio bloqueado:** al seleccionar producto del catálogo el precio queda readonly; solo editable en modo manual
- **Validaciones:** teléfono (8-9 dígitos), email (@ y punto)
- **Campos nuevos en cliente:** Dirección y Comuna (select con todas las comunas RM)
- **Sitemap:** /validar-presupuesto agregado
- **Repo limpio:** worktrees embebidos eliminados del índice git + `.claude/worktrees/` en `.gitignore`
- **Pendiente próxima sesión:** desactivar GitHub Pages workflow en repo Galdi (llegan correos de error innecesarios)

### Aprendizajes clave
- `cp public/gestion/index.html out/gestion/index.html` es obligatorio antes de cada deploy en Galdi
- Firestore rules deben desplegarse por separado: `firebase deploy --only firestore:rules`
- QRCode.js desde cdnjs funciona en ventana emergente (`win.document.getElementById`) sin necesidad de cargar la lib en el popup

---

## 📋 Sesión 11-04-2026 — Recuperación componentes + Tab 5 Presupuestos + GA4

### Cambios realizados
- **Google Analytics 4** (`G-LW81BNRRFP`) instalado en `layout.tsx` con `next/script strategy="afterInteractive"` — verificado en tiempo real
- **FAQ.tsx recuperado** — `components/FAQ.tsx` creado con 7 preguntas en acordeón, `id="preguntas-frecuentes"`
- **Header.tsx** — "Dudas Frecuentes" agregado al `navItems` (desktop + mobile)
- **Nosotras.tsx** — 6 párrafos completos restaurados
- **Tab 5 Presupuestos en `/gestion`** — Phase 1 (formulario base, correlativo COT-G077) y Phase 2 (líneas dinámicas, totales en tiempo real) completadas
- **fix:** Incidente Gemini/mex resuelto — archivos contaminados revertidos con `git restore` + `git clean`
- **chore:** worktrees de agentes eliminados del índice git
- Todos los cambios pusheados a `origin/main` (commit `c20a895`)

### Aprendizajes clave
- **GSD**: descartado para proyectos pequeños — consume demasiados tokens en ceremonias sin beneficio real para archivos HTML vanilla o proyectos de una persona. Desinstalar en próxima sesión.
- **mex**: herramienta experimental peligrosa — modifica código fuente sin permiso. No usar hasta versión estable (~2-3 meses).
- Nunca trabajar con otra IA sin hacer `git push` antes
- Nunca `git clean -fd` sin revisar `git status` primero
- Al terminar cualquier sesión: siempre `git push`

---

## 📋 Sesión 09-04-2026 — SEO y contenido

### Cambios realizados
- **Contenido SEO:** página principal pasa de ~340 a **1.001 palabras visibles** confirmadas por crawler (`curl | node`)
- **Nosotras.tsx:** expandida con 2 párrafos nuevos — arraigo en Maipú, crecimiento boca a boca, proceso artesanal e ingredientes de calidad (sin mezclas industriales)
- **FAQ.tsx:** nuevo componente con 7 preguntas frecuentes, renderizado con `max-height` CSS (no condicional con `&&`) para que crawlers indexen todas las respuestas sin JS
- **FAQ en menú:** "Dudas Frecuentes" agregado al nav entre "Nuestra Historia" y "Contacto y Delivery", anchor `#preguntas-frecuentes`
- **Schema.org FAQPage:** JSON-LD en `<head>` de `layout.tsx` como `<script>` nativo de React con `dangerouslySetInnerHTML` (Server Component — se bake en build estático)
- **FoodEstablishment:** movido de `<body>` a `<head>` junto al FAQPage
- **WhatsApp unificado:** todos los componentes usan `+56 9 9099 1011` / `56990991011`; número erróneo `+56 9 4021 1756` eliminado

### Verificaciones realizadas
- `out/index.html` inspeccionado post-build: ambos JSON-LD presentes en `<head>`
- Conteo de palabras confirmado con crawler real (`curl + node`), no estimación estática
- Build y deploy a Firebase sin errores (63 archivos nuevos subidos)

### Pendiente SEO
- [ ] **Re-análisis Seobility** — ~15-04-2026 para medir impacto de contenido nuevo
- [ ] **Rich Results Test** — validar Schema.org FAQPage en `search.google.com/test/rich-results`

---

## 🗂️ Información del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Sitio web público de Galdi Pastelería |
| **Cliente / Dueño** | Jaqueline e Ingrid Gálvez Díaz (hermanas) |
| **Ubicación** | Maipú, Chile |
| **Tipo de negocio** | Pastelería artesanal y catering |
| **Desarrollador** | Claudio (GitHub: `Okasa-Chile`) |
| **Repositorio** | `Okasa-Chile/galdi-pasteleria` (rama `main`, público) |
| **Firebase Project** | `galdi-web` (plan Spark) |
| **Firebase Site** | `galdi-web.web.app` |
| **URL Producción** | `https://galdi.cl` |
| **Stack** | Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui v4 |

---

## 🏗️ Estructura del Proyecto

```
galdi-nextjs/
  ├── app/
  │   ├── globals.css            ← variables CSS Galdi + Google Fonts
  │   ├── layout.tsx             ← RootLayout, metadata, canonical, lang="es"
  │   ├── page.tsx               ← Header + Hero + Catalogo + Servicios + Nosotras + Contacto + Footer
  │   ├── productos/             ← grid 6 categorías
  │   ├── empanadas-maipu/
  │   ├── tortas-maipu/
  │   ├── pan-artesanal-maipu/
  │   ├── delivery-maipu/
  │   ├── distribucion-maipu/
  │   ├── matrimonios-maipu/     ← página expandida 362 líneas, JSON-LD enriquecido
  │   ├── coctel-maipu/
  │   ├── cumpleanos-maipu/
  │   └── coffee-break-maipu/
  ├── components/
  │   ├── Header.tsx             ← fijo, scroll, logo, nav con anchor texts, hamburguesa, 🔒 /gestion
  │   ├── Hero.tsx               ← slideshow 6 slides 5s, dots, CTA WhatsApp, aria-labels accesibles
  │   ├── Catalogo.tsx           ← 6 tabs sticky, productos WebP, animación catFadeUp, role="tablist"
  │   ├── Servicios.tsx          ← 3 cards hover, ServiciosInner + Suspense + useSearchParams
  │   ├── ServicioDetalle.tsx    ← overlay full screen; Almacenes + Delivery + Eventos con carrito
  │   ├── Nosotras.tsx           ← ~250 palabras SEO, keywords integradas, scroll reveal
  │   ├── Contacto.tsx           ← botón WhatsApp + ventas@galdi.cl + QR
  │   ├── WhatsAppFloat.tsx      ← botón flotante verde
  │   ├── SeoPage.tsx            ← componente base páginas SEO
  │   └── Footer.tsx             ← logo + copyright + desplegable Links (10 páginas SEO)
  ├── public/
  │   ├── images/                ← todas las imágenes WebP
  │   ├── gestion/index.html     ← panel interno (auth Google + Firestore + gestión + selector personas)
  │   ├── sitemap.xml            ← 11 URLs
  │   └── robots.txt
  ├── firebase.json
  ├── next.config.ts
  └── AI_CONTEXT.md
```

---

## 🔜 Pendiente

### Gestión (/gestion)
- [ ] **Tab 5 Presupuestos — Phases 3-5** — Phase 3 (Firestore), Phase 4 (Vista Previa + PDF), Phase 5 (Historial); ejecutar con prompt directo sin GSD
- [ ] **Precios tortas por N° personas** — confirmar con socias y actualizar constante `PRECIOS_TORTA` en `gestion/index.html` (selector ya implementado, precios son provisionales)
- [ ] **Cupones de descuento** — prompt `.txt` ya generado, listo para ejecutar en Claude Code
- [x] **Plural "docenas"** — carrito: "2 docena" → "2 docenas" ✅ resuelto 15-04-2026
- [ ] **Desinstalar GSD de Claude Code** — descartado para proyectos pequeños

### SEO / Marketing
- [ ] **Reseñas Google Business** — meta: 30 reseñas (hoy: ~18 al 11-04-2026)
- [ ] **Conecta Pyme** — listing enviado, esperando aprobación
- [ ] **Métodos de pago en GBP** — espera terminal tarjetas (fines de abril 2026)
- [ ] **Re-análisis Seobility** — esperar hasta ~15-04-2026 para medir impacto del contenido SEO agregado
- [ ] **Rich Results Test** — validar FAQPage en search.google.com/test/rich-results con URL galdi.cl
- [ ] **Schema.org reviews strategy Okasa** — Google Business

### Trámites externos
- [ ] **Estatuto societario Galdi** — actualización societaria pendiente (trámite externo)
- [ ] **Banco de Chile** — respuesta pendiente a contacto@okasa.cl

### Okasa (paralelo)
- [ ] **Fix admin login Okasa** — signInWithPopup + URI autorizada
- [ ] **Blog post Okasa** — "inspección vivienda usada" (SEO)

---

## 📦 Catálogo de Productos

### 🍞 Pan Artesanal
Pan Amasado · Tortilla con Chicharrones · Pan Integral · Pan Frica · Dobladitas · Marraqueta

### 🎂 Pasteles & Tartas
Pie de Limón Merengado · Kuchen Sureño · Kuchen de Nuez · Banofee · Tartaletas

### 🍰 Tortas
3 Leches · Chocolate · Moka · Selva Negra · Piña · Hojarasca · Panqueque · Pavé

### 🍪 Dulces & Alfajores
Alfajores de Maicena · Alfajores de Manjar · Alfajores de Chocolate · Chilenitos · Berlines · Pasteles Rectangulares

### 🥐 Queques & Muffins
Queque de Naranja · Queque Mármol · Queque de Yogurt · Muffins

### 🥟 Empanadas (venta por docena en Almacenes, mín. 4 un. en Delivery)
Pino · Napolitana · Vegetariana (queso champiñón) · Queso Camarón · Empanada de Mariscos

---

## 🖼️ Imágenes activas en `public/images/`

| Archivo | Uso |
|---|---|
| `logo-ancho.webp` | Header, Footer |
| `Nuevologo.webp` | Favicon, /gestion |
| `og-galdi.webp` | Open Graph |
| `New_Hero_socias.webp` | Hero slide 1 |
| `SlideshowPanes.webp` | Hero slide 2 |
| `prod-dulces.webp` | Hero slide 3 / Nosotras |
| `prod-pie.webp` | Hero slide 4 |
| `prod-empanada.webp` | Hero slide 5 |
| `Reparto.webp` | Hero slide 6 |
| `pan-amasado-new.webp` | Catálogo Pan |
| `Tortilla de Chicharrones.webp` | Catálogo Pan |
| `Pan integral.webp` | Catálogo Pan |
| `Pan Frica.webp` | Catálogo Pan |
| `Dobladitas.webp` | Catálogo Pan |
| `Marraquetas.webp` | Catálogo Pan |
| `Banofee.webp` | Catálogo Pasteles |
| `Berlines.webp` | Catálogo Dulces |
| `Kuchen de Nueces.webp` | Catálogo Pasteles |
| `Kuchen sureño.webp` | Catálogo Pasteles |
| `Tartaletas.webp` | Catálogo Pasteles |
| `Torta 3 Leches.webp` | Catálogo Tortas |
| `Torta Moka.webp` | Catálogo Tortas |
| `Torta Selva negra.webp` | Catálogo Tortas |
| `Torta de Chocolate.webp` | Catálogo Tortas |
| `Torta de Hojarasca.webp` | Catálogo Tortas |
| `Torta de Piña.webp` | Catálogo Tortas |
| `qr-whatsapp.png` | Contacto — QR |
| `svc-b2b.webp` | Servicios — Distribución |
| `svc-eventos.webp` | Servicios — Eventos |
| `svc-delivery.webp` | Servicios — Delivery |
| `Socias.webp` / `Socias_lapiz.webp` | Nosotras |
| `Corporativo.webp` | Eventos — Corporativos |
| `eventos-matrimonio.webp` | Eventos — Matrimonios |
| `eventos-coctel.webp` | Eventos — Cóctel |
| `eventos-cumpleanos.webp` | Eventos — Cumpleaños |
| `eventos/` | 18 fotos reales matrimonios + 10 cóctel + 10 cumpleaños + 10 corporativos |

---

## 🛠️ Decisiones Técnicas

### Next.js + Firebase Hosting (exportación estática)
```ts
// next.config.ts
output: "export"
images: { unoptimized: true }
```
```json
// firebase.json
{ "public": "out", "cleanUrls": true, "trailingSlash": false }
```
> Cada vez que se modifique `public/gestion/index.html`, copiar a `out/gestion/index.html` antes del deploy.

### Panel /gestion
- Auth Google (signInWithPopup) — emails autorizados: contacto@okasa.cl, ventas@galdi.cl, iaclaudioferrari@gmail.com, ingridgalvezd@gmail.com, jacquelinegalvezd@gmail.com
- Firestore: colecciones `galdi_productos` y `galdi_ventas`
- API key restringida a dominios galdi.cl, galdi-web.web.app, localhost
- Reglas Firestore restringidas a los 5 emails autorizados

### Carrito de pedidos — Mínimos
| Contexto | Producto | Mínimo |
|---|---|---|
| Almacenes | Pan (por producto) | 3 kg |
| Almacenes | Pan (total pedido) | 9 kg acumulados |
| Almacenes | Tortilla con Chicharrones | 2 unidades |
| Almacenes | Queques | 2 unidades |
| Almacenes | Muffins / Dulces / Empanadas | 1 docena |
| Delivery | Todos los productos | 1 unidad |
| Delivery | Empanadas | mín. 4 unidades |

### URL params para apertura directa de servicios
`?servicio=eventos&tab=Matrimonios` → abre overlay y selecciona tab directamente

### Catálogo — Bug re-render resuelto
`key={activeTab}` en el wrapper exterior del panel + `<Image fill>` de `next/image` en lugar de `background-image`.

### CSS Pseudo-elementos en React
`::after` y `::before` no se pueden aplicar con inline styles → usar `<style>` tag interno en el componente.

---

## 🧰 Plugins Claude Code

| Plugin | Descripción |
|---|---|
| **Superpowers** | Brainstorming, sub-agentes paralelos, TDD, code review |
| **Everything Claude Code** | 75+ skills especializados |
| **GSD** | ~~Meta-prompting~~ — **descartado** (demasiado ceremonial para proyectos pequeños, desinstalar) |
| **addyosmani/agent-skills** | 21 skills + 7 comandos slash: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship` |

---

## 📞 Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp** | +56 9 9099 1011 (wa.me/56990991011) |
| **Email** | ventas@galdi.cl |
| **Ubicación** | Maipú, Región Metropolitana, Chile |
| **RUT empresa** | 78.378.827-6 (COMERCIALIZADORA Y DISTRIBUIDORA GALDI SpA) |

---

## 📝 Notas Permanentes

- **Estilo de trabajo**: confirmaciones breves ("ya", "listo") → Claude pregunta si el contexto es ambiguo antes de actuar
- **Paleta Galdi**: café oscuro `#1a0f0a` · crema `#f5e6d3` · dorado `#d4a853` · terracota `#c4704f`
- **Fuentes**: Cormorant Garamond (títulos) + Jost (cuerpo)
- **shadcn/ui v4**: usar `npx shadcn@latest init --defaults` (preset base-nova)
- **Aprendizaje clave**: edición de Excel con openpyxl es frágil — preferir sistema de cotizaciones propio en Tab 6 de /gestion
