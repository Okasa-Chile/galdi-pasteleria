# Galdi Pastelería — Panel de Gestión (/gestion)

## What This Is

Panel de administración interno para Galdi Pastelería Artesanal (Maipú, Chile). Es una app HTML+JS+CSS pura con Firebase Auth + Firestore, accesible en `/gestion`. Las socias lo usan para gestionar catálogo, simular precios, registrar compras/ventas y generar presupuestos para clientes.

## Core Value

Las socias pueden cotizar, registrar y controlar el negocio desde una sola pantalla sin salir a herramientas externas.

## Current Milestone: v1.0 — Tab 5 · Presupuestos

**Goal:** Agregar un sistema completo de presupuestos al panel /gestion con formulario dinámico, vista previa imprimible e historial en Firestore.

**Target features:**
- Formulario de presupuesto con número correlativo automático (COT-GXXX desde COT-G077)
- Datos del cliente y evento (nombre, teléfono, email, fecha, tipo)
- Líneas de detalle en dos modos: selector desde catálogo Firestore o entrada manual
- Totales automáticos en tiempo real (subtotal, descuento %, monto fijo, total)
- Guardar como "borrador" o "enviado" en colección galdi_presupuestos
- Vista previa imprimible con logo, tabla, totales en dorado y CSS @media print
- Historial con tabla y acciones: Ver (editar), cambiar estado, badges de color

## Requirements

### Validated

(None yet — primer milestone)

### Active

- [ ] Formulario de presupuesto con número correlativo automático (COT-GXXX)
- [ ] Datos del cliente: nombre, teléfono, email, fecha del evento, tipo de evento
- [ ] Líneas de detalle modo catálogo: dropdown categoría → producto → precio autocompleta
- [ ] Líneas de detalle modo manual: descripción libre + cantidad + precio unitario
- [ ] Agregar/eliminar líneas dinámicamente
- [ ] Totales en tiempo real: subtotal, descuento (% o monto fijo), total
- [ ] Campos: observaciones, válido hasta, forma de pago sugerida
- [ ] Guardar borrador → Firestore estado "borrador"
- [ ] Generar presupuesto → Firestore estado "enviado" + mostrar vista previa
- [ ] Vista previa con logo, tabla de líneas, totales en dorado, pie de página
- [ ] Botón imprimir / guardar PDF (window.print) + CSS @media print
- [ ] Historial: tabla N° | Cliente | Evento | Total | Estado | Fecha | Acciones
- [ ] Acción Ver → recarga presupuesto en formulario para editar
- [ ] Acción cambiar estado borrador → enviado
- [ ] Badges: borrador=amarillo, enviado=verde

### Out of Scope

| Feature | Reason |
|---------|--------|
| Envío automático por email | Requiere backend/función Cloud; fuera del alcance HTML puro |
| Firma digital del cliente | Complejidad innecesaria para el flujo actual |
| Multi-usuario / permisos | App de uso interno, una sola cuenta |
| Exportación a Excel/CSV | Impresión PDF cubre la necesidad de socias |

## Context

- **Stack**: HTML + CSS + vanilla JS (sin frameworks). Firebase SDK (Auth + Firestore) cargado via CDN.
- **Estilo visual**: Variables CSS `--gold:#C9A55A`, `--dark:#1a0f0a`, `--brown:#3d2010`, `--cream:#F9F3EC`, `--sand:#EDE3D5`, `--border:#e4d8c8`, `--muted:#9c7a5a`. Fuentes Cormorant Garamond (serif) + Jost (sans-serif).
- **Tabs existentes**: 1-Catálogo, 2-Simulador, 3-Compras, 4-Ventas. El Tab 5 debe integrarse con el mismo patrón.
- **Colecciones Firestore**: `galdi_productos` (catálogo con categoría y precio), `galdi_presupuestos` (nueva).
- **Numeración**: Si no hay registros previos, partir desde COT-G077; si hay, tomar máximo + 1.
- **Archivo**: `public/gestion/index.html` (~único archivo de la app de gestión).

## Constraints

- **Tech stack**: Solo HTML/CSS/JS vanilla + Firebase SDK CDN — no npm, no bundler, no frameworks
- **Archivo único**: Todo el código del panel vive en `public/gestion/index.html`
- **Estilo**: Debe ser visualmente indistinguible del resto de tabs existentes
- **Print**: Vista previa debe funcionar con window.print() y ocultar todo lo demás con @media print

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Colección separada `galdi_presupuestos` | Evita contaminar galdi_productos; permite estados propios | — Pending |
| Numeración COT-GXXX correlativa en cliente | Simple, no requiere Cloud Functions; suficiente para volumen de socias | — Pending |
| Modal de vista previa + @media print | Reutilizable, sin backend, funciona offline con Firebase cache | — Pending |

## Evolution

Este documento evoluciona en transiciones de fase y límites de milestone.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-11 — Milestone v1.0 iniciado*
