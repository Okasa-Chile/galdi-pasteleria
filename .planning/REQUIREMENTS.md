# Requirements: Galdi Gestión — Tab 5 · Presupuestos

**Defined:** 2026-04-11
**Core Value:** Las socias pueden cotizar, registrar y controlar el negocio desde una sola pantalla sin salir a herramientas externas.

## v1 Requirements

### Formulario (FORM)

- [x] **FORM-01**: Usuario puede crear presupuesto con número correlativo automático (COT-GXXX, desde COT-G077 si no hay registros en Firestore)
- [x] **FORM-02**: Usuario puede ingresar datos del cliente: nombre, teléfono, email
- [x] **FORM-03**: Usuario puede ingresar datos del evento: fecha y tipo
- [x] **FORM-04**: Usuario puede agregar observaciones / notas en campo textarea
- [x] **FORM-05**: Usuario puede definir fecha de validez y forma de pago sugerida

### Líneas de detalle (LINE)

- [ ] **LINE-01**: Usuario puede agregar líneas en modo catálogo: dropdown categoría → producto → precio unitario se autocompleta desde `galdi_productos`
- [ ] **LINE-02**: Usuario puede agregar líneas en modo manual: descripción libre + cantidad + precio unitario
- [ ] **LINE-03**: Usuario puede agregar nuevas filas dinámicamente con botón "+ Agregar línea"
- [ ] **LINE-04**: Usuario puede eliminar filas individualmente con botón "✕"

### Totales (TOT)

- [ ] **TOT-01**: Sistema calcula subtotal en tiempo real (suma de cantidad × precio por línea)
- [ ] **TOT-02**: Usuario puede aplicar descuento opcional como % o monto fijo (toggle entre ambos)
- [ ] **TOT-03**: Sistema muestra total final descontado, actualizado en tiempo real al editar cualquier campo

### Persistencia Firestore (FIRE)

- [ ] **FIRE-01**: Usuario puede guardar presupuesto como "borrador" en colección `galdi_presupuestos`
- [ ] **FIRE-02**: Usuario puede marcar presupuesto como "enviado" (guarda en Firestore y muestra vista previa)
- [ ] **FIRE-03**: Cada documento almacena: numero, fechaCreacion, cliente {nombre, telefono, email}, evento {fecha, tipo}, lineas, subtotal, descuento, total, observaciones, validoHasta, formaPago, estado

### Vista previa e impresión (PREV)

- [ ] **PREV-01**: Al generar presupuesto aparece modal con: logo `/images/Nuevologo.webp`, número COT-GXXX, fecha de emisión y datos del cliente
- [ ] **PREV-02**: Modal muestra tabla de líneas: Descripción | Cantidad | Precio Unit. | Total (filas alternadas crema/blanco)
- [ ] **PREV-03**: Modal muestra sección totales: Subtotal, Descuento (si aplica), TOTAL en dorado grande
- [ ] **PREV-04**: Modal muestra pie de página: `ventas@galdi.cl · WhatsApp +56 9 9099 1011 · galdi.cl`, válido hasta y forma de pago
- [ ] **PREV-05**: Usuario puede imprimir / guardar PDF con `window.print()` desde botón en la vista previa
- [ ] **PREV-06**: CSS `@media print` oculta todo excepto la vista previa, sin márgenes de página

### Historial (HIST)

- [ ] **HIST-01**: Panel muestra tabla de historial consultando `galdi_presupuestos`: N° | Cliente | Evento | Total | Estado | Fecha | Acciones
- [ ] **HIST-02**: Acción "Ver" carga el presupuesto seleccionado en el formulario para editar
- [ ] **HIST-03**: Acción "Enviado" cambia estado de borrador a enviado en Firestore
- [ ] **HIST-04**: Badges de color distinguen estado: borrador=amarillo, enviado=verde

## v2 Requirements

### Mejoras futuras

- **NOTIF-01**: Envío automático del presupuesto por email al cliente (requiere Cloud Functions)
- **NOTIF-02**: Notificación interna cuando un presupuesto "enviado" lleva más de 7 días sin respuesta
- **EXP-01**: Exportación de historial a CSV o Excel
- **TMPL-01**: Plantillas de presupuesto predefinidas por tipo de evento (matrimonio, cumpleaños, etc.)
- **SIGN-01**: Firma digital del cliente vía link único

## Out of Scope

| Feature | Reason |
|---------|--------|
| Envío automático por email | Requiere Cloud Functions — fuera del alcance HTML puro |
| Firma digital del cliente | Complejidad innecesaria para el flujo actual de las socias |
| Multi-usuario / permisos por rol | App de uso interno, una sola cuenta de administración |
| Exportación Excel/CSV | Impresión PDF cubre la necesidad del negocio en esta etapa |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FORM-01 | Phase 1 | Complete |
| FORM-02 | Phase 1 | Complete |
| FORM-03 | Phase 1 | Complete |
| FORM-04 | Phase 1 | Complete |
| FORM-05 | Phase 1 | Complete |
| LINE-01 | Phase 2 | Pending |
| LINE-02 | Phase 2 | Pending |
| LINE-03 | Phase 2 | Pending |
| LINE-04 | Phase 2 | Pending |
| TOT-01 | Phase 2 | Pending |
| TOT-02 | Phase 2 | Pending |
| TOT-03 | Phase 2 | Pending |
| FIRE-01 | Phase 3 | Pending |
| FIRE-02 | Phase 3 | Pending |
| FIRE-03 | Phase 3 | Pending |
| PREV-01 | Phase 4 | Pending |
| PREV-02 | Phase 4 | Pending |
| PREV-03 | Phase 4 | Pending |
| PREV-04 | Phase 4 | Pending |
| PREV-05 | Phase 4 | Pending |
| PREV-06 | Phase 4 | Pending |
| HIST-01 | Phase 5 | Pending |
| HIST-02 | Phase 5 | Pending |
| HIST-03 | Phase 5 | Pending |
| HIST-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-11*
*Last updated: 2026-04-11 — Traceability completada tras creación del roadmap*
