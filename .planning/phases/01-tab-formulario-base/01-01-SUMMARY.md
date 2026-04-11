---
phase: 01-tab-formulario-base
plan: 1
subsystem: gestion-panel
tags: [html, css, js, firebase, presupuestos, tab]
dependency_graph:
  requires: []
  provides: [tab-presupuestos, pres-form-fields, cot-gxxx-logic]
  affects: [public/gestion/index.html]
tech_stack:
  added: []
  patterns: [vanilla-js-tab-pattern, firestore-getDocs-query]
key_files:
  created: []
  modified:
    - public/gestion/index.html
decisions:
  - "COT-GXXX starts at 077 (maxNum=76 default) — consistent with PROJECT.md spec"
  - "textarea styled inline (not via CSS class) — matches existing pattern for one-off overrides"
  - "input[type=date] added to shared selector — avoids duplicating padding/border/font rules"
metrics:
  duration: "~12 min"
  completed: "2026-04-11"
  tasks: 2
  files: 1
---

# Phase 01 Plan 01: Tab + Formulario Base Summary

**One-liner:** Tab 5 "Presupuestos" added to /gestion with 5-card form (client, event, observations, conditions, COT-GXXX auto-number) driven by Firestore galdi_presupuestos query.

## What Was Built

- Tab 5 button "5 · Presupuestos" inserted in the nav bar, visually identical to tabs 1–4
- Panel `#tab-presupuestos` with 5 cards and all 9 form fields:
  - `pres-numero` (readonly, COT-GXXX, sand/gold2 badge style)
  - `pres-nombre`, `pres-telefono`, `pres-email`
  - `pres-fecha-evento`, `pres-tipo-evento`
  - `pres-obs` (textarea)
  - `pres-valido-hasta`, `pres-forma-pago`
- Two disabled placeholder buttons: "Guardar borrador" + "Generar presupuesto"
- CSS extended: `textarea:focus` added to focus rule; `input[type=date]` added to shared input selector
- `cargarNumeroPres()` function: queries `galdi_presupuestos`, finds max COT-GXXX number, pre-fills `#pres-numero`; falls back to COT-G077 on empty collection or error
- `showTab` extended with `if(id==='presupuestos')cargarNumeroPres()` hook

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 3da71fe | feat(01-01): add Tab 5 Presupuestos panel HTML and CSS extensions |
| 2 | 5b6b517 | feat(01-01): add JS COT-GXXX auto-number logic for presupuestos tab |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- "Guardar borrador" button: disabled, no handler. Intentional — Phase 3 activates it.
- "Generar presupuesto" button: disabled, no handler. Intentional — Phase 3 activates it.

These stubs do NOT prevent the plan's goal (form UI + auto-number) from being achieved.

## Self-Check: PASSED

- `public/gestion/index.html` exists and modified: confirmed
- Commit 3da71fe exists: confirmed
- Commit 5b6b517 exists: confirmed
- All 9 field IDs present: confirmed via grep
- cargarNumeroPres defined and called: confirmed (2 occurrences)
- galdi_presupuestos referenced: confirmed
- 5 showTab onclick entries: confirmed
