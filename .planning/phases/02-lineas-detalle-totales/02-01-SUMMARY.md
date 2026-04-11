---
phase: 02-lineas-detalle-totales
plan: 01
subsystem: ui
tags: [vanilla-js, html, css, firebase, firestore, dynamic-rows, real-time-calc]

# Dependency graph
requires:
  - phase: 01-tab-formulario-base
    provides: Tab 5 panel structure, Cards 1-5, pres-* ID prefix convention, prods[] array in memory, cargarNumeroPres function
provides:
  - Card 6 (Detalle del Presupuesto) with dynamic line rows, catalog cascade, and mode toggle
  - Card 7 (Totales) with real-time subtotal/discount/total calculation
  - 8 window.* JS functions: presAgregarLinea, presEliminarLinea, presSetModo, presCargarProductos, presAutocompletarPrecio, presRecalcLinea, presRecalcTotales, presSetDescTipo
affects:
  - 03-vista-previa-impresion (will read line data from .pres-linea rows and totals from Card 7)
  - 04-guardar-firestore (will collect line data and totals for saving to galdi_presupuestos)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dynamic row append: createElement div, set innerHTML from template string, appendChild — preserves input state vs full re-render"
    - "Catalog cascade via in-memory prods[] filter: (p.cat || p.categoria) fallback for Firestore field name variations"
    - "Real-time recalc chain: oninput -> presRecalcLinea -> presRecalcTotales (same pattern as calcMeta in Tab 2)"
    - "window.* assignment for all interactive functions inside <script type=module> to allow inline onclick access"

key-files:
  created: []
  modified:
    - public/gestion/index.html

key-decisions:
  - "Use p.precio (not precioFinal) as sale price field — confirmed from DEFAULTS array and Tab 3 poblarProductos usage"
  - "Read cant/precio from input elements in presRecalcTotales loop instead of parsing formatted string from .pres-subtotal-linea — avoids NaN from Chilean peso format with dot separators"
  - "Derive category list dynamically from prods array with Set — future-proof as new categories are added"

patterns-established:
  - "pres- prefix for all Tab 5 IDs and CSS classes — established Phase 1, continued here"
  - "Mode toggle active state: background:var(--dark), color:var(--gold), fontWeight:600 — same as .cat-btn.active"
  - "presSetDescTipo sets max=100 attribute for pct mode, removes max for fixed mode"

requirements-completed: [LINE-01, LINE-02, LINE-03, LINE-04, TOT-01, TOT-02, TOT-03]

# Metrics
duration: 3min
completed: 2026-04-11
---

# Phase 02 Plan 01: Líneas de Detalle + Totales Summary

**Dynamic line-item rows with catalog cascade (prods[] in-memory filter) and real-time Chilean peso totals with % or fixed discount toggle**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-11T22:47:17Z
- **Completed:** 2026-04-11T22:50:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Card 6 (Detalle del Presupuesto): column header row, empty state, dynamic line rows with catalog/manual mode toggle, per-row subtotal display
- Card 7 (Totales): discount toggle (% / $ Fijo) with real-time subtotal/discount/total in result-box dark style
- 8 `window.*` JS functions: add/delete rows, mode switching, catalog cascade from in-memory `prods[]`, real-time calculation chain

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Card 6 and Card 7 HTML + CSS** - `bfa2f90` (feat)
2. **Task 2: Add 8 JS functions for line management, catalog cascade, and real-time totals** - `c2d767f` (feat)

**Plan metadata:** (created below)

## Files Created/Modified
- `public/gestion/index.html` - Added Cards 6 and 7 HTML (50 lines), CSS `.pres-linea:last-child` + responsive rules, and 8 JS functions (169 lines)

## Decisions Made
- Used `p.precio` (not `precioFinal`) — confirmed from DEFAULTS array and Tab 3 `poblarProductos` usage; UI-SPEC used `precioFinal` as a conceptual name only
- Read `cant`/`precio` from input elements in `presRecalcTotales` loop instead of parsing formatted strings from `.pres-subtotal-linea` — avoids NaN from Chilean thousand-dot separators
- Category list derived dynamically with `[...new Set(prods.map(...))]` — future-proofs against new categories being added

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Cards 6 and 7 are fully interactive and wired to the `prods[]` catalog
- Phase 03 (vista previa / impresión) can read line data from `.pres-linea` rows and totals from `#pres-val-subtotal`, `#pres-val-total`
- Phase 04 (guardar en Firestore) can collect all line row data and totals for persisting to `galdi_presupuestos`
- "Guardar borrador" and "Generar presupuesto" buttons remain disabled (Phase 1 state) — Phase 04 will enable them

---
*Phase: 02-lineas-detalle-totales*
*Completed: 2026-04-11*
