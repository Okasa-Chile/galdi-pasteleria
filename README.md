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
| Tab 5 | ✅ | Presupuestos con QR de validación + /validar-presupuesto · precio mayorista automático de empanadas |

### Características clave
- Correlativo presupuestos: COT-G105+
- QR único por presupuesto → galdi.cl/validar-presupuesto?token=XXX
- COSTOS_TALLA: estructura {mat, mdo, energia, logistica, margen} por talla
- Key del carrito compuesta: `nombre·talla`
- Talla XL exclusiva para Torta Panqueque
- `cumpleanosSlides`: 8 slides (antes 10) — imágenes cumpleanos01-08.webp renovadas
- `SeoPage.tsx`: incluye logo con link a `/` en el hero (afecta todas las páginas SEO)
- QR de validación en presupuestos: se genera en el documento padre con qrcodejs, se convierte a dataURL y se embebe como `<img>` en el HTML del popup de impresión. NO se puede generar dentro del popup: la librería no está cargada ahí.
- El QR aparece en ambas rutas de impresión (vista previa tras guardar, y reimpresión desde historial). En la ruta del formulario, `guardarPresupuesto` captura el token recién generado y llama a `vistaPreviaPresupuesto(token)` ANTES de limpiar el formulario, porque esa función lee todo desde el DOM.
- Presupuestos históricos sin campo `token` se imprimen sin el bloque QR, sin error (comportamiento defensivo).
- Precio mayorista de empanadas: desde 36 unidades (3 docenas) el precio unitario baja automáticamente de $2.700 a $2.500. Excluidos por costo de insumos: "Empanada de Mariscos" y "Empanada Queso Camarón". La exclusión es por nombre EXACTO — "Empanada de Queso" y "Empanada Queso Camarón" son productos distintos, un match por substring rompería la regla.

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
- [ ] **PENDIENTE** — Los pedidos con despacho no calculado (error de infraestructura de Google Maps) se marcan con prefijo ⚠️ únicamente en la descripción enviada a Flow, porque `flowConfirmar` no persiste el detalle completo del pedido en Firestore. Esto depende de que alguien lea la descripción en el panel de Flow. Cuando se resuelva la persistencia completa del pedido en Firestore, migrar este flag a un campo propio en `galdi_pedidos`.
- [ ] **Campaña Día del Niño** (09-08-2026)
- [ ] **REVERSIÓN Fiestas Patrias post 18-09-2026** — buscar comentarios `FIESTAS PATRIAS 2026` en `app/empanadas-maipu/page.tsx` y `components/Hero.tsx` y restaurar los valores/array originales comentados
- [ ] **Auditoría Bloque 3** (SEO estructural) — ver sección de Auditoría arriba
- [ ] **Revisar costos Mariscos y Queso Camarón** en /gestion — comparten $850 de materiales con Pino, pero sus insumos (mariscos, camarones) son más caros; el costo no refleja la diferencia real
- [ ] **components/Servicios.tsx es código huérfano** — no está importado en ningún lugar del repo (confirmado 04-08-2026), evaluar eliminarlo
- [ ] **prod-empanada.webp sobredimensionado** — 2400×1792px sin variante responsive (`sizes`), ahora es LCP de la home vía el bloque estacional del Hero; revisar/optimizar si la ponderación se vuelve permanente
- [ ] **Evaluar cambio de title del home** — se dejó fuera a propósito el 04-08-2026 para poder medir el efecto de la description por separado
- [ ] **Revisar "tortas en maipu"** (posición 11,1, CTR 3%) vs "tortas maipú" (posición 7,0, CTR 10,7%) en Search Console

### Bloque 3 — SEO estructural (diagnóstico 04-08-2026)

**Línea base medida el 04-08-2026 (GSC, 3 meses):**
- 462 clics, 9.250 impresiones, CTR 5%, posición media 7,4
- "pasteleria maipu": 745 imp, 27 clics, CTR 3,6%, pos 6,2 — la de
  mayor volumen y peor CTR relativo
- Consultas equivalentes en posiciones similares rinden 5,8-8,3%
- "tortas en maipu": pos 11,1, CTR 3% vs "tortas maipú": pos 7,0,
  CTR 10,7% — posible página equivocada para una de las variantes
- "galdi" (marca): pos 2,4, CTR 34,4% — algo aparece antes que el
  sitio propio al buscar la marca

**Google Business Profile:**
- Galdi está CUARTO en el listado local de "pasteleria maipu", fuera
  del Local Pack (que muestra 3)
- Con 5,0 y 72 reseñas supera en calificación a los tres de arriba
  (El Parrón 4,2/299, Melinda 4,8/17, Dulce Limón 4,7/56)
- 268 interacciones del perfil en 6 meses vs 462 clics web: el canal
  principal es el resultado web, no el Local Pack
- Descripción del perfil corregida el 04-08 (sin distribución a
  almacenes, comunas alineadas con el sitio)
- [ ] **PENDIENTE:** configurar Horario especial para feriados,
  especialmente 18-19 de septiembre

**Próximo paso del Bloque 3:**
- [ ] Revisar GSC → Rendimiento → 3 meses → pestaña PÁGINAS
- Grupos con posible canibalización:
  - Tortas: /tortas-maipu, /tortas-bodas-maipu, /dia-de-la-madre,
    /arma-tu-torta, /productos
  - Eventos: /coctel-maipu, /coffee-break-maipu, /cumpleanos-maipu,
    /matrimonios-maipu
  - Delivery: /delivery-maipu, /productos, home

**Nota:** `reviewCount` en `lib/businessSchema.ts` es manual (hoy 72,
hardcodeado, no viene de ninguna variable ni fuente automática). Las
reseñas crecen ~14/mes, revisar periódicamente.

**Actualización 05-08-2026 — Canibalización investigada con GSC real:**

Export de 3 meses (Páginas.csv) + filtrado por consulta confirmó:

- **Grupo Tortas — canibalización real:** en 5/5 variantes de keyword
  ("tortas maipu", "tortas en maipu", "tortas maipú", "tortas a
  domicilio maipú", "tortas en maipú"), el home se lleva más clics
  que `/tortas-maipu`, la página dedicada. **RESUELTO (06-08-2026)** —
  ver detalle abajo.
- **"torta bodas maipú" — fragmentación en 5 páginas:** 273
  impresiones repartidas entre home (126), `/tortas-bodas-maipu` (46),
  `/matrimonios-maipu` (39), `/productos` (32), `/cumpleanos-maipu`
  (30). 0 clics. Página canónica definida: `/tortas-bodas-maipu`.
  **RESUELTO (06-08-2026)** — ver detalle abajo.

**Fix Grupo Tortas — enlazado interno (06-08-2026):**

**Causa estructural encontrada:** los 13 enlaces SEO del Footer estaban
detrás de `{seoOpen && ...}` — renderizado condicional sobre `useState`.
En static export no existían en el HTML, así que las 13 landings no
recibían ningún enlace interno desde el home ni desde `/productos`.
Google no hace clic en botones para descubrir enlaces.

**Fix aplicado:** el bloque de links del Footer ahora se renderiza
siempre y se oculta con `display: seoOpen ? 'flex' : 'none'`.
Comportamiento visual idéntico para el usuario.

**Causa secundaria:** home y `/productos` comparten
`ServicioDetalle.tsx`, que renderiza el catálogo completo de Tortas —
competía por contenido con `/tortas-maipu`. Fix: bloque de derivación
con anchor text explícito hacia `/tortas-maipu` y `/tortas-bodas-maipu`,
agregado una sola vez en el componente (se propaga a ambas páginas).

**También:** `/tortas-maipu` no enlazaba a `/tortas-bodas-maipu` (era la
única del grupo que no cerraba el círculo). Agregado.

**No se tocó** el catálogo de compra ni los productos listados.

**REGLA NUEVA:** nunca poner enlaces internos detrás de un renderizado
condicional por `useState` (`{cond && <a>}`). Si deben ocultarse,
renderizarlos siempre y controlar la visibilidad con CSS. En static
export, el estado inicial es lo único que queda en el HTML.

**Medición:** requiere 2-4 semanas en GSC. No forzar conclusiones antes.
- **"banquetes maipú" — fragmentación en 4 páginas:** 232 impresiones
  entre `/coctel-maipu` (190), `/matrimonios-maipu` (186), home (17),
  `/coffee-break-maipu` (15). 0 clics. Página canónica definida:
  `/coctel-maipu`. Pendiente de resolver.
**"canapés a domicilio maipu" — RESUELTO 06-08-2026 (diagnóstico previo
era incorrecto).** Datos GSC reales (3 meses): posición media 3,5, CTR
9,4%, 3 clics, 32 impresiones. El snippet NO era el problema — ese CTR en
esa posición es sano. El reparto por página mostró canibalización: home
3 clics/23 imp, /matrimonios-maipu 1/3, /coctel-maipu 0 clics/19 imp,
/productos 0/7.

Causa: los 4 paneles de la Franja Eventos en app/page.tsx apuntaban al
propio home con query params (/?servicio=eventos&tab=X) para abrir el
overlay. El home concentraba una sección prominente sobre eventos cuyos
enlaces internos apuntaban a sí mismo; las landings de eventos no recibían
ningún enlace desde ahí.

Fix (opción B): se conservan los paneles y el overlay sin cambios, y se
agrega debajo de la franja una nav con 4 enlaces textuales de anchor
descriptivo hacia /matrimonios-maipu, /coctel-maipu, /cumpleanos-maipu y
/coffee-break-maipu. No se tocó title/description de /coctel-maipu.

**LECCIÓN DE PROCESO:** el diagnóstico "problema de snippet" se había
anotado sin mirar la posición media ni el reparto por página. Antes de
concluir que un CTR bajo es culpa del copy, verificar SIEMPRE posición
media y pestaña PÁGINAS filtrada por esa consulta — un CTR de 0% en una
página que comparte consulta con otras 3 es canibalización, no snippet.

**Medición:** 2-4 semanas en GSC. Este cambio se despliega junto a la
ventana de medición del fix del Footer (06-08-2026), pero afecta a un
grupo de páginas distinto (Eventos vs. Tortas), así que son separables.
- **`/delivery-maipu`:** cero impresiones en las 337 consultas
  registradas — no aparece en ninguna búsqueda. Investigar aparte
  (¿indexación? ¿la keyword simplemente no tiene volumen?).

**Sitemap migrado a generación automática (06-08-2026):**
`public/sitemap.xml` era estático y escrito a mano; sus `lastmod` estaban
congelados y no reflejaban cambios reales. Migrado a `app/sitemap.ts`, que
Next genera en cada build. Se agregó `/arma-tu-torta`, que faltaba.

REGLA NUEVA: al crear una landing nueva, agregarla a `app/sitemap.ts`.
Nunca crear archivos `sitemap.xml` manuales en `public/` — ganan sobre el
generado por Next y lo dejan sin efecto.

**noindex en /experimental/hero-editorial:** ruta de desarrollo en
producción. Ya tenía `robots: { index: false, follow: false }` en su
metadata — verificado, no requirió cambio.

**Aclaración de diagnóstico — `/delivery-maipu`:** no estaba indexada
pese a figurar en el sitemap. La causa no era el sitemap sino la falta de
enlaces internos crawleables (bug del Footer, corregido en `e5e930b`).
Estar en el sitemap no basta — sin enlaces internos Google considera la
página poco importante y no la indexa ("Descubierta: actualmente sin
indexar").

**Investigado y resuelto — NO era canibalización:** se sospechó que
`matrimonios-maipu` competía con `coctel-maipu` por "banquetería"
(H1, 2 H2 y schema name de `matrimonios-maipu` usaban ese término
intensamente). Investigación confirmó que son productos de negocio
reales y distintos (cena servida/sentada para matrimonios vs. cóctel
de pie para eventos en general), con puente bidireccional de FAQs ya
construido correctamente entre ambas páginas. El único problema real
era que el title/description de `matrimonios-maipu` decía "Torta de
Novios y Mesa de Dulces" sin mencionar la banquetería/cena servida que
la página sí ofrece — desalineación title↔contenido, no canibalización
de arquitectura. Corregido en commit `a075221` (05-08-2026).

**Lección de proceso:** `python -c "print(...)"` con texto acentuado
en la consola de Windows de esta sesión corrompe tildes por codepage
incorrecto (ej. "Maipú" → "Maip�"), aunque el dato en disco esté
íntegro. No es corrupción real de datos — usar `sed`/`grep`/lectura
de archivo directa en vez de `print()` de Unicode para verificar
contenido con tildes.

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

- **06-08-2026** — Fix GSC "La reseña tiene varias puntuaciones agregadas":
  eliminado aggregateRating duplicado en JSON-LD (mismo @id emitido por
  layout.tsx y por las 11 landings). businessSchema() ahora devuelve solo
  una referencia por @id; GALDI_BUSINESS es el nodo canónico único emitido
  desde layout.tsx. aggregateRating retirado por completo (LocalBusiness no
  es elegible para review snippets, regla self-serving reviews de Google).
- **04-08-2026** — Auditoría de credibilidad Bloque 2 completa: plazos, delivery unificado 6 comunas, claims de conservantes acotados a elaboración propia, "100%" eliminado de contenido, "mismo día"→"por encargo" (17 casos), degustación condicionada a cotización confirmada (13 menciones), torta bodas XL sin comprometer 4 pisos, Vegetariana/Queso corregidos en Catalogo.tsx · /dia-del-padre y /dia-de-la-madre perennizadas (sin fechas duras, migradas a businessSchema()) · Distribución a almacenes retirada de metadata/Hero, tab B2B oculto tras `B2B_ACTIVO=false` (código intacto) · Hero Fiestas Patrias: empanada ponderada 3x (posiciones 0,3,6), ahora es la imagen LCP · Gestión: 6 empanadas corregidas docena→unidad + Empanada de Queso creada ($2.700) · Trayectoria de 3 años incorporada en Nosotras.tsx y metadata (description/openGraph 155 caracteres), motivada por diagnóstico de CTR bajo en Search Console para "pastelería maipu"
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

## Jornada 13-08-2026

### Producto nuevo: Torta de Lucuma
- Imagen procesada con Gemini/Nano Banana desde foto real, estilo catalogo
  (fondo ambar difuminado, cake stand, iluminacion calida). Guardada como
  `public/images/torta-lucuma.webp`.
- Producto creado en `galdi_productos` clonando estructura de costos de
  Torta Selva Negra (mismo precio, costosTalla S/M/L identicos).
- Agregada en `Catalogo.tsx` (mapa imagenes + categoria Tortas) y
  `ServicioDetalle.tsx` (productosDelivery.Tortas), sin nombreVisible.

### Producto nuevo: Crema Diplomatica (Arma tu Torta)
- Dos ilustraciones nuevas estilo acuarela botanica (igual al resto del
  configurador): `relleno-crema-diplomatica.webp` y
  `deco-crema-diplomatica.webp`, generadas directo en Gemini sin foto base.
- Agregada como opcion de relleno (id `crema-diplomatica`) y decoracion
  (id `crema-diplomatica-deco`) en `components/ArmaTuTorta.tsx`.

### Producto nuevo: Empanada de Queso (frita) visible en /productos
- Ya existia en Firestore desde el 04-08 pero faltaba en
  `productosDelivery.Empanadas` de `ServicioDetalle.tsx` -- no se mostraba
  en el catalogo de pedidos aunque existiera en gestion.
- Imagen real procesada con Gemini (seleccion de 3-4 empanadas de una
  bandeja de produccion, re-escenificadas en el estilo del resto del
  catalogo de empanadas): `public/images/empanada-queso-frita.webp`.
- Se detecto inconsistencia de unidad: el producto quedo creado el 04-08
  con `unidad: 'unidad'` en vez de `'docena'` (que es lo que tienen las
  otras 5 empanadas en Firestore, verificado en vivo). Corregido a
  `docena` en el documento Firestore. Las otras 5 NO se tocaron.

### Torta de Pina -- foto real reemplazando placeholder
- `public/images/torta-pina-new.webp` reemplazada por foto real del
  producto, procesada en Gemini en formato horizontal 2:1 (mismo estilo
  que el resto del catalogo: mesa de madera oscura, luz calida lateral,
  cake stand blanco). Mismo nombre de archivo, no requirio cambios de
  codigo.

### Copy -- Nosotras.tsx
- Eliminada mencion a "pan artesanal que horneamos cada semana" en el
  parrafo de Nuestra Historia (no correspondia -- no es una promesa que
  se cumpla de forma literal semanal). Reemplazado por "cada dulce que
  preparamos".

### Deploy
- `npm run build` + `firebase deploy --only hosting` -- publicado en
  https://galdi-web.web.app
- NOTA: `galdi-pasteleria` no tiene script `npm run typecheck` en
  package.json (solo `dev`, `build`, `start`, `lint`) -- el build ya
  corre TypeScript internamente. No usar `npm run typecheck` en el
  flujo de deploy de Galdi (si en Okasa).

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

**Hallazgos resueltos:**
- ~~Duplicación de JSON-LD: cada página emite el bloque de layout.tsx más el
  suyo propio, ambos con el mismo @id.~~ → **RESUELTO 06-08-2026.** Ver
  "Fix aggregateRating duplicado (GSC)" más abajo.

### Fix aggregateRating duplicado (GSC) — 06-08-2026

GSC reportó error crítico "La reseña tiene varias puntuaciones agregadas".
Causa: layout.tsx emitía businessSchema() en el head de todas las páginas y
11 landings emitían el mismo objeto (mismo @id, mismo aggregateRating) en su
propio @graph.

Además se verificó que aggregateRating en LocalBusiness/Organization NO es
elegible para review snippets (regla de self-serving reviews de Google): el
marcado no producía estrellas y sí generaba riesgo (reseñas agregadas de un
tercero + sin contenido visible de respaldo). Se eliminó por completo.

Cambios: solo lib/businessSchema.ts y app/layout.tsx. Las 11 landings no se
tocaron.

**REGLA NUEVA — Arquitectura JSON-LD**
- GALDI_BUSINESS es el nodo canónico completo. Se emite UNA sola vez en todo
  el sitio, desde app/layout.tsx.
- businessSchema() devuelve solo una REFERENCIA por @id ({@type, @id} +
  overrides seguros). Las páginas la usan dentro de su @graph para colgar
  propiedades propias (ej. hasOfferCatalog) sin redeclarar la entidad.
- Los overrides `url` y `description` se descartan a propósito: son de la
  entidad negocio, no de la landing. La URL de página va vía canonical.
- NO reintroducir aggregateRating. Si algún día se quieren estrellas reales,
  la vía es schema Product en productos individuales con reseñas reales
  visibles en la página.

### Bloque 3 — CERRADO 06-08-2026

Hallazgo estructural principal: los 13 enlaces SEO del Footer estaban tras
`{seoOpen && ...}` y no existían en el HTML estático. Las landings no
recibían ningún enlace interno crawleable. Verificado empíricamente:
`tortas-bodas-maipu` en `out/index.html` pasó de 0 a 2 ocurrencias.

**LECCIÓN DE MÉTODO:** dos diagnósticos del Bloque 3 estaban mal anotados y
se corrigieron con datos reales de GSC.
- "canapés a domicilio maipu — problema de snippet" → era canibalización
  (pos 3,5, CTR 9,4%, sano).
- "/delivery-maipu 0 impresiones" → la página no estaba indexada, pese a
  figurar en el sitemap. Estar en el sitemap no basta sin enlaces internos.

REGLA: antes de concluir causa por CTR bajo, verificar SIEMPRE posición
media y pestaña PÁGINAS filtrada por la consulta.

### Pendientes de calendario

- 18-09-2026: revertir bloque Fiestas Patrias en `empanadas-maipu` y `Hero`.
- 2-4 semanas: medir efecto de los fixes de enlazado en GSC.

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

## Jornada 17-08-2026 — QR de presupuestos + precio mayorista de empanadas

### QR de validación (commit c0fd54d)

**Hallazgo:** el QR de presupuestos no estaba roto — nunca existió. El README lo daba por implementado, pero `grep "QRCode"` en `public/gestion/index.html` no arrojaba resultados: la librería `qrcode.min.js` se cargaba en el `<head>` sin usarse en ningún punto. La mitad consumidora del sistema (`/validar-presupuesto`, que busca por `where('token','==',token)`) sí estaba construida y funcionando.

Diferencia arquitectónica con Okasa, que conviene tener presente: en Okasa el QR lo genera Python (`generar_cotizacion.py` con qrcode + Pillow) y se inserta como PNG en el Excel vía openpyxl. En Galdi todo ocurre en el navegador, así que el QR debe generarse en cliente. La solución de Okasa no es portable acá.

Implementación:
- `generarQRDataURL(token)`: crea el QR en un div oculto del documento padre, extrae el canvas a dataURL y limpia el div. Retorna null ante cualquier fallo.
- `bloqueQRHtml(token)`: devuelve el fragmento HTML del QR, o string vacío si no hay token.
- `vistaPreviaPresupuesto` pasó a aceptar un parámetro opcional `token`.
- `guardarPresupuesto` captura el token en la rama `addDoc` y dispara la vista previa antes del bloque de limpieza del formulario.

Se descartó la alternativa de poner el QR solo en la reimpresión desde historial: habría producido dos versiones distintas del mismo COT-G según desde dónde se imprimiera.

### Precio mayorista de empanadas (commit posterior)

Detectado a partir del presupuesto de prueba COT-G110: 95 empanadas de pino quedaron a $2.700/un cuando por volumen correspondía $2.500. El precio se autocompleta del catálogo y las socias tenían que acordarse de bajarlo a mano en cada pedido grande.

Regla implementada en `presRecalcLinea`, enganchada al `oninput` de la cantidad:
- ≥36 unidades → $2.500/un
- <36 unidades → restaura el precio base del catálogo
- Excluidos siempre: Empanada de Mariscos y Empanada Queso Camarón
- Marca visual dorada en la fila cuando aplica, para que la socia vea por qué cambió el precio
- El campo de precio sigue readOnly, consistente con el resto del panel

**Bug evitado durante la implementación:** la primera versión restauraba `data-precio-base` para cualquier producto fuera de la regla mayorista, sin filtrar por categoría. Eso habría borrado el extra de $1.500 del baño de chocolate en Queques cada vez que se tocara la cantidad, porque `data-precio-base` no incluye ese recargo. Se corrigió acotando toda la lógica al bloque `if (catProd === 'Empanadas')`.

### Pendiente para la próxima sesión

- **Uso del espacio del papel en la impresión de presupuestos:** los presupuestos cortos (ej. COT-G110, una sola línea) terminan a media hoja y el QR con el pie quedan flotando al centro, lo que se lee como documento cortado. Propuesta: anclar el bloque final al fondo con `min-height` en el contenedor y `margin-top:auto` en el pie. Requiere probar con un presupuesto largo (tipo COT-G108) antes de darlo por bueno: usar alturas de viewport en impresión es causa clásica de páginas en blanco fantasma.

---

## Jornada 30-08-2026 — Delivery: modelo final por RADIO EN LÍNEA RECTA

Reemplaza todo lo de la jornada 18-08-2026 (tramos por km driving) y el intento
intermedio de "comuna primero". **Este es el modelo en `lib/deliveryPricing.ts`.**

### Modelo

- El precio depende **solo de la distancia en línea recta (Haversine)** entre
  `ORIGEN_GALDI` (`-33.4776144, -70.7521309`) y la coordenada del cliente.
  Bandas concéntricas de precio plano.
- **Por qué recta y no ruta:** el local está embolsado en Rinconada de Maipú. El
  factor de rodeo driving/recta medido va de **1,3×** (rumbo NE por autopista) a
  **2,9×** (comunas pegadas: Lo Prado, Pudahuel), sin patrón usable. Calibrar por
  ruta daba precios incoherentes entre vecinas (Cerrillos salía más lejos que Lo
  Prado; Padre Hurtado a ~49 km siendo limítrofe con Maipú) y gastaba una llamada
  extra a Distance Matrix por request. La recta es estable, auditable y dibujable.

### Cortes de banda (calibrados sobre mapa el 30-08-2026)

| Hasta (km recta) | Precio |
|---|---|
| 0,5 | gratis |
| 3,8 | $3.000 |
| 8,5 | $5.000 |
| 11,5 | $6.000 |
| 15 | $8.000 |
| 19 | $10.000 |
| 25 | $12.000 |
| 31,1 | $14.000 |
| > 31,1 | fuera de radio → se cotiza por WhatsApp |

`TECHO_DELIVERY_KM = 31.1`. Todo el Gran Santiago urbano cae bajo el techo
(Colina, la más lejana de la RM revisada, quedó a ~31 km recta y dentro).

### Cambios de código

- `lib/deliveryPricing.ts` reescrito: `BANDAS_DELIVERY`, `TECHO_DELIVERY_KM`,
  `distanciaRectaKm()`, `calcularCostoDespacho(destino: {lat,lng})`. Se
  **eliminaron** `PRECIOS_COMUNA`, `DIRECCIONES_REFERENCIA_COMUNAS`,
  `CENTROIDES_COMUNAS`, `TRAMOS_DELIVERY`, `TECHO_GLOBAL_KM`, `recargoPorExceso`,
  `calcularCostoPorKm`. `PRECIOS_COMUNA` y las direcciones de referencia se
  movieron a `scripts/calibracion-data.mjs` (solo herramientas de validación);
  los centroides se borraron (en un modelo por radio no juegan ningún rol).
- `extraerComuna()` y `normalizarComuna()` quedan en `lib/`, pero **ninguna
  función de precio las llama** — solo se usan para logging y para mostrar la
  comuna en el pedido.
- Cloud Function `calcularCostoDelivery`: ahora hace **una sola llamada a Google
  (Geocoding)**. Se quitó Distance Matrix. Contrato de respuesta:
  - Éxito: `{ km, costoDelivery, requiereCotizacionManual: false, comuna }` —
    **`km` ahora es distancia en línea recta**, no de ruta (el número mostrado al
    cliente es más chico que antes).
  - Fuera del radio: `{ km, costoDelivery: null, requiereCotizacionManual: true, motivo: 'fuera_de_radio', comuna }`.
  - No ubicada: HTTP 422 `{ error }`. Infra caída: HTTP 200 `{ km: null, …, motivo: 'error_infraestructura' }` (sin cambios).
- `scripts/check-delivery-pricing-sync.mjs` actualizado a los nuevos exports
  (compara `BANDAS_DELIVERY`, `TECHO_DELIVERY_KM`, `distanciaRectaKm`,
  `calcularCostoDespacho`, `extraerComuna`, `normalizarComuna`).

### Herramienta de validación (queda en el repo, uso puntual)

- `scripts/generar-tabla-validacion.mjs` geocodifica 41 comunas urbanas de la RM
  y escribe `public/validacion-delivery.json` (recta + coords + banda, sin
  hornear la clasificación).
- `public/validacion-delivery.html` — mapa Leaflet/OSM con círculos concéntricos
  + listado, **sliders para ajustar cada radio en vivo** y reclasificar las 41
  comunas al instante. Exporta `bandas-delivery.json` con los radios finales.
  `noindex`. Se sirve con `npm run dev` en `/validacion-delivery.html`.
- Los cortes de arriba salieron de ese `bandas-delivery.json`.

### Diferencias con la lista por comuna que se habló en mayo (registro, no bug)

El modelo por radio es la política vigente. Estas comunas quedan en una banda
distinta al precio que se había mencionado el 25-05-2026:

| Comuna | Banda (radio) | Se había dicho |
|---|---|---|
| Cerrillos, Estación Central, Pudahuel | $5.000 | $3.000 |
| Santiago Centro | $5.000 | $6.000 |
| Providencia | $8.000 | $7.000 |
| Padre Hurtado | $8.000 | $5.000 |
| Lo Barnechea | $14.000 | $12.000 |

---

## Jornada 18-08-2026 — Sistema de delivery por radio de km

> **Superado por la jornada 30-08-2026.** Los tramos por km driving y el "PENDIENTE
> CRÍTICO — Recalibrar tramos" de esta sección se resolvieron pasando al modelo por
> radio en línea recta. Se conserva por contexto histórico.

### Sistema de delivery por radio de km (en producción, tramos pendientes de recalibrar)

- `lib/deliveryPricing.ts` es la fuente única de verdad: `ORIGEN_GALDI = { lat: -33.4776144, lng: -70.7521309 }`, `PEDIDO_MINIMO_DELIVERY = 15000`, tabla de 10 tramos.
- Cloud Function `calcularCostoDelivery` (región `us-central1`, misma que `flowCrearOrden`/`flowConfirmar`): Geocoding API → Distance Matrix API → aplica la tabla de tramos. API key desde Secret Manager (`GOOGLE_MAPS_API_KEY_GALDI`). Distingue `fuera_de_radio` (>24 km, bloquea el pago automático) de `error_infraestructura` (timeout/cuota/caída de la API: responde HTTP 200 y permite avanzar el pedido igual, marcado con prefijo ⚠️ en la descripción que llega a Flow, para no bloquear ventas por una caída de Google).
- `functions/src/deliveryPricing.ts` es una copia necesaria de `lib/deliveryPricing.ts` — Firebase solo empaqueta `functions/` al desplegar Cloud Functions, no puede importar directo desde `lib/`. `scripts/check-delivery-pricing-sync.mjs` compara ambos objetos en memoria y aborta con exit 1 si divergen; enganchado en `prebuild` y en ambos `predeploy` de `firebase.json` para que una edición a un solo lado nunca llegue a producción sin que la otra copia se actualice.
- Integrado en 3 puntos del sitio: checkout (`app/carrito`), `/gestion` (Tab 5), y un widget en `/delivery-maipu`. El cálculo corre solo al hacer clic en el botón correspondiente, nunca mientras el usuario tipea la dirección (evita gastar cuota de API en cada tecla).
- Código postal de Galdi corregido a `9293891` (el `9260057` registrado el 03-08-2026 era erróneo).

### PENDIENTE CRÍTICO — Recalibrar tramos

Los montos actuales son inviables comercialmente. Prueba con 13 direcciones reales (McDonald's de la Región Metropolitana, verificadas vía Places API):

| Dirección | Distancia | Tramo actual |
|---|---|---|
| Av. Américo Vespucio 399, Maipú | 3,3 km | $5.000 |
| Av. 5 de Abril 81, Maipú | 6,5 km | $8.000 |
| Río Snake, Lo Prado | 9,2 km | $11.000 |
| República 40, Santiago Centro | 15,1 km | $17.000 |
| Paseo Ahumada | 24,4 km | fuera de radio |

Tres de esas direcciones están en Maipú, donde hoy se cobra $3.000 — el alza real sería de 60-160% para clientes actuales, y Santiago Centro queda prácticamente fuera de cobertura.

**Causa:** las rutas reales en Santiago son mucho más largas que la línea recta, y los tramos de 3 km fueron definidos con intuición de línea recta, no con distancias de ruteo reales.

**Método acordado para recalibrar:** Claudio define cuánto DEBERÍA costar el delivery en 4 casos de referencia, y los tramos se derivan desde ahí — sin aplicar un factor de corrección arbitrario sobre la tabla actual.

### Adicional

- Prompt de investigación de precios de empanadas de pino para Fiestas Patrias 2026 (Gemini Deep Research) generado, pendiente de ejecutar.
- Recordatorio vigente: revertir el bloque de Fiestas Patrias en `/empanadas-maipu` después del 18-09-2026.
