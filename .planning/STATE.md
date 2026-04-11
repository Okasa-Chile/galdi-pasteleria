# STATE.md — Galdi Gestión Panel

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-04-11 — Milestone v1.0 Tab 5 Presupuestos started

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-11)

**Core value:** Las socias pueden cotizar, registrar y controlar el negocio desde una sola pantalla sin salir a herramientas externas.
**Current focus:** Defining requirements for Tab 5 · Presupuestos

## Accumulated Context

- El archivo principal es `public/gestion/index.html` — todo el panel vive ahí
- Firebase Auth + Firestore ya integrados y funcionando en tabs 1-4
- Colección `galdi_productos` existe con categoría, nombre y precio por unidad
- El nuevo Tab 5 usa nueva colección `galdi_presupuestos`
- Numeración COT-GXXX: consultar Firestore, si vacío partir desde COT-G077
