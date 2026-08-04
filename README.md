# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: 4 agosto 2026

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

## 📁 Estructura del Proyecto

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
- Seobility On-page: **91%** (medido 20-07-2026)
- Seobility Enlazado de la página: **82%** — fixes de enlazado interno desplegados 20-07-2026 (ver Jornada 20-07-2026 abajo), pendiente re-medir
- Rich Results Test: **3 elementos válidos** (FAQPage, Empresas locales, Organización)
- Google Search Console: sin errores críticos
- Sitemap y robots.txt activos
- GA4 activo (G-LW81BNRRFP)
- 10+ landing pages SEO con JSON-LD

### Google Business Profile
- Reseñas actuales: **72** (todas ⭐⭐⭐⭐⭐) · Nota promedio: **5.0**
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
- Correlativo presupuestos: COT-G105+
- QR único por presupuesto → galdi.cl/validar-presupuesto?token=XXX
- COSTOS_TALLA: estructura {mat, mdo, energia, logistica, margen} por talla
- Key del carrito compuesta: `nombre·talla`
- Talla XL exclusiva para Torta Panqueque
- `cumpleanosSlides`: 8 slides (antes 10) — imágenes cumpleanos01-08.webp renovadas
- `SeoPage.tsx`: incluye logo con link a `/` en el hero (afecta todas las páginas SEO)

---

## 🔧 Reglas operativas

### Estilo de trabajo y comunicación

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

### Herramientas y entorno

| Herramienta | Estado |
|---|---|
| Repomix | ✅ Instalado · `.repomixignore` reduce tokens ~76% |
| Corey Haines Marketing Skills | ✅ 34 skills en `.claude/skills` |
| product-marketing-context.md | ✅ Contexto Galdi brand/SEO/marketing |
| Everything Claude Code | ✅ 75+ skills |
| addyosmani/agent-skills | ✅ 21 skills + 7 comandos slash |

### Comandos y rutas locales

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

### Regla operativa Dev/CC (vigente desde 14-07-2026)

- CC levanta npm run dev y lo deja corriendo.
- La verificación visual en localhost la hace Claudio personalmente.
- CC NO usa herramientas de navegador/Chrome DevTools (consume mucho
  contexto/costo en la sesión).
- En reportes, CC se limita a: qué compiló, qué pasó el chequeo de
  TypeScript, y detalle de los cambios de código — sin afirmaciones
  sobre comportamiento visual verificado por él.

### Pendientes activos

### Técnicos
- [ ] **Sistema cupones/descuentos** — prompt `.txt` preparado, no ejecutado aún
- [ ] **Integración WhatsApp → /gestion** — pedidos entrantes con estado pendiente/confirmado/entregado (futuro)
- [ ] **QR en PDF usando SVG en vez de canvas**
- [ ] **Agenda de clientes en /gestion**
- [ ] **Bug persistencia checkout** — `flowCrearOrden` solo pasa 4 campos, revisar qué falta persistir
- [ ] **Campaña Día del Niño** (09-08-2026)
- [ ] **REVERSIÓN Fiestas Patrias post 18-09-2026** — buscar comentarios `FIESTAS PATRIAS 2026` en `app/empanadas-maipu/page.tsx` y `components/Hero.tsx` y restaurar los valores/array originales comentados
- [ ] **Auditoría Bloque 3** (SEO estructural) — ver sección de Auditoría arriba
- [ ] **Revisar costos Mariscos y Queso Camarón** en /gestion — comparten $850 de materiales con Pino, pero sus insumos (mariscos, camarones) son más caros; el costo no refleja la diferencia real
- [ ] **components/Servicios.tsx es código huérfano** — no está importado en ningún lugar del repo (confirmado 04-08-2026), evaluar eliminarlo
- [ ] **prod-empanada.webp sobredimensionado** — 2400×1792px sin variante responsive (`sizes`), ahora es LCP de la home vía el bloque estacional del Hero; revisar/optimizar si la ponderación se vuelve permanente

### Administrativos / Externos
- [ ] **Estatuto societario Galdi** — modificación portal RES en curso:
  - Paso 3: subir documentos (acta notaría Repertorio 494 + cert. vigencia)
  - Paso 4: firmas Jacqueline (ClaveÚnica) + Ingrid + Notario ($15.000)
  - Notaría: Marco Francisco Urenda Bilicic · Av. Pajaritos 4500 · Santiago
- [ ] **Presupuesto matrimonio** — esperar consulta a Jacqueline sobre precios actualizados

---

## 📞 Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp** | +56 9 9099 1011 (wa.me/56990991011) |
| **Email** | ventas@galdi.cl |
| **Ubicación** | Pasaje Marcos Echenique N° 809, Las Palmas, Maipú |
| **Código postal** | 9260057 |
| **RUT empresa** | 78.378.827-6 (COMERCIALIZADORA Y DISTRIBUIDORA GALDI SpA) |
| **Instagram** | @galdi_banqueteria |

⚠️ Estos datos deben coincidir siempre con lib/businessSchema.ts y con Google Business Profile. Fuente de verdad para el schema del sitio: lib/businessSchema.ts

---

## 📋 Historial de jornadas (resumen)

- **04-08-2026** — Auditoría de credibilidad Bloque 2 completa: plazos, delivery unificado 6 comunas, claims de conservantes acotados a elaboración propia, "100%" eliminado de contenido, "mismo día"→"por encargo" (17 casos), degustación condicionada a cotización confirmada (13 menciones), torta bodas XL sin comprometer 4 pisos, Vegetariana/Queso corregidos en Catalogo.tsx · /dia-del-padre y /dia-de-la-madre perennizadas (sin fechas duras, migradas a businessSchema()) · Distribución a almacenes retirada de metadata/Hero, tab B2B oculto tras `B2B_ACTIVO=false` (código intacto) · Hero Fiestas Patrias: empanada ponderada 3x (posiciones 0,3,6), ahora es la imagen LCP · Gestión: 6 empanadas corregidas docena→unidad + Empanada de Queso creada ($2.700)
- **20-07-2026** — 2 landings geo migradas a custom: cumpleanos-maipu (commit 593562e) y delivery-maipu como hub de derivación (commit 82c213a) · 3 fixes SEO (commit 1e7ef49): refactor tarjeta "Arma tu Torta" (HTML inválido resuelto, anchor 136→13 chars), Franja Eventos con stretched link pattern, role="presentation" en flores decorativas · scripts/analizar_anchors.mjs creado · decisiones de negocio: pan artesanal descartado del patrón SEO, pedido mínimo delivery $15.000, política de despacho actualizada (rangos, no montos fijos), TUU descartado
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

📄 **Detalle expandido de jornadas anteriores a 04-07-2026 → [CHANGELOG.md](./CHANGELOG.md)**

---

## Jornada 03-08-2026

### Fiestas Patrias 2026 — bloque temporal en /empanadas-maipu

Decisión estratégica previa: se evaluó con estudio de mercado la creación de
DOS líneas nuevas. Resultado:
- **Caja dieciochera de mercadería no perecible (modelo distribuidor/reventa):
  DESCARTADA.** Razones: margen bruto ~7% (compra en segundo eslabón de la
  cadena, no compite con supermercados), barrera sanitaria insalvable (requiere
  resolución de "Bodega de Alimentos No Perecibles", 20-30 días hábiles de
  tramitación = imposible para el 18-09-2026), ciclo de caja negativo por Ley
  de Pago a 30 días, y falta de espacio físico (200 cajas = 5,4 m³).
- **Cajas de empanadas por docena: APROBADA** (decisión previa, no dependía
  del estudio).

Decisión de implementación: NO se creó página nueva. Se enriqueció la página
existente /empanadas-maipu para no fragmentar autoridad SEO.

Diagnóstico GSC previo (últimos 3 meses, filtro página /empanadas-maipu):
62 impresiones, 1 clic, posición media 8,02. Solo 2 consultas activas
("empanadas maipu" pos 9,08 / "empanadas en maipu" pos 9,17). 92% del tráfico
es móvil. Conclusión: la página está indexada y rankea, pero compite por
keywords genéricas dominadas por el Local Pack. El bloque estacional busca
capturar keywords de cola larga con menos competencia.

Cambios aplicados (todos marcados con comentarios
`/* === FIESTAS PATRIAS 2026 — INICIO (revertir después del 18-09) === */`):
- Metadata: title, description y keywords estacionales (originales comentados)
- H1 y subtítulo del hero con ángulo dieciochero + precio visible
- Sección nueva con tabla de 2 tramos de precio mayorista
- 3 FAQs nuevas al inicio del array (entran automáticamente al schema FAQPage)
- Constante waUrlFiestasPatrias para CTA WhatsApp dedicado

**Tabla de precios vigente (venta mayorista por docena):**
| Volumen | Precio unidad | Precio docena |
|---|---|---|
| 1 a 2 docenas | $2.700 | $32.400 |
| 3 o más docenas | $2.500 | $30.000 |

⚠️ REVERSIÓN PENDIENTE después del 18-09-2026: buscar todos los comentarios
`FIESTAS PATRIAS 2026` en app/empanadas-maipu/page.tsx y restaurar los valores
originales comentados.

### Auditoría del sitio — Bloque 1 y 4 (datos duros + consistencia técnica)

Creado `lib/businessSchema.ts` como fuente única de verdad del schema
LocalBusiness. Exporta `GALDI_BUSINESS` y el helper `businessSchema(overrides)`.

11 archivos refactorizados para heredar de ahí (10 páginas + layout.tsx):
layout, empanadas-maipu, tortas-bodas-maipu, cumpleanos-maipu, coctel-maipu,
coffee-break-maipu, matrimonios-maipu, tortas-maipu, delivery-maipu,
pan-artesanal-maipu.

Errores corregidos:
- **Código postal:** era 9250000 (código genérico de la comuna de Maipú) en 8
  páginas. Corregido a **9260057**, que es el que Google Business Profile tiene
  registrado para la dirección exacta. (Nota: 9293891 que figuraba en notas
  internas tampoco coincidía con GBP.)
- **Nombre del negocio:** unificado a **"Galdi SPA - Pastelería- Panadería -
  Eventos"**, el nombre exacto de GBP (antes había dos variantes).
- **Reseñas:** aggregateRating actualizado de 54 a **72** (dato real al
  03-08-2026).
- **Dirección:** unificada a "Pasaje Marcos Echenique N° 809" +
  addressLocality "Las Palmas, Maipú".
- **areaServed:** de 4 a 6 comunas (agrega Padre Hurtado y Lo Prado).
- **"Jaqueline" → "Jacqueline":** 4 ocurrencias corregidas (empanadas-maipu,
  coctel-maipu, coffee-break-maipu, matrimonios-maipu).
- **Tipos unificados:** matrimonios-maipu (era LocalBusiness+FoodEstablishment)
  y pan-artesanal-maipu (era FoodEstablishment) ahora usan
  ['LocalBusiness','Bakery'] como el resto. Razón: todas comparten el mismo
  @id, declarar tipos distintos genera señales contradictorias.
- **geo y openingHoursSpecification:** ahora presentes en las 11 páginas (antes
  solo en layout).

Verificación: grep final confirmó 0 ocurrencias de `postalCode` y de
`'@id': 'https://galdi.cl/#business'` fuera de lib/businessSchema.ts.
JSON-LD generado validado con JSON.parse en out/index.html,
out/empanadas-maipu.html y out/pan-artesanal-maipu.html — idéntico byte a byte
en los 5 bloques revisados.

### REGLA NUEVA
Todo dato del negocio (nombre, dirección, teléfono, código postal, coordenadas,
horarios, reseñas, comunas, redes sociales) va EXCLUSIVAMENTE en
`lib/businessSchema.ts`. Nunca hardcodear en páginas individuales. El nombre y
el código postal deben coincidir siempre con Google Business Profile.

### Auditoría — Bloques 1, 2 y 4 ✅ completados · Bloque 3 pendiente

**Bloque 1 — Plazos/datos duros** y **Bloque 4 — Consistencia técnica de
schema** completados el 03-08-2026 (ver CHANGELOG.md).

**Bloque 2 — Credibilidad de contenido** completado el 04-08-2026: plazos,
delivery, conservantes, "mismo día"→"por encargo", degustación condicionada,
torta bodas XL, distribución a almacenes retirada, Hero Fiestas Patrias. Ver
detalle completo en CHANGELOG.md, jornada 04-08-2026.

**Bloque 3 — SEO estructural (PENDIENTE):** canibalización entre landings,
thin content en páginas que aún usan SeoPage genérico, enlazado interno.

**Hallazgos ya detectados, resueltos el 04-08-2026:**
- ~~Páginas de campaña vencidas...~~ → `/dia-del-padre` y `/dia-de-la-madre`
  perennizadas (sin fechas duras, evergreen), se mantienen en Footer/sitemap.
- ~~Ambas usan schema FoodEstablishment...~~ → migradas a businessSchema()
  (patrón unificado).
- ~~Producto "Empanada de Queso"...~~ → creado en galdi_productos vía
  /gestion ($2.700).

**Hallazgo aún sin resolver:**
- Duplicación de JSON-LD: cada página emite el bloque de layout.tsx más el
  suyo propio, ambos con el mismo @id. Google los fusiona sin conflicto (datos
  ahora idénticos), pero se podría optimizar haciendo que las landings solo
  referencien el @id.

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

### Fixes SEO — informe SEO Checker (Enlazado 82% → esperado ~100%)

**Diagnóstico (commit 1e7ef49)**
Se creó scripts/analizar_anchors.mjs (jsdom, instalado con
--legacy-peer-deps por conflicto preexistente react ^19.2.1 vs 18.3.1
en package-lock, no relacionado). Lee out/index.html tras un build y
lista anchors repetidos/largos, enlaces con query params, e imágenes
sin ALT.

**FIX 1 — Refactor tarjeta "Arma tu Torta"** (components/ServicioDetalle.tsx)
- Problema: el `<Link href="/arma-tu-torta">` envolvía TODA la tarjeta
  (nombre, botones S/M/L, botón "Elige tamaño"). HTML inválido
  (botones dentro de `<a>`) y anchor text de 136 caracteres.
- Solución: patrón "linked card" adaptado a CSS inline. La tarjeta
  contenedora tiene `position: relative`; el `<Link>` envuelve solo el
  nombre y contiene un `<span aria-hidden position:absolute inset:0
  zIndex:0>` como pseudo-elemento que hace toda la card clickeable.
  Botones S/M/L y "Elige tamaño"/"AGREGAR" con `position:relative;
  zIndex:1` para quedar por encima y capturar sus propios clicks.
- Resultado: anchor text bajó de 136 a ~13 caracteres. Botones
  interactivos funcionan sin navegar; click en nombre o área vacía sí
  navega a /arma-tu-torta.

**FIX 2 — Franja Eventos** (app/page.tsx)
- Problema: 4 paneles diagonales (Matrimonios/Cóctel/Cumpleaños/
  Corporativos) con anchor text "MatrimoniosVer más →" (label + CTA
  concatenados).
- Solución: contenedor pasó de `<a>` a `<div>`; el `<span>{svc.label}</span>`
  ahora va envuelto en un `<Link>` propio (anchor corto: "Matrimonios",
  "Cóctel", etc.); "Ver más →" queda como `<span>` plano fuera del link.
- Trade-off documentado: el patrón "linked card" del FIX 1 no aplicaba
  aquí porque el wrapper del label ya tenía `position:absolute` (el
  pseudo-elemento habría quedado anclado a un área pequeña). Se usó
  el patrón alternativo "stretched link" (Bootstrap): un segundo
  `<Link>` vacío, `position:absolute inset:0`, `aria-hidden="true"` y
  `tabIndex={-1}`, hijo directo del panel — cubre toda la tarjeta para
  click/tap y queda invisible para lectores de pantalla y navegación
  por teclado.
- Consecuencia: aparecen 4 anchors nuevos "sin texto" en el
  diagnóstico. Checkers modernos que respetan aria-hidden (Google,
  Seobility) NO deberían marcarlos como problema; si Seobility lo
  marca, es falso positivo aceptable.
- NO se aplicó `rel="nofollow"` a los enlaces con query params
  (?servicio=eventos&tab=X): son URLs internas legítimas de la SPA y
  penalizarían el crawl.

**FIX 3 — role="presentation" en flores decorativas** (app/page.tsx)
- Problema: 2 imágenes decorativas (flor-esquina-izq/der-transparent
  .webp) con `alt=""` (correcto WCAG para decorativas) que el SEO
  Checker reporta como "sin descripción ALT" al no distinguir entre
  atributo ausente y alt vacío deliberado.
- Solución: agregado `role="presentation"` junto al `alt=""` existente.
  Es la recomendación WAI-ARIA para imágenes puramente decorativas
  y muchos checkers modernos lo reconocen.

Deploy conjunto de los 3 fixes: commit 1e7ef49 (git add selectivo
excluyendo .claude/settings.local.json).

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

### Regla operativa reforzada (14-07-2026 → 20-07-2026)

- CC levanta npm run dev y lo deja corriendo.
- La verificación visual en localhost la hace Claudio personalmente.
- CC NO usa herramientas de navegador/Chrome DevTools (consume mucho
  contexto/costo en la sesión).
- En reportes, CC se limita a: qué compiló, qué pasó el chequeo de
  TypeScript, y detalle de los cambios de código — sin afirmaciones
  sobre comportamiento visual verificado por él.

### SEO
- Indexación manual solicitada en Search Console para /cumpleanos-maipu
  y /delivery-maipu.
- Pendiente: re-correr SEO Checker sobre galdi.cl en unos días para
  confirmar que el score de "Enlazado de la página" subió del 82%.

### Pendiente
- distribucion-maipu no requiere trabajo adicional (ya redirige a "/").
- Evaluar si el pedido mínimo de $15.000 se implementa como validación
  real en el carrito/checkout con Flow.
- Considerar agregar .claude/settings.local.json al .gitignore para
  que no vuelva a aparecer en git status.
