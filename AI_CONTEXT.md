# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: 03 abril 2026

---

## 🗂️ Información del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Sitio web público de Galdi Pastelería |
| **Cliente / Dueño** | Jaqueline e Ingrid Gálvez Díaz (hermanas) |
| **Ubicación** | Maipú, Chile |
| **Tipo de negocio** | Pastelería artesanal y catering |
| **Desarrollador** | Claudio (GitHub: `Okasa-Chile`) |
| **Repositorio** | `Okasa-Chile/galdi-pasteleria` (rama `main`) |
| **Firebase Project** | `galdi-web` (proyecto independiente, plan Spark) |
| **Firebase Site** | `galdi-web.web.app` |
| **URL Producción** | `https://galdi-web.web.app` |
| **Stack actual** | Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui v4 |
| **Stack anterior** | HTML + CSS + JS puro, single file (`index.html`) en `galdi-web/` |

---

## 🏗️ Estructura del Proyecto (Next.js)

```
galdi-nextjs/
  ├── app/
  │   ├── globals.css         ← variables CSS Galdi + Google Fonts
  │   ├── layout.tsx          ← RootLayout, metadata, lang="es"
  │   └── page.tsx            ← compone Header + Hero + Catalogo + Servicios
  ├── components/
  │   ├── Header.tsx          ← header fijo, scroll detection, hamburguesa mobile
  │   ├── Hero.tsx            ← slideshow 6 slides, dots, CTA WhatsApp
  │   ├── Catalogo.tsx        ← 6 tabs, productos con imágenes WebP, tabs sticky, animación catFadeUp
  │   ├── Servicios.tsx       ← 3 cards con hover overlay, links WhatsApp
  │   ├── Nosotras.tsx        ← grid 2 col: foto + textos + valores
  │   ├── Contacto.tsx        ← botón WhatsApp + email ventas@galdi.cl + QR
  │   └── Footer.tsx          ← logo + copyright + links
  ├── public/
  │   └── images/             ← todas las imágenes copiadas desde galdi-web/images/
  ├── firebase.json           ← public: "out", cleanUrls: true
  ├── .firebaserc             ← default: "galdi-web"
  ├── next.config.ts          ← output: "export", images.unoptimized: true
  └── AI_CONTEXT.md
```

> **Secciones activas en `page.tsx`**: Header · Hero · Catálogo · Servicios · Nosotras · Contacto · Footer

---

## ✅ Trabajo Completado

### Fase 1–5 — Sitio estático original (antes de 18-03-2026)
- [x] Diseño y construcción del sitio en `galdi-web/index.html`
- [x] Procesamiento del logo PNG (remoción de fondo rosa con Python PIL)
- [x] Hero slideshow 4 slides, catálogo 6 categorías 28 productos
- [x] Deploy a Firebase Hosting (multisite bajo proyecto Okasa — luego migrado)
- [x] Incidente 17-03-2026: deploy pisó okasa.cl → decisión de migrar a proyecto independiente

### Fase 6 — Migración a Next.js (18-03-2026)
- [x] Creación de proyecto Next.js 16 en `galdi-nextjs/` con TypeScript + Tailwind CSS v4
- [x] shadcn/ui v4 inicializado con preset base-nova (`--defaults`)
- [x] `next.config.ts`: `output: "export"`, `images.unoptimized: true`
- [x] Firebase Hosting configurado para directorio `out/`
- [x] Repositorio GitHub conectado: `Okasa-Chile/galdi-pasteleria`
- [x] **`globals.css`**: variables CSS Galdi + Google Fonts (Cormorant Garamond + Jost)
- [x] **`layout.tsx`**: metadata Galdi, lang="es", sin Geist fonts
- [x] **`Header.tsx`**: fijo, scroll detection, logo cambia tamaño/filter, nav con `::after` dorado, hamburguesa mobile, botón Cotizar
- [x] **`Hero.tsx`**: slideshow automático 6 slides (5s), dots clickeables con animación de ancho, CTA WhatsApp
- [x] **`Catalogo.tsx`**: 6 tabs (Pan, Pasteles, Tortas, Dulces, Queques, Empanadas), 24 productos, `next/image fill`, animación `catFadeUp` con delays, `key={activeTab}` fix re-render, gradientes CSS para Tortas y Queques
- [x] **`Servicios.tsx`**: 3 cards (B2B, Eventos, Delivery), `next/image fill`, hover con `useState`, overlay degradado, descripción/link aparecen en hover
- [x] `page.tsx` compone: `<Header /> <Hero /> <Catalogo /> <Servicios />`
- [x] Imágenes copiadas a `public/images/` (hero ×6, productos, servicios, logo)
- [x] `npm run build` exitoso
- [x] `firebase deploy --only hosting` → sitio live en `galdi-web.web.app`
- [x] `git push origin main`

### Fase 7 — Imágenes WebP + catálogo + limpieza (18-03-2026, tarde)
- [x] **QR WhatsApp** generado: `public/images/qr-whatsapp.png` (wa.me/56990991011)
- [x] **Email** `ventas@galdi.cl` agregado en `Contacto.tsx`
- [x] **Catálogo ampliado**: Tortas (Piña + Hojarasca), Dulces (Berlines, Alfajores de Manjar, Pasteles Rectangulares)
- [x] **11 imágenes PNG → WebP** (56 MB → 1 MB), asignadas en `Catalogo.tsx`
- [x] **Tabs sticky** con `scrollMarginTop` correcto
- [x] **Limpieza**: logos duplicados, SVGs default Next.js, JPGs originales eliminados
- [x] **Proyecto `galdi-web`** (HTML estático) eliminado
- [x] Número WhatsApp `56990991011` verificado en todos los archivos
- [x] `npm run build` exitoso · `firebase deploy` → `galdi-web.web.app` · `git push origin main`

### Fase 8 — Eslogan + imágenes completas (24-03-2026)
- [x] Eslogan actualizado a "El sabor de lo hecho con cariño" en Hero.tsx y logo
- [x] Imágenes de productos completadas en todas las categorías del catálogo
- [x] `npm run build` exitoso · `firebase deploy` → `galdi-web.web.app` · `git push origin main`

### Fase 11 — DNS Cloudflare + Dominio galdi.cl (25-03-2026)
- [x] Dominio galdi.cl comprado en NIC Chile a nombre de COMERCIALIZADORA Y DISTRIBUIDORA GALDI SpA (RUT 78.378.827-6)
- [x] galdi.cl agregado a Cloudflare (plan Free)
- [x] Registros DNS configurados en Cloudflare:
      - A @ → 199.36.158.100 (DNS only)
      - A @ → 199.36.158.101 (DNS only)
      - CNAME www → galdi-web.web.app (DNS only)
- [x] Nameservers de Cloudflare ingresados en NIC Chile:
      - brad.ns.cloudflare.com
      - sydney.ns.cloudflare.com
- [x] Cloudflare en espera de propagación (1–24 horas)

### Fase 10 — SEO, carrito y ajustes visuales (25-03-2026)
- [x] Metadatos SEO completos en layout.tsx (title, description, keywords, Open Graph, Twitter)
- [x] sitemap.xml y robots.txt creados en public/
- [x] Favicon con Nuevologo.webp
- [x] Carrito de pedidos con resumen modal, botón vaciar y unidades correctas en WhatsApp
- [x] ServicioDetalle: imagenes sincronizadas con Catalogo.tsx via export/import
- [x] Imagen Corporativo.webp para Eventos
- [x] Ajustes visuales: Contacto, Hero subtítulo, Catalogo padding, Header logo tamaño
- [x] user-select: none en globals.css
- [x] Dobloditas descripción corregida
- [x] Botón WhatsApp eliminado de cards de Catalogo
- [x] npm run build exitoso · firebase deploy · git push origin main

### Fase 12 — Dominio, Email y Ajustes (26-03-2026)
- [x] galdi.cl conectado a Firebase Hosting (dominio personalizado)
- [x] www.galdi.cl redirige a galdi.cl
- [x] SSL activo en galdi.cl
- [x] Imagen OG creada (og-galdi.webp) y configurada en layout.tsx
- [x] Email ventas@galdi.cl operativo en Zoho (SPF, DKIM, DMARC configurados)
- [x] Fix: "Nosotros" → "Nosotras" en Header.tsx
- [x] Imagen Socias.webp en sección Nosotras
- [x] Fix: id="nosotras" para scroll correcto desde menú
- [x] New_Hero_socias.webp con objectPosition center 35% + scale(1.4)
- [x] Fix responsive móvil hero socias: scale(1.4) + object-position center 30% en @media max-width 768px
- [x] className="hero-socias" agregado a imagen New_Hero_socias.webp
- [x] npm run build exitoso · firebase deploy · git push origin main

### Fase 9 — Sistema de Servicios con Carrito (25-03-2026)
- [x] Nuevo componente ServicioDetalle.tsx — overlay full screen con animación
- [x] Logo Galdi visible en overlay (Nuevologo.webp)
- [x] Tabs de categorías arriba, imagen de fondo full screen con objectPosition top
- [x] Distribución Almacenes: tabs Pan | Queques | Muffins | Dulces | Empanadas con grilla de productos
- [x] Delivery Maipú: tabs Tortas | Pasteles | Queques | Empanadas con grilla de productos
- [x] Eventos: tabs Matrimonios | Cóctel | Cumpleaños | Corporativos con imágenes Unsplash + CTA WhatsApp
- [x] Carrito con mínimos por categoría (Pan: 10kg, Queques: 2un, Muffins/Dulces/Empanadas: 1 docena, Delivery: 1un)
- [x] Barra fija inferior con contador y botón "Enviar pedido por WhatsApp"
- [x] Mensaje WhatsApp formateado con detalle del pedido
- [x] Servicios renombrados: B2B → Distribución Almacenes, Eventos Especiales → Eventos
- [x] scrollMarginTop corregido en sección Servicios
- [x] npm run build exitoso · firebase deploy · git push origin main

---

## 🖼️ Imágenes en `public/images/`

| Archivo | Uso |
|---|---|
| `logo-ancho.png` | Header, Footer |
| `hero-final-freepik.webp` | Hero slide 1 |
| `hero-final-16-9.webp` | Hero slide 2 |
| `hero-socias-vintage.webp` | Hero slide 3 |
| `hero-premium-chefs.webp` | Hero slide 4 |
| `hero-b2b.webp` | Hero slide 5 |
| `hero-pasteleria.webp` | Hero slide 6 |
| `Pan Amasado.webp` | Catálogo — Pan Amasado |
| `Tortilla de Chicharrones.webp` | Catálogo — Tortilla |
| `Pan integral.webp` | Catálogo — Pan Integral |
| `Pan Frica.webp` | Catálogo — Pan Frica |
| `Dobladitas.webp` | Catálogo — Dobladitas |
| `Marraquetas.webp` | Catálogo — Marraqueta |
| `prod-pie.webp` | Catálogo — Pasteles (Pie de Limón) |
| `prod-dulces.webp` | Catálogo — Dulces / Sección Nosotros |
| `prod-empanada.webp` | Catálogo — Empanadas |
| `Banofee.webp` | Catálogo — Banofee |
| `Berlines.webp` | Catálogo — Berlines |
| `Kuchen de Nueces.webp` | Catálogo — Kuchen de Nueces |
| `Kuchen sureño.webp` | Catálogo — Kuchen Sureño |
| `Tartaletas.webp` | Catálogo — Tartaletas |
| `Torta 3 Leches.webp` | Catálogo — Torta 3 Leches |
| `Torta Moka.webp` | Catálogo — Torta Moka |
| `Torta Selva negra.webp` | Catálogo — Torta Selva Negra |
| `Torta de Chocolate.webp` | Catálogo — Torta de Chocolate |
| `Torta de Hojarasca.webp` | Catálogo — Torta de Hojarasca |
| `Torta de Piña.webp` | Catálogo — Torta de Piña |
| `qr-whatsapp.png` | Contacto — QR WhatsApp |
| `svc-b2b.webp` | Servicios — Distribución B2B |
| `svc-eventos.webp` | Servicios — Eventos Especiales |
| `svc-delivery.webp` | Servicios — Delivery en Maipú |

---

## 📦 Catálogo Completo de Productos

### 🍞 Pan Artesanal
Pan Amasado · Tortilla con Chicharrones · Pan Integral · Pan Frica · Dobloditas · Marraqueta

### 🎂 Pasteles & Tartas
Pie de Limón Merengado · Kuchen Sureño · Kuchen de Nuez · Banofee · Tartaletas

### 🍰 Tortas
3 Leches · Chocolate · Moka · Selva Negra · Piña · Hojarasca · Panqueque · Pavé

### 🍪 Dulces & Alfajores
Alfajores de Maicena · Alfajores de Manjar · Alfajores de Chocolate · Chilenitos · Berlines · Pasteles Rectangulares

### 🥐 Queques & Muffins
Queque de Naranja · Queque Mármol · Queque de Yogurt · Muffins

### 🥟 Empanadas (venta por docena)
Pino · Napolitana · Vegetariana · Queso Camarón · **Empanada de Mariscos**

---

## 🛠️ Decisiones Técnicas y Aprendizajes

### Next.js + Firebase Hosting (exportación estática)
```ts
// next.config.ts
output: "export"          // genera carpeta /out/
images: { unoptimized: true }  // requerido para export estático
```
```json
// firebase.json
{ "public": "out", "cleanUrls": true, "trailingSlash": false }
```

### shadcn/ui v4
- La CLI de v4 ya no ofrece opciones "Default/Slate" — usa presets: Nova, Vega, etc.
- Instalar con `npx shadcn@latest init --defaults` para preset base-nova

### CSS Pseudo-elementos en React
- `::after` y `::before` no se pueden aplicar con inline styles
- Solución: `<style>` tag interno dentro del componente con clases CSS

### Catalogo — Bug de re-render al cambiar tabs
- Síntoma: cards desaparecen al cambiar tab
- Causa: React reconciliation con `key` en nodo incorrecto + `background-image` CSS no precarga imágenes dinámicas en Next.js
- Fix: `key={activeTab}` en el `<div>` wrapper exterior del panel + `<Image fill>` de `next/image` en lugar de `background-image`

### Imágenes con espacios en nombres
- Archivos con espacios (`Pan Amasado.webp`) funcionan en `next/image` con `src="/images/Pan Amasado.webp"`
- Next.js los encoda automáticamente en la URL

### Flujo de trabajo IA
- Claude.ai (chat) → prepara prompts/archivos `.txt` → Claudio los abre en VS Code → copia → pega en Claude Code
- Cambios múltiples siempre en un solo prompt a Claude Code

---

## 🧰 Herramientas Instaladas en Claude Code

> Actualizado: 03-04-2026

| Plugin | Versión | Descripción |
|---|---|---|
| **Superpowers** (`obra/superpowers`) | — | Plugin oficial Anthropic. Brainstorming obligatorio antes de codear, sub-agentes paralelos, TDD, code review automático. |
| **Everything Claude Code** | — | 75 skills, 58 agentes, 33 hooks activos. |
| **UI/UX Pro Max** | — | Instalado en Okasa y Galdi. 57 estilos, 95 paletas, 56 tipografías. Se activa automáticamente en tareas de diseño. |
| **Claude Men** | — | Memoria permanente entre sesiones CC. |
| **GSD — Get Shit Done** | v1.30.0 | Meta-prompting y context engineering. Comandos: `/gsd:new-milestone`, `/gsd:do`, `/gsd:quick`. |
| **CC Templates** | on-demand | Disponible con `npx claude-code-templates@latest` desde terminal VSCode. |

---

## 🔜 Pendiente / Próximos Pasos

- [ ] Fotos reales para tabs Cóctel y Cumpleaños (Claudio las proveerá)
- [ ] Estatuto Galdi (actualización societaria pendiente)
- [ ] Banco de Chile — respuesta pendiente a contacto@okasa.cl
- [ ] Página /coffee-break-maipu agregada al footer Links
- [ ] Schema.org reviews strategy Okasa (Google Business)
- [ ] Nuevo blog post Okasa targeting "inspección vivienda usada"

---

## 📞 Datos de Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp** | +56 9 9099 1011 (wa.me/56990991011) |
| **Email** | ventas@galdi.cl |
| **Ubicación** | Maipú, Región Metropolitana, Chile |
| **Instagram** | (pendiente confirmar) |

---

## 📝 Notas de Sesión

- **Estilo de trabajo de Claudio**: confirmaciones breves ("ya", "listo", "ahora sí") → Claude pregunta si el contexto es ambiguo antes de actuar
- **Paleta Galdi**: café oscuro `#1a0f0a`, crema `#f5e6d3`, dorado `#d4a853`, terracota `#c4704f`
- **Secciones activas en `page.tsx`**: Header · Hero · Catálogo · Servicios · Nosotras · Contacto · Footer

---

## Sesión 27-03-2026 — Jornada Tarde

### Completado
- [x] Programa web Galdi-Precios.html — 3 tabs: Catálogo+Costos, Simulador Meta, Registro Ventas
- [x] 34 productos en 6 categorías con CRUD completo (agregar/editar/eliminar)
- [x] Costos GLP calculados: $135/kg energía (2 cámaras, horno Maigas 4 latas)
- [x] /gestion live en galdi.cl con Firebase Auth Google (signInWithPopup)
- [x] Usuarios autorizados: contacto@okasa.cl, ventas@galdi.cl, iaclaudioferrari@gmail.com
- [x] API key rotada tras exposición accidental en GitHub (commit 3a1d411)
- [x] firebase.json con rewrites explícitos para /gestion
- [x] gestion-app.html (sistema de precios) en public/
- [x] Firebase Auth dominios autorizados: galdi.cl configurado

### Archivos clave
- public/gestion/index.html — login con Google
- public/gestion-app.html — sistema de gestión completo
- .env.local — nueva API key AIzaSyCdLjH... (rotada 27-03-2026)

### Pendiente /gestion
- [ ] Integrar Firestore para persistir productos y ventas en la nube
- [ ] Agregar emails de las socias a AUTORIZADOS cuando tengan cuenta Google
- [ ] Restricciones de dominio a la API key en Google Cloud Console

---

## Sesión 27-03-2026 — Jornada Completa

### Completado
- [x] Google Search Console configurado para galdi.cl (verificado, sitemap enviado)
- [x] Cotización COT-G073 generada (Bautizo Benjamín, $390.500, enviada por correo)
- [x] Script Galdi-Menu-EDITABLE.py en raíz del proyecto (menú almaceneros PDF)
- [x] Imagen Socias_lapiz.webp en sección Nosotras
- [x] Textos Nosotras actualizados
- [x] Sistema de gestión /gestion con Firebase Auth Google
- [x] Usuarios autorizados: contacto@okasa.cl, ventas@galdi.cl, iaclaudioferrari@gmail.com, ingridgalvezd@gmail.com, jacquelinegalvezd@gmail.com
- [x] Firestore persistencia cloud — galdi_productos y galdi_ventas
- [x] API key rotada (exposición accidental en GitHub)
- [x] Link "Acceso interno" en footer → /gestion
- [x] Logo Galdi en /gestion clickeable → galdi.cl
- [x] Dropdown productos en registro de ventas
- [x] Tortilla con Chicharrones → venta por unidad, mín. 2 unidades
- [x] Plural "unidades" en carrito y mensaje WhatsApp

### Archivos clave /gestion
- public/gestion/index.html — app unificada (auth + Firestore + gestión)
- public/gestion-app.html — versión anterior con iframe (ya no se usa)
- firestore.rules — reglas permisivas (cualquier auth puede leer/escribir)

### Pendiente
- [ ] Volver reglas Firestore a lista de emails autorizados (actualmente permisivas)
- [ ] Precios automáticos en registro de ventas (seleccionar producto → precio se autocompleta)
- [ ] Fix admin login Okasa (signInWithPopup + URI autorizada)
- [ ] Integrar páginas SEO para servicios Galdi (/eventos, /delivery, /distribucion)

---

## Sesión 28-03-2026 — Completado
- [x] Favicon PNG generado (32x32, 192x192, apple-touch-icon) reemplaza WebP en layout.tsx
- [x] Reglas Firestore restringidas a 5 emails autorizados (commit c713e4a)
- [x] API key restringida a dominios galdi.cl, galdi-web.web.app, localhost en Google Cloud Console
- [x] Clave API anterior eliminada, nueva actualizada en .env.local
- [x] Precios automáticos en /gestion: poblarProductos() usa prods de Firestore con id como value
- [x] addVenta() guarda nombre del producto en lugar del id
- [x] Categoría y Producto inician con "— Elegir —" en formulario de ventas
- [x] Botón flotante WhatsApp verde en sitio público (components/WhatsAppFloat.tsx)
- [x] Acceso discreto 🔒 a /gestion en Header
- [x] Botón "Cotizar" en header lleva a #servicios
- [x] Imágenes Unsplash reemplazadas por WebP locales: eventos-matrimonio, eventos-coctel, eventos-cumpleanos
- [x] Scroll reveal con IntersectionObserver en Servicios y Nosotras
- [x] 18 fotos reales de matrimonios convertidas a WebP en public/images/eventos/
- [x] Slideshow automático 3s con dots en tab Matrimonios de Eventos
- [x] Carpeta _src/ creada con gestion-index.html para acceso IA

### Aprendizaje clave sesión 28-03-2026
- Siempre que se modifique public/gestion/index.html ejecutar:
  cp public/gestion/index.html out/gestion/index.html && firebase deploy --only hosting

### Pendiente actualizado
- [ ] Fotos reales para tabs Cóctel y Cumpleaños (Claudio las proveerá)
- [ ] Servicios como subpáginas navegables
- [ ] Plural "docenas" en carrito (2 docena → 2 docenas)
- [ ] Integrar páginas SEO para servicios (/eventos, /delivery, /distribucion)

---

### Sesión 31-03-2026 — SEO + Nuevos Productos
- [x] Empanada de Mariscos agregada en Catalogo.tsx, ServicioDetalle.tsx (Almacenes + Delivery) y gestion-index.html (id:35, costo:20000, precio venta $2.500/un = $30.000/docena)
- [x] URL params para auto-apertura de servicios y tabs: ?servicio=eventos&tab=Matrimonios
- [x] Servicios.tsx refactorizado con ServiciosInner + Suspense + useSearchParams
- [x] ServicioDetalle.tsx recibe prop initialTab?: string
- [x] Fix slideshow matrimonios: aspectRatio reemplazado por height: clamp(220px, 40vh, 420px)
- [x] Componente SeoPage.tsx creado en components/
- [x] 10 páginas SEO creadas en app/:
  - /productos — página principal con grid de 6 categorías
  - /empanadas-maipu
  - /tortas-maipu
  - /pan-artesanal-maipu
  - /delivery-maipu
  - /distribucion-maipu
  - /matrimonios-maipu
  - /coctel-maipu
  - /cumpleanos-maipu
  - /coffee-break-maipu
- [x] Cada página SEO con metadata único (title, description, keywords)
- [x] Schema.org JSON-LD en todas las páginas SEO + layout.tsx + /productos
- [x] Google Business Profile conectado via sameAs en todos los schemas
- [x] sitemap.xml actualizado a 11 URLs
- [x] robots.txt con Sitemap apuntando a galdi.cl/sitemap.xml
- [x] Indexación solicitada en Google Search Console
- [x] Internal linking: desplegable "Links" discreto en Footer.tsx con 10 páginas SEO
- [x] sessionStorage para scroll a #productos desde /productos
- [x] npm run build exitoso · firebase deploy · git push origin main

---

### Jornada 02-04-2026

**Completado:**
- ✅ SEO: 8 reseñas Google Business respondidas personalizadamente
- ✅ SEO: Galdi registrado en Yelp.cl
- ✅ SEO: Conecta Pyme — listing enviado, pendiente aprobación
- ✅ SEO: Canonical URL agregado en layout.tsx (commit 3eebd67)
- ✅ SEO: Subtítulo Hero actualizado con palabras del H1 (commit 198c03b)
- ✅ feat: 10 fotos reales Cóctel en ServicioDetalle.tsx
- ✅ feat: 10 fotos reales Cumpleaños en ServicioDetalle.tsx
- ✅ feat: 10 fotos reales Corporativos/Coffee en ServicioDetalle.tsx
- ✅ Slideshow automático 3s con dots en los 4 tabs de Eventos (commit d3ee30d)
- ✅ Mensaje de reseñas enviado a las socias para solicitar más reviews

**Pendientes:**
- Estatuto societario Galdi — actualización pendiente
- Conecta Pyme — esperando aprobación del listing
