# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: 27 mayo 2026

---

## 🗂️ Información del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Sitio web público de Galdi Pastelería |
| **Cliente / Dueño** | Jacqueline e Ingrid Gálvez Díaz (hermanas) |
| **Ubicación** | Maipú, Chile |
| **Tipo de negocio** | Pastelería artesanal y catering |
| **Desarrollador** | Claudio (GitHub: `Okasa-Chile`) |
| **Repositorio** | `Okasa-Chile/galdi-pasteleria` (rama `main`, público) |
| **Firebase Project** | `galdi-web` (plan Blaze) |
| **Firebase Site** | `galdi-web.web.app` |
| **URL Producción** | `https://galdi.cl` |
| **Stack** | Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui v4 |

---

## 🏗️ Arquitectura del Proyecto

### Stack base

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 + React 19 + TypeScript |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| Backend/DB | Firebase (Firestore + Auth + Hosting) |
| Deploy | Firebase Hosting (static export out/) |
| Analytics | Google Analytics 4 (G-LW81BNRRFP) |

### Dos aplicaciones en un mismo repositorio

**CRÍTICO:** Dos apps conviven en el mismo repositorio:

1. **Next.js (SPA pública)** → compilada como static export a `out/` → Firebase Hosting sirve `out/`
2. **`/gestion` (vanilla HTML/JS)** → vive en `public/gestion/index.html` → se copia manualmente a `out/gestion/index.html` antes de cada deploy → Firebase Hosting lo sirve vía rewrite

⚠️ Antes de cada deploy ejecutar obligatoriamente:
```
cp public/gestion/index.html out/gestion/index.html
```

### Deploy pattern Galdi
```
npm run build
cp public/gestion/index.html out/gestion/index.html
firebase deploy --only hosting
git add . && git commit -m "mensaje" && git push
```

### Colecciones Firestore

| Colección | Acceso | Uso |
|---|---|---|
| galdi_productos | Solo autorizados | Catálogo interno con costos/tallas |
| galdi_ventas | Solo autorizados | Registro de ventas |
| galdi_compras | Solo autorizados | Registro de compras/insumos |
| galdi_presupuestos | Escritura: autorizados / Lectura: pública | Vista de presupuesto vía token |

### Auth Firebase — emails autorizados
- contacto@okasa.cl
- ventas@galdi.cl
- iaclaudioferrari@gmail.com
- ingridgalvezd@gmail.com
- jacquelinegalvezd@gmail.com

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
  │   ├── matrimonios-maipu/     ← página expandida, JSON-LD enriquecido
  │   ├── coctel-maipu/
  │   ├── cumpleanos-maipu/
  │   └── coffee-break-maipu/
  ├── components/
  │   ├── Header.tsx             ← fijo, scroll, logo, nav, hamburguesa, 🔒 /gestion discreto
  │   ├── Hero.tsx               ← slideshow 6 slides
  │   ├── Catalogo.tsx           ← grid productos con tallas S/M/L
  │   ├── ServicioDetalle.tsx    ← overlay servicios con tabs
  │   ├── FAQ.tsx                ← acordeón, id="preguntas-frecuentes"
  │   ├── Nosotras.tsx
  │   └── Footer.tsx
  ├── public/
  │   ├── gestion/
  │   │   └── index.html         ← Panel gestión (CRÍTICO: copiar a out/ antes de deploy)
  │   └── images/                ← WebP optimizadas (max 80KB, quality 75→60)
  └── _src/
      └── gestion-index.html     ← Copia para que Claude pueda leer via project knowledge
```

---

## 📦 Estado actual del sitio público

### SEO
- Seobility score: **92%** (medido 15-04-2026)
- Rich Results Test: **3 elementos válidos** (FAQPage, Empresas locales, Organización)
- Google Search Console: sin errores críticos
- Sitemap y robots.txt activos
- GA4 activo (G-LW81BNRRFP)
- 10+ landing pages SEO con JSON-LD

### Google Business Profile
- Reseñas actuales: **54** (todas ⭐⭐⭐⭐⭐) · Meta: **100** 🎯 en progreso
- Áreas de servicio: Maipú, Cerrillos, Pudahuel
- Descripción optimizada · Menu link → galdi.cl/productos

---

## 🛠️ Panel /gestion — Estado actual

### Tabs implementados
| Tab | Estado | Descripción |
|---|---|---|
| Tab 1 | ✅ | Calculadora de costos con costosTalla S/M/L |
| Tab 2 | ✅ | Catálogo de productos con selector tallas |
| Tab 3 | ✅ | Registro de compras/insumos |
| Tab 4 | ✅ | Registro de ventas |
| Tab 5 | ✅ | Presupuestos con QR + /validar-presupuesto |

### Características clave
- Correlativo presupuestos: COT-G081+
- QR único por presupuesto → galdi.cl/validar-presupuesto?token=XXX
- COSTOS_TALLA: estructura {mat, mdo, energia, logistica, margen} por talla
- Key del carrito compuesta: `nombre·talla`
- Talla XL exclusiva para Torta Panqueque
- `cumpleanosSlides`: 8 slides (antes 10) — imágenes cumpleanos01-08.webp renovadas
- `SeoPage.tsx`: incluye logo con link a `/` en el hero (afecta todas las páginas SEO)

---

## 📝 Notas Permanentes

- **Estilo de trabajo**: confirmaciones breves ("ya", "listo") → Claude pregunta si el contexto es ambiguo antes de actuar
- **Paleta Galdi**: café oscuro `#1a0f0a` · crema `#f5e6d3` · dorado `#d4a853` · terracota `#c4704f`
- **Fuentes**: Cormorant Garamond (títulos) + Jost (cuerpo)
- **shadcn/ui v4**: usar `npx shadcn@latest init --defaults`
- **Favicon**: `src/app/favicon.ico` siempre overrides `public/favicon.ico` — ambos deben actualizarse
- **Firebase Hosting es case-sensitive** (Linux) — nombres de archivo deben coincidir exactamente
- **GSD descartado** — viene dentro de everything-claude-code, simplemente no usar
- **mex descartado** — herramienta experimental peligrosa, no usar
- **openpyxl no usar** para editar cotizaciones con cambios estructurales — usar /gestion Tab 5
- **Gemini (otro AI)**: siempre hacer git push antes de trabajar con otro AI para evitar contaminación de archivos
- **PowerShell**: no usar && para encadenar comandos — ejecutar secuencialmente

---

## 🧰 Herramientas CC instaladas

| Herramienta | Estado |
|---|---|
| Repomix | ✅ Instalado · `.repomixignore` reduce tokens ~76% |
| Corey Haines Marketing Skills | ✅ 34 skills en `.claude/skills` |
| product-marketing-context.md | ✅ Contexto Galdi brand/SEO/marketing |
| Everything Claude Code | ✅ 75+ skills |
| addyosmani/agent-skills | ✅ 21 skills + 7 comandos slash |

---

## 🔜 Pendientes

### Técnicos
- [ ] **Sistema cupones/descuentos** — prompt `.txt` preparado, no ejecutado aún
- [ ] **Integración WhatsApp → /gestion** — pedidos entrantes con estado pendiente/confirmado/entregado (futuro)
- [ ] **QR en PDF usando SVG en vez de canvas**
- [ ] **Agenda de clientes en /gestion**
- [x] **Funcionalidad edición presupuestos Tab 5** — botón Editar, Actualizar, Cancelar edición
- [ ] **Carrito de compras con pago Flow** — aprobado por socias 25-05-2026. Despacho: $3.000 cercanas / $5.000 lejanas. Comunas cercanas: Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado, Lo Prado. Retiro gratis en Maipú. Pago 100% anticipado.
- [ ] **Precios catálogo público** — pendiente confirmación (estimado 26-05-2026)
- [ ] **Crear cuenta Flow** — pendiente. Puede demorar 1-3 días hábiles en verificar.
- [ ] **POS TUU** — en proceso de compra por Claudio

### Administrativos / Externos
- [ ] **Estatuto societario Galdi** — modificación portal RES en curso:
  - Paso 3: subir documentos (acta notaría Repertorio 494 + cert. vigencia)
  - Paso 4: firmas Jacqueline (ClaveÚnica) + Ingrid + Notario ($15.000)
  - Notaría: Marco Francisco Urenda Bilicic · Av. Pajaritos 4500 · Santiago
- [ ] **Presupuesto matrimonio** — esperar consulta a Jacqueline sobre precios actualizados

### Marketing
- ✅ **Reseñas Google Business** — 54/50 · todas ⭐⭐⭐⭐⭐ (meta superada)

---

## 📞 Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp** | +56 9 9099 1011 (wa.me/56990991011) |
| **Email** | ventas@galdi.cl |
| **Ubicación** | Pasaje Marcos Echenique N° 809, Las Palmas, Maipú |
| **Código postal** | 9293891 |
| **RUT empresa** | 78.378.827-6 (COMERCIALIZADORA Y DISTRIBUIDORA GALDI SpA) |
| **Instagram** | @galdi_banqueteria |

---

## 📋 Historial de jornadas (resumen)

- **25-05-2026** — Reunión socias: aprobado carrito de compras con pago online vía Flow · Método de pago físico TUU (POS en proceso de compra) · Despacho Gran Santiago: $3.000 zonas cercanas (Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado, Lo Prado) / $5.000 zonas lejanas (resto Gran Santiago) · Retiro gratis en Maipú · Pago online 100% anticipado · Pendiente: precios catálogo (mañana) · Pendiente: crear cuenta Flow
- **21-05-2026 (tarde)** — Investigación dark mode móvil en /arma-tu-torta: problema confirmado exclusivo de Brave con "darken websites" activado (intercepta a nivel GPU, no superable desde CSS). Firefox se resuelve activando modo claro. globals.css revertido a versión limpia con color-scheme: light. Sin solución viable desde código.
- **21-05-2026** — fix: flores decorativas bloque "Arma tu Torta" en homepage — fondo transparente con Pillow (umbral R>200/G>190/B>185) + tamaño aumentado 160px→220px · fix: arma-tu-torta/page.tsx móvil — hero overlay suavizado + grid 2 columnas + LCP priority imagen base-panqueque.webp
- **02-05-2026** — SEO: landing /dia-de-la-madre mejorada (keywords, FAQ schema, delivery RM) · Bloque SEO Día de la Madre agregado en homepage entre Nosotras y FAQ · Indexación solicitada en Search Console · Tab 5: funcionalidad de edición de presupuestos guardados (botón Editar, Actualizar, Cancelar edición) · QR eliminado de plantillas de impresión (problema canvas en PDF) · COT-G079 Cóctel Sebastián del Valle $350.000 · COT-G080 Rincón Dulce Sebastián del Valle $247.500 · COT-G081 lista de precios Excel generada para envío por email
- **29-04-2026** — Logo Galdi (link a /) agregado en hero de SeoPage.tsx (afecta todas las páginas SEO) · Logo agregado en hero de matrimonios-maipu/page.tsx · Carrusel cumpleaños renovado: 8 imágenes nuevas WebP 16:9 (cumpleanos01-08.webp)
- **28-04-2026** — Apertura de Libro Galdi (CVE: RA6HY4w4AgG2) · Modificación estatuto iniciada en portal RES · Acta protocolizada Notaría Urenda (Repertorio 494) · Prompts marketing pan chicharrones y empanadas
- **24-04-2026** — Link discreto /gestion en header implementado ✅
- **15-04-2026** — costosTalla completo (todos los campos por talla) · calculadora inputs editables · modal Editar simplificado · talla XL Torta Panqueque
- **13-04-2026** — Cierre sesión · favicon fix · GitHub Pages desactivado · banner fin de semana
- **12-04-2026** — Tab 5 Presupuestos 100% · QR · /validar-presupuesto · Firestore rules
- **11-04-2026** — GA4 instalado · FAQ.tsx · Tab 5 Phase 1+2 · fix incidente Gemini/mex
- **20-05-2026** — Nueva página /arma-tu-torta · configurador paso a paso · links en catálogo, delivery, header y footer · sección promocional en home · imagen torta-personalizada.webp
- **01-04-2026** — Seobility 92% · Rich Results validado

---

## Sesión 20-05-2026: Arma tu Torta + Fixes

### Cambios realizados

#### Nueva página /arma-tu-torta
- Creado `app/arma-tu-torta/page.tsx` — ruta pública con metadata SEO
- Creado `components/ArmaTuTorta.tsx` — configurador paso a paso con:
  - Paso 1: Elección de base (Bizcocho, Hojarasca, Panqueque)
  - Paso 2: Elección de relleno — selección múltiple hasta 3
  - Paso 3: Elección de decoración — selección múltiple hasta 2
  - Paso 4: Elección de tamaño (S/M/L/XL)
  - Resumen final con CTA WhatsApp con mensaje pre-llenado
- Diseño femenino pastel: fondo crema #fdf6ee, acentos rosa #f2c4ce y durazno #f7dcc8
- Ilustraciones botánicas hand-drawn en cards (18 imágenes en public/images/arma-tu-torta/)
- Flores decorativas integradas (4 archivos en public/images/arma-tu-torta/)
- Card "Arma tu Torta" agregada en Catalogo.tsx con link a /arma-tu-torta
- Card "Arma tu Torta" agregada en ServicioDetalle.tsx delivery con link a /arma-tu-torta
- Link "Arma tu Torta" agregado en Header.tsx entre Productos y Servicios
- Link "Arma tu Torta" agregado en Footer.tsx sección links SEO
- Sección promocional en app/page.tsx reemplaza bloque Día de la Madre
- Imagen torta-personalizada.webp en public/images/

#### Fix imagen Torta Amor
- Corregido components/Catalogo.tsx: Torta Amor apuntaba a torta-amor-hero.webp (torta de chocolate)
- Ahora apunta correctamente a torta-amor.webp (hojarasca con merengue)

#### Fix forma de pago Okasa
- Actualizado COT-001-Ajustado.xlsx celda A30: forma de pago 50% al reservar / 50% al recibir informe
- Actualizado scripts/generar_cotizacion.py: columna D ahora muestra % de descuento
- COT-016 regenerada con descuento 10% aplicado y visible para cliente Alexandre Sanchez Wadie

### Imágenes nuevas
- public/images/arma-tu-torta/ — 18 ilustraciones botánicas WebP + 4 flores decorativas
- public/images/torta-personalizada.webp — imagen card Arma tu Torta

#### SEO — Mejora de snippets
- Mejorados title y description de 4 páginas con 0 clics en Search Console:
  - app/empanadas-maipu/page.tsx
  - app/matrimonios-maipu/page.tsx
  - app/distribucion-maipu/page.tsx
  - app/pan-artesanal-maipu/page.tsx
- Títulos actualizados con formato: Keyword Principal · Diferenciador · Galdi
- Descripciones con llamado a la acción directo
- URLs enviadas a indexación manual en Google Search Console

#### Stats Google Search Console (20-05-2026)
- Impresiones 28 días: 1.440
- Clics 28 días: 57
- CTR medio: 4% (sobre promedio industria 2-3%)
- Consultas activas: 81 keywords distintas
- Keyword principal: "pasteleria maipu" (116 impresiones, 2 clics)

### Pendientes
- Analizar métricas de /arma-tu-torta tras indexación en Google Search Console
- Evaluar acceso más prominente para visitantes a /arma-tu-torta

---

## Sesión 27-05-2026

### Cambios realizados

#### Homepage (app/page.tsx)
- Nueva estructura: Hero → ServicioDetalle delivery (pageMode) → Franja Eventos → Nosotras → Arma tu Torta (bloque inline) → FAQ → Contacto → Footer
- Eliminados: Catalogo.tsx y Servicios.tsx del homepage
- Agregado: EventosOverlay.tsx para manejar `?servicio=eventos` via useSearchParams

#### Franja Eventos
- Nueva sección con 4 paneles diagonales: Matrimonios, Cóctel, Cumpleaños, Corporativos
- Links a `/?servicio=eventos&tab=X` (abre overlay, no página SEO)
- Título elegante "Hacemos especiales tus momentos"

#### /productos (app/productos/page.tsx)
- Reemplazado por ServicioDetalle con pageMode=true (id="delivery")
- Muestra catálogo completo con carrito WhatsApp y 6 tabs incluyendo Pan
- Header link "Productos" hace scroll a #productos en homepage

#### ServicioDetalle.tsx
- Nueva prop `pageMode: boolean`
- En pageMode: position relative, sin bloqueo de scroll, sin botón cerrar, sin logo
- `id="productos"` cuando pageMode=true, `scrollMarginTop: '110px'`
- Tab Pan agregado a productosDelivery (Pan Amasado, Tortilla con Chicharrones, Ciabatta)

#### Reseñas Google Business
- Nuevo componente: `components/ResenasGoogle.tsx`
- Cloud Function: `functions/src/index.ts` → `placesReviews`
- URL producción: `https://us-central1-galdi-web.cloudfunctions.net/placesReviews`
- Place ID Galdi: `ChIJf7l5N6LDYpYR6uNj83Fqd9g` (actualizado — el anterior estaba vencido)
- Firebase plan actualizado a Blaze (requerido para Cloud Functions)
- Places API habilitada en proyecto galdi-web
- API Key servidor (sin restricción de referer): `AIzaSyBhM3t8G0NeXX8JiC0CEfsDcOExwQFFXh4`
- Reseñas integradas dentro del `<section>` de Nosotras.tsx

#### /gestion
- Talla XL dinámica: aparece en catálogo, calculadora y lista de precios para cualquier producto con XL en COSTOS_TALLA
- Pan Artesanal reducido a 3 productos: Pan Amasado, Tortilla con Chicharrones, Ciabatta

#### Eliminaciones
- `/distribucion-maipu` redirige a `/`
- Servicio "Distribución Almacenes" eliminado de Servicios.tsx y Footer.tsx
- Sección Catalogo.tsx eliminada del homepage
- `app/api/resenas/route.ts` eliminado (incompatible con `output: export`)

#### Header
- "Servicios y Pedidos" → "Servicios y Eventos"
- "Productos" hace scroll a `#productos` (anchor, no navegación)
- Todos los anchors con `scrollMarginTop: '130px'`

#### Nosotras.tsx
- Eliminados los 3 badges (100% Artesanal, Hecho en Casa, Recetas Familiares)
- ResenasGoogle integrado dentro del `<section>` raíz
- Padding ajustado a `'2rem 5% 0'`

### Pendientes
- Carrito con Flow (28-05-2026)
- Fase 3a Okasa: restricción HTTP referrer API Key Gemini
- Imagen Ciabatta (provisional: usa pan-amasado-new.webp)
