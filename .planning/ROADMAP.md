# Roadmap: Galdi Gestión — Tab 5 · Presupuestos (v1.0)

## Overview

El Tab 5 · Presupuestos se construye en cinco fases que siguen el flujo natural de uso: primero la estructura y formulario base del tab, luego las líneas de detalle con cálculo automático, después la persistencia en Firestore, a continuación la vista previa imprimible, y finalmente el historial de presupuestos. Cada fase entrega una capacidad completa y verificable dentro del archivo único `public/gestion/index.html`.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Tab + Formulario Base** - Estructura del tab integrada al panel, formulario con datos de cliente, evento, observaciones y campos auxiliares (completed 2026-04-11)
- [ ] **Phase 2: Líneas de Detalle + Totales** - Filas dinámicas en modo catálogo y manual, cálculo automático de subtotal, descuento y total en tiempo real
- [ ] **Phase 3: Persistencia Firestore** - Guardar presupuesto como borrador o enviado en `galdi_presupuestos` con numeración correlativa COT-GXXX
- [ ] **Phase 4: Vista Previa e Impresión** - Modal con layout imprimible, logo, tabla de líneas, totales en dorado y CSS @media print
- [ ] **Phase 5: Historial** - Tabla de presupuestos existentes con acciones Ver, cambiar estado y badges de color

## Phase Details

### Phase 1: Tab + Formulario Base
**Goal**: La socia puede abrir el Tab 5 "Presupuestos" y completar todos los campos del formulario de cabecera (cliente, evento, número automático, observaciones, validez y forma de pago)
**Depends on**: Nothing (first phase)
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05
**Success Criteria** (what must be TRUE):
  1. Tab 5 "Presupuestos" aparece en la barra de navegación y es visualmente indistinguible del resto de tabs
  2. Al abrir el tab se muestra un número correlativo automático (COT-GXXX) pre-llenado, tomando el máximo existente en Firestore o partiendo desde COT-G077
  3. La socia puede ingresar nombre, teléfono y email del cliente en campos dedicados
  4. La socia puede seleccionar fecha y tipo de evento, agregar observaciones, establecer fecha de validez y forma de pago sugerida
**Plans**: 1 plan
Plans:
- [x] 01-01-PLAN.md — Tab 5 button + panel HTML + COT-GXXX auto-number JS
**UI hint**: yes

### Phase 2: Líneas de Detalle + Totales
**Goal**: La socia puede construir el detalle del presupuesto agregando filas en modo catálogo o manual, ver el subtotal y total actualizados automáticamente al editar cualquier campo
**Depends on**: Phase 1
**Requirements**: LINE-01, LINE-02, LINE-03, LINE-04, TOT-01, TOT-02, TOT-03
**Success Criteria** (what must be TRUE):
  1. La socia puede agregar una fila en modo catálogo: elige categoría, luego producto, y el precio unitario se autocompleta desde `galdi_productos`
  2. La socia puede agregar una fila en modo manual con descripción libre, cantidad y precio unitario
  3. Cada fila tiene un botón "✕" que la elimina; el botón "+ Agregar línea" añade una fila nueva vacía
  4. El subtotal se recalcula en tiempo real al cambiar cantidad o precio en cualquier fila
  5. La socia puede aplicar un descuento (% o monto fijo con toggle) y el total final se actualiza inmediatamente
**Plans**: 1 plan
Plans:
- [x] 02-01-PLAN.md — Card 6 Detalle + Card 7 Totales HTML/CSS/JS with catalog cascade and real-time calculation
**UI hint**: yes

### Phase 3: Persistencia Firestore
**Goal**: La socia puede guardar el presupuesto en Firestore como borrador para seguir editando después, o marcarlo como enviado; en ambos casos el documento completo queda almacenado con todos sus campos
**Depends on**: Phase 2
**Requirements**: FIRE-01, FIRE-02, FIRE-03
**Success Criteria** (what must be TRUE):
  1. Al pulsar "Guardar borrador" el presupuesto se almacena en `galdi_presupuestos` con estado "borrador" y todos sus campos (numero, fechaCreacion, cliente, evento, lineas, subtotal, descuento, total, observaciones, validoHasta, formaPago, estado)
  2. Al pulsar "Generar presupuesto" el documento se guarda con estado "enviado" en Firestore y se lanza la vista previa
  3. El número COT-GXXX es correlativo: nunca se repite aunque se recargue la página
**Plans**: 1 plan
Plans:
- [ ] 01-PLAN-1.md — Tab 5 button + panel HTML + COT-GXXX auto-number JS

### Phase 4: Vista Previa e Impresión
**Goal**: Al generar un presupuesto la socia ve un modal con el documento formateado listo para imprimir o guardar como PDF, con logo, tabla de líneas, totales en dorado y pie de página con datos de contacto
**Depends on**: Phase 3
**Requirements**: PREV-01, PREV-02, PREV-03, PREV-04, PREV-05, PREV-06
**Success Criteria** (what must be TRUE):
  1. El modal muestra logo `/images/Nuevologo.webp`, número COT-GXXX, fecha de emisión y datos del cliente
  2. La tabla de líneas del modal presenta Descripción | Cantidad | Precio Unit. | Total con filas alternadas crema/blanco
  3. El modal muestra Subtotal, Descuento (si aplica) y TOTAL en dorado grande
  4. El pie del modal incluye `ventas@galdi.cl · WhatsApp +56 9 9099 1011 · galdi.cl`, fecha de validez y forma de pago
  5. Al pulsar "Imprimir / Guardar PDF" se ejecuta `window.print()` y CSS @media print oculta todo excepto la vista previa sin márgenes de página
**Plans**: 1 plan
Plans:
- [ ] 01-PLAN-1.md — Tab 5 button + panel HTML + COT-GXXX auto-number JS
**UI hint**: yes

### Phase 5: Historial
**Goal**: La socia puede ver todos los presupuestos guardados en una tabla, abrir cualquiera para editarlo, cambiar su estado de borrador a enviado y distinguir visualmente el estado por badges de color
**Depends on**: Phase 4
**Requirements**: HIST-01, HIST-02, HIST-03, HIST-04
**Success Criteria** (what must be TRUE):
  1. La tabla de historial muestra todos los presupuestos de `galdi_presupuestos` con columnas N° | Cliente | Evento | Total | Estado | Fecha | Acciones
  2. Al pulsar "Ver" en cualquier fila el formulario se recarga con los datos de ese presupuesto, listo para editar
  3. Al pulsar "Enviado" en un borrador, su estado cambia a "enviado" en Firestore y el badge se actualiza en la tabla sin recargar la página
  4. Los badges distinguen visualmente el estado: borrador=amarillo, enviado=verde
**Plans**: 1 plan
Plans:
- [ ] 01-PLAN-1.md — Tab 5 button + panel HTML + COT-GXXX auto-number JS
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Tab + Formulario Base | 1/1 | Complete    | 2026-04-11 |
| 2. Líneas de Detalle + Totales | 0/1 | Planning complete | - |
| 3. Persistencia Firestore | 0/? | Not started | - |
| 4. Vista Previa e Impresión | 0/? | Not started | - |
| 5. Historial | 0/? | Not started | - |
