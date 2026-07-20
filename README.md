# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: 29 junio 2026

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
  ├── hooks/
  │   └── usePreciosGaldi.ts     ← lee galdi_productos Firestore, retorna Record<nombre, PrecioProducto>
  ├── components/
  │   ├── Header.tsx             ← fijo, scroll, logo, nav, hamburguesa, 🔒 /gestion discreto
  │   ├── Hero.tsx               ← slideshow 6 slides
  │   ├── Catalogo.tsx           ← grid productos con tallas S/M/L
  │   ├── ServicioDetalle.tsx    ← overlay servicios con tabs · precios live Firestore · nombreVisible pattern
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
- [x] **Carrito de compras con pago Flow** — backend completo (flowCrearOrden + flowConfirmar como Cloud Functions). Despacho: $3.000 cercanas / $5.000 lejanas. Comunas cercanas: Maipú, Cerrillos, Pudahuel, Estación Central, Padre Hurtado, Lo Prado. Retiro gratis en Maipú. Pago 100% anticipado.
- [x] **Precios catálogo público (Fase A)** — hook usePreciosGaldi.ts + precios por talla S/M/L/XL en cards de /productos. Tallas Firestore corregidas 12-06-2026.
- [ ] **Crear cuenta Flow** — pendiente. Puede demorar 1-3 días hábiles en verificar.
- [ ] **POS TUU** — en proceso de compra por Claudio
- [ ] **Carrito frontend** — componente con productos, cantidades, selector comuna y botón Pagar con Flow
- [ ] **Precio dinámico por talla seleccionada** — al seleccionar talla en la card, mostrar solo el precio de esa talla (en vez de todas las tallas a la vez). Limpio y elegante.
- [ ] **flowConfirmar → guardar pedido en Firestore al confirmar pago + notificar a Galdi por WhatsApp**

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

- **24-06-2026** — 21 productos nuevos en Firestore: 12 Cóctel Salado + 5 Cóctel Dulce + 4 Tablas (solo precio venta, cóctel por unidad) · fix bug $36 gestion-index.html (logística 0 explícito + dropdown precio) · Flow.cl integración confirmada operativa
- **12-06-2026** — Fase A completa: hook usePreciosGaldi.ts · precios por talla S/M/L/XL en catálogo /productos · nombreVisible pattern para nombres Firestore vs display · tallas corregidas en Firestore (10 tortas) · fix fecha "21 de junio" Día del Padre en Header/Banner/page · nueva página /dia-del-padre con JSON-LD y imagen torta-chocolate-hero.webp · SEO /productos: title, description y H1 invisible
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

## Sesión 30-04-2026

**Completado:**
- ✅ fix: 9 canonicals SEO agregados a páginas sin ellos (tortas, empanadas, pan-artesanal, delivery, distribucion, coctel, cumpleanos, coffee-break, productos) — commit c03bb9a
- ✅ feat: `app/productos/layout.tsx` creado con canonical https://galdi.cl/productos
- ✅ feat: `app/validar-presupuesto/layout.tsx` creado con robots noindex/nofollow
- ✅ seo: "Las Palmas" agregado en Footer.tsx y Nosotras.tsx — commit 7c1030b
- ✅ seo: meta descriptions CTR mejoradas en /matrimonios-maipu y /empanadas-maipu — commit f47c50e

**Search Console (28 días a 30-04-2026):**
- Clics: 30 · Impresiones: 1.270 · CTR: 2,4% · Posición media: 8,7
- Sitio con ~1,5 meses de vida · 172 consultas distintas
- Keywords con mayor potencial: banquetes maipú (29 imp), torta bodas maipú (27 imp), pastelerías en maipu (13 imp)
- Tendencia impresiones: despegue notable desde 13-04-2026 (5x en 2 semanas)

**Reseñas Google Business:** 53 reseñas, todas ⭐⭐⭐⭐⭐ (meta de 50 superada ✅)

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

### Cloud Functions Flow (01-06-2026)
- `flowCrearOrden` → https://us-central1-galdi-web.cloudfunctions.net/flowCrearOrden
  Recibe: `{ orden, monto, email, descripcion }`
  Retorna: `{ urlPago, token }`

- `flowConfirmar` → https://us-central1-galdi-web.cloudfunctions.net/flowConfirmar
  Webhook que Flow llama al confirmar pago (status 2 = pagado)
  TODO: guardar pedido en Firestore + notificar a Galdi

### Secrets configurados en Google Secret Manager
- `FLOW_API_KEY` (project: galdi-web, version 1)
- `FLOW_SECRET_KEY` (project: galdi-web, version 1)

### Página nueva
- `/pago-exitoso` → `app/pago-exitoso/page.tsx` (noindex)
  Página de confirmación tras pago exitoso con Flow

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

---

## Sesión 12-06-2026: Fase A Precios + Día del Padre

### Fase A — Precios Firestore en catálogo público

#### hook `hooks/usePreciosGaldi.ts`
- Lee colección `galdi_productos` desde Firestore client-side
- Retorna `Record<string, PrecioProducto>` indexado por campo `nombre`
- Interface `PrecioProducto`: nombre, precio, precioS?, precioM?, precioL?, precioXL?, unidad

#### `components/ServicioDetalle.tsx` — nombreVisible pattern
- Tipo interno tiene `nombreVisible?: string` en ambos Record types (almacenes y delivery)
- `nombre` = clave exacta Firestore para lookup de precios y key de carrito
- `nombreVisible` = texto visible en la card (cuando difiere del nombre Firestore)
- 6 productos con nombreVisible: Torta Moka ("Moka / Pralinée"), Torta Selva Negra ("Selva Negra"), 4 empanadas (Pino, Napolitana, Vegetariana, Queso Camarón)
- Bloque precios IIFE en cada card: muestra tallas S/M/L/XL si existen, precio unitario si no
- `totalMonto` en barra inferior: suma precio×cantidad usando carritoKey con talla
- Formato barra: `🛒 N producto(s) · $XX.XXX · Ver pedido`

#### Tallas Firestore corregidas (12-06-2026)
- Script fix-tallas.js ejecutado con ADC (no serviceAccountKey.json)
- 10 tortas actualizadas con precioS/M/L/XL reales
- XL en $0 → hook convierte a `undefined` → no aparece en catálogo

### Nueva página /dia-del-padre
- `app/dia-del-padre/page.tsx` — 3 tortas: Panqueque, Torta de Chocolate, 3 Leches
- Imagen: `public/images/torta-chocolate-hero.webp` (78.8 KB, 1400×781, quality=50)
- JSON-LD: FoodEstablishment + FAQPage
- Fecha: **21 de junio** (corregida en Header.tsx, BannerDiaMadre.tsx, page.tsx, app/page.tsx)
- Enlazada desde Header franja, homepage bloque, Footer SEO links, sitemap.xml

### SEO /productos
- `app/productos/layout.tsx`: title "Pasteles, Tortas y Pan Artesanal en Maipú · Galdi", description actualizada, canonical
- `app/productos/page.tsx`: H1 invisible con CSS clip/overflow, ServicioDetalle nombre="Nuestros Productos"

### Notas técnicas
- `serviceAccountKey.json` NO existe en `functions/` — usar `admin.initializeApp({projectId:'galdi-web'})` con ADC
- `git add .` siempre requiere `git reset HEAD functions/node_modules/ functions/package-lock.json app/pago-exitoso/` después

---

## Sesión 15-06-2026

### Cambios realizados

#### SEO /dia-del-padre — cobertura multi-comuna
- metadata.keywords expandido con Pudahuel, Cerrillos, Padre Hurtado, Estación Central, Santiago
- FAQPage JSON-LD expandido de 4 a 9 preguntas (una por comuna + generales)
- Sección visual #cobertura-comunas en extraContent con tabla de precios de despacho

#### flowConfirmar
- functions/src/index.ts: bloque Firestore implementado, pedidos pagados se guardan en galdi_pedidos
- .trim() agregado en lectura de FLOW_API_KEY y FLOW_SECRET_KEY (problema raíz: whitespace en secrets)
- Credenciales Flow actualizadas en Secret Manager

#### Carrito Flow frontend
- app/carrito/page.tsx (nuevo) + app/carrito/layout.tsx (noindex)
- Formulario completo: nombre, email, teléfono, comuna, dirección, fecha entrega (24h mínimo)
- Cálculo automático de despacho por comuna ($0 retiro / $3.000 cercanas / $5.000 lejanas)
- Validación email + teléfono chileno
- Botón "Pagar con Flow" → llama flowCrearOrden → redirect a urlPago

#### ServicioDetalle.tsx — múltiples mejoras
- Sincronización carrito → sessionStorage en cada cambio + evento custom galdi:carrito-actualizado
- paddingTop 75px en pageMode (fix: tabs quedaban tapadas por header global)
- Tabs premium: cubic-bezier, glow dorado en activa, expansión letter-spacing
- Talla seleccionada: pulse animation con halo dorado doble
- Precio dinámico por talla seleccionada (no muestra todas las tallas si está elegida una)
- Deseleccionar talla al hacer clic de nuevo en la misma
- Pasteles y Queques ahora con selector S/M/L (igual que Tortas)
- Modal carrito rediseñado: 720px, imágenes 64x64, total dorado grande, 2 botones (Flow + WhatsApp)
- Barra inferior con icono SVG carrito + badge animado

#### Header.tsx
- Reemplazado botón "Cotizar" por "Carrito" con SVG icon
- Badge dinámico con totalItems (lee sessionStorage + escucha eventos)
- Aplicado en desktop y mobile

#### Footer.tsx
- Label "Día del Padre" → "Tortas Día del Padre"

#### Firestore
- Pasteles & Tartas: precioS=$12.000, precioM=$15.000, precioL=$18.000 (5 productos)
- Queques: precioS=$4.000, precioM=$6.000 (3 productos)
- Empanadas: estructura copiada de Empanada de Mariscos (4 productos)

#### ArmaTuTorta.tsx
- Precios por tamaño: S $22k / M $30k / L $42k / XL $55k
- Opción "Sin azúcar" con alulosa: +$4k / +$6k / +$10k / +$15k
- Toggle elegante con descripción
- Bloque "Valor total" con precio destacado en resumen
- WhatsApp incluye precio referencial + nota sin azúcar

#### Limpieza repo
- 30+ carpetas de agentes IA removidas del índice Git (.adal, .augment, skills/, etc.)
- 3.721 archivos eliminados (~828.750 líneas)
- 10 imágenes obsoletas con mayúsculas/espacios eliminadas
- functions/node_modules/ excluido del repo (5.959 archivos desindexados)
- .gitignore actualizado con todas las exclusiones

#### Posicionamiento competitivo Arma tu Torta sin azúcar
- vs Ruyed (alulosa, Providencia): -10% a -13% más accesibles
- vs Riesco/Mozart (premium): bien posicionados en segmento medio-alto
- Sin competencia directa en Maipú
- Diferenciador: personalización total (Ruyed solo pre-diseñadas)

### Estado actual del proyecto
- Todas las URLs en https://galdi.cl funcionando
- Carrito Flow end-to-end operativo
- /dia-del-padre rankeando (deadline: domingo 21 junio — 6 días)
- 313 archivos en producción

### Sesión 16-06-2026

#### ServicioDetalle.tsx — botón eliminar ítem carrito
- Función eliminarItem(key) agregada tras quitar()
- Botón × por ítem en modal resumen, color rgba(245,150,150,0.7), marginLeft auto
- Permite eliminar un producto individual sin vaciar todo el carrito

### Pendientes para sesiones futuras
- [ ] Comunicar endulzante "alulosa" en página /arma-tu-torta como diferenciador
- [ ] Considerar agregar /sin-azucar como landing SEO específica (oportunidad de mercado)
- [ ] 5 deep-analysis blog posts Okasa (workflow Gemini)
- [ ] Enriquecer 4 landing pages geolocalizadas Okasa
- [ ] Re-evaluar /distribucion-maipu (404 vs redirect a /productos)
- [ ] Internal linking a /tortas-maipu (7 enlaces) según brief SEO
- [ ] H1 duplicado homepage Galdi
- [ ] Auditar header anchors vs URLs reales

---

## Sesión 24-06-2026

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

---

## Desarrollo local

```bash
npm run dev     # servidor desarrollo → http://localhost:3000
npm run build   # export estático → out/
npm run start   # preview producción local
```

### Rutas locales
- Galdi: `C:\OKasa\Web\galdi-nextjs`
- Okasa: `C:\OKasa\Web\okasa-proyecto`

### Advertencias de desarrollo

**Banner/AnnouncementBar:** El texto del banner superior NO está en `BannerDiaMadre.tsx` — está hardcodeado en `components/Header.tsx` línea ~116. Siempre modificar `Header.tsx` para cambiar el texto del banner de producción.

---

## Jornada 30-06-2026

**Completado:**
- ✅ feat: /coffee-break-maipu expandida con página custom SEO
  (reemplaza SeoPage genérico)
  - Schema: LocalBusiness + Bakery, FAQPage (5 preguntas), BreadcrumbList
  - Productos ajustados a formato corporativo real: mini sandwiches,
    mini empanadas (pino/queso/queso champiñón), mini tartaletas
    (pie de limón, kuchen de manzana, kuchen sureño, kuchen de nuez),
    alfajores, bebidas calientes (café/té/chocolate)
  - Commit 1c293f0 + ajustes posteriores de productos

- ✅ feat: /coctel-maipu expandida con página custom SEO
  (reemplaza SeoPage genérico, mismo patrón que coffee-break)
  - Schema: LocalBusiness + Bakery, FAQPage (5 preguntas), BreadcrumbList
  - Grid de 7 bocados: canapés, tapaditos, mini empanadas,
    brochetas de fruta, brochetas de carne, postres individuales,
    bocados especiales
  - Enfoque diferenciado: recepciones/eventos sociales (matrimonios,
    cumpleaños, aniversarios) vs. coffee-break (corporativo)

**Patrón establecido para próximas expansiones SEO:**
Páginas aún en SeoPage genérico (thin-content, candidatas a
expandir con el mismo patrón): revisar cumpleanos-maipu,
tortas-maipu, empanadas-maipu, pan-artesanal-maipu,
delivery-maipu, distribucion-maipu.

---

## Jornada 30-06-2026 (continuación) — Reposicionamiento SEO

**Contexto:** Datos de Search Console (28 días) mostraron cannibalización
entre /matrimonios-maipu y /coctel-maipu en la keyword "banquetería",
oportunidad sin explotar en "banquetes maipú" (170 imp, posición 13,86,
0 clics) y /empanadas-maipu con buena posición pero 0 clics
(127 imp, posición 8,94).

**Completado:**
- ✅ feat: /coctel-maipu reposicionada como hub de banquetería
  - Title: "Banquetería y Cóctel en Maipú · Bocados para Eventos · Galdi"
  - H1, keywords, JSON-LD description y BreadcrumbList actualizados
  - Nueva FAQ "¿Qué incluye la banquetería para eventos en Maipú?"
    como primera pregunta

- ✅ fix: /matrimonios-maipu acotada solo a torta de novios + mesa de dulces
  - Eliminadas secciones "Bocados Salados" y "Barra de Tragos"
    (array servicios + JSON-LD hasOfferCatalog)
  - Agregado bloque de derivación a /coctel-maipu antes de FAQs
  - Link "Ver diseños de torta de bodas →" en card Torta de Novios
  - FAQs actualizadas (primera pregunta reescrita + nueva FAQ de
    derivación a banquetería)

- ✅ feat: /empanadas-maipu migrada de SeoPage genérico a página custom
  - Schema: LocalBusiness + Bakery, FAQPage (5 preguntas),
    BreadcrumbList
  - Grid de 6 sabores: pino, queso, napolitana, vegetariana,
    queso camarón, mariscos
  - Pedido mínimo por docena, delivery, distribución a almacenes

- ✅ feat: nueva página /tortas-bodas-maipu
  - Diseños (rústico, elegante, minimalista) + decoración floral
  - Sabores y rellenos (6: 3 Leches, Chocolate, Moka, Selva Negra,
    Hojarasca, Piña)
  - Tamaños S/M/L/XL según invitados
  - Degustación previa, cómo cotizar, FAQ (5 preguntas)
  - Internal links + link inverso desde /matrimonios-maipu
  - Agregada a sitemap.xml

**Incidente de deploy resuelto:**
- /coctel-maipu no se actualizó en el primer deploy (commit f9935e2)
  pese a que el código fuente era correcto. Causa: directorio out/
  con caché de build anterior, Firebase calculó hashes como "sin
  cambios" y saltó la subida del archivo.
- Fix: rebuild limpio (rm -rf .next out) forzó a Firebase a subir
  98 archivos. Commit 645bb6f.
- Lección: ante discrepancias entre código y producción, primero
  intentar rebuild limpio antes de asumir error de código.

---

## Jornada 04-07-2026

### Cambios deployados
- components/ArmaTuTorta.tsx: agregado mensaje "🕐 Entrega en 24 horas
  después de contactarnos" bajo el párrafo principal del hero.
- app/tortas-maipu/page.tsx: migrada de SeoPage genérico a página
  custom (mismo patrón que coctel-maipu/coffee-break-maipu). JSON-LD
  LocalBusiness + Bakery, FAQPage (5 preguntas), BreadcrumbList, grid
  de 7 sabores, bloque destacado con link a /arma-tu-torta. Imagen
  hero: /images/torta-chocolate-hero.webp.
- components/Footer.tsx: agregado link "Tortas de Novia Maipú" 
  (/tortas-bodas-maipu) al listado de links SEO, entre Coffee Break
  y Día de la Madre.

### SEO
- Indexación manual solicitada en Search Console para:
  /coffee-break-maipu, /coctel-maipu, /tortas-maipu,
  /tortas-bodas-maipu (esta última había quedado fuera del lote
  anterior).

### Pendiente
- Llamar a TUU para obtener API Key del terminal POS (Tab 4 ya
  implementado en /gestion, solo falta la key).

---

## Sesión 18-07-2026

Experimento VibeCurb (awwwards-hero + imagegen-frontend) en
/experimental/hero-editorial. Ver commit para código de referencia.
No deployado. Tailwind v4 con problema latente detectado — atender
en sesión aparte.

---

## Jornada 20-07-2026

### Landings geo expandidas (SeoPage genérico → página custom)

**✅ /cumpleanos-maipu**
- Migrada al patrón custom (Schema LocalBusiness+Bakery, FAQPage 5
  preguntas, BreadcrumbList)
- Grid "Mesa de Dulces para Cumpleaños" con 5 productos reales de
  galdi_productos (Cheesecake, Pastelitos Surtidos, Muffins Surtidos
  Cóctel, Brochetas de Frutas, Galletas Artesanales)
- Diferenciada de /tortas-maipu para evitar canibalización: NO lista
  sabores de torta, deriva mediante bloque destacado hacia
  /tortas-maipu y /arma-tu-torta
- Sección "Cómo pedir tu cumpleaños" + FAQ + CTAs
- Deploy: commit 593562e

**✅ /delivery-maipu**
- Migrada al patrón custom, funcionando como HUB de derivación (no
  lista productos propios): Tortas, Empanadas, Cumpleaños, Cóctel/
  Banquetería
- Pan Artesanal y "Catálogo completo" excluidos deliberadamente del
  listado de derivación (ver decisiones de negocio abajo)
- Sección "Zonas de cobertura y costos de despacho" con política
  actualizada (ver abajo)
- Deploy: commit 82c213a

### Decisiones de negocio

- **pan-artesanal-maipu**: NO se expandirá con el patrón SEO (mucho
  trabajo, poca ganancia). Excluida también del listado de derivación
  de /delivery-maipu — evita que un pedido de bajo valor (ej. una
  docena de sopaipillas) termine costando más en despacho que el
  producto mismo.

- **Pedido mínimo para delivery: $15.000** — nueva regla de negocio.
  Pendiente evaluar si se aplica también al carrito/checkout (Flow),
  o si por ahora queda solo como mención informativa en la landing.

- **Política de despacho actualizada** (reemplaza la de 25-05-2026):
  - Retiro en Maipú: gratis
  - Comunas cercanas (Maipú, Cerrillos, Pudahuel, Estación Central,
    Padre Hurtado, Lo Prado): $3.000 a $5.000 (rango según dirección
    exacta, ya no monto fijo)
  - Otras comunas de la Región Metropolitana: según distancia
    (cálculo variable, cotizado junto con el pedido — ya no monto fijo
    de $5.000)

- **TUU (API Key para /gestion) descartado por ahora.** Razón: si el
  pago es presencial con terminal POS físico, lo prioritario es que el
  pedido quede claro y bien registrado, no la integración de la API.
  Posible pendiente futuro: mejorar el registro de pedidos para pagos
  presenciales.

### SEO
- Indexación manual solicitada en Search Console para /cumpleanos-maipu
  y /delivery-maipu.

### Pendiente
- distribucion-maipu no requiere trabajo adicional (ya redirige a "/").
- Evaluar si el pedido mínimo de $15.000 se implementa como validación
  real en el carrito/checkout.
