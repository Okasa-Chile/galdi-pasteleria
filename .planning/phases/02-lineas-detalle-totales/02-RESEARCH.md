# Phase 2: Líneas de Detalle + Totales — Research

**Researched:** 2026-04-11
**Domain:** Vanilla JS DOM manipulation, Firestore read patterns, real-time calculation, dynamic row management
**Confidence:** HIGH — all findings sourced directly from reading `public/gestion/index.html` (935 lines, 51 KB) and the approved `02-UI-SPEC.md`.

---

## Summary

Phase 2 adds two cards (Card 6: Detalle, Card 7: Totales) inside the existing `#tab-presupuestos` panel. The implementation is purely vanilla HTML + JS — no libraries, no bundler. All patterns needed already exist in the codebase.

The key insight is that the `prods` array (already loaded into memory at startup via `fsLoad()`) contains every `galdi_productos` document. The catalog dropdown cascade (LINE-01) can filter this array locally — no additional Firestore reads needed. For the product select, the field name for display is `nombre`, the category field is `cat` (NOT `categoria`), and the sale price field is `precio` (the computed `precioFinal` mentioned in the UI-SPEC maps to `p.precio` in code).

Real-time recalculation follows the exact pattern of `calcMeta()` in Tab 2: `oninput` event handlers trigger a function that reads DOM values, computes, and writes results back to DOM. The `fmt()` helper function already formats Chilean pesos correctly and MUST be reused.

**Primary recommendation:** Implement all seven functions (`presAgregarLinea`, `presEliminarLinea`, `presSetModo`, `presCargarProductos`, `presAutocompletarPrecio`, `presRecalcLinea`, `presRecalcTotales`, `presSetDescTipo`) as `window.*` assignments in the `// ── TAB 5: PRESUPUESTOS` section immediately after `cargarNumeroPres`. Insert Cards 6 and 7 HTML immediately after the closing `</div>` of Card 5 (Condiciones) and before the closing `</div>` of `#tab-presupuestos`.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LINE-01 | User can add catalog-mode lines: dropdown category → product → unit price autocompleted from `galdi_productos` | `prods[]` array already in memory; `cat` field = category; `precio` field = price to autocomplete; pattern mirrors `poblarProductos()` + `autocompletarPrecio()` in Tab 3 |
| LINE-02 | User can add manual-mode lines: free description + quantity + unit price | Mode toggle replaces `.pres-desc-wrap` innerHTML only; qty/price fields preserved |
| LINE-03 | User can dynamically add new rows with "+ Agregar línea" button | Pattern: create div from template string, append to `#pres-lineas`, show header, hide empty state |
| LINE-04 | User can delete individual rows with "✕" button | `btn.closest('.pres-linea').remove()` then recheck empty state + recalc |
| TOT-01 | System calculates subtotal in real time (sum of qty × price per row) | `oninput` on `.pres-cant` and `.pres-precio`; `presRecalcLinea` writes row subtotal, calls `presRecalcTotales` |
| TOT-02 | User can apply optional discount as % or fixed amount (toggle) | `presSetDescTipo(tipo)` toggles active button styles + symbol + resets value; same toggle pattern as `.cat-btn.active` |
| TOT-03 | System shows final total after discount, updated in real time | `presRecalcTotales()` reads all `.pres-subtotal-linea` values, computes discount, updates result-box spans |
</phase_requirements>

---

## Standard Stack

### Core
| Component | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Vanilla JS | ES2020 (module) | All logic | Project constraint — no npm, no bundler |
| Firebase JS SDK | 11.0.0 (CDN) | Firestore reads | Already imported at line 440 |
| HTML5 | — | Structure | Single-file constraint |

### Supporting
| Utility | Where Defined | Purpose |
|---------|--------------|---------|
| `fmt(n)` | line 932 | Chilean peso format — `'$' + Math.round(n).toLocaleString('es-CL')` |
| `g(id)` | line 930 | `document.getElementById(id)?.value \|\| 0` shorthand |
| `s(id, val)` | line 931 | `document.getElementById(id).textContent = val` shorthand |

**Installation:** None — no packages. All code added to `public/gestion/index.html`.

---

## Architecture Patterns

### File Structure (single file)

```
public/gestion/index.html
├── <style>          (lines 8–92)   — CSS, all tokens, component classes
├── HTML panels      (lines 94–436) — Tab panels including #tab-presupuestos
├── <!-- MODAL -->   (line 389)     — Existing product modal
└── <script type="module">  (line 437–933)
    ├── Firebase imports     (lines 438–440)
    ├── Config + init        (lines 442–451)
    ├── DEFAULTS array       (lines 453–489)
    ├── State variables      (lines 493–497)   let prods=[], ventas=[], catActiva, sel
    ├── Firestore helpers    (lines 499–555)
    ├── Auth                 (lines 557–581)
    ├── window.showTab       (lines 585–594)
    ├── // TAB 5 section     (lines 596–616)   ← INSERT new functions here
    ├── // TAB 1             (lines 618–686)
    ├── // TAB 2 Simulador   (lines 735–747)
    ├── // TAB 3 Ventas      (lines 749–855)
    ├── // TAB 3 Compras     (lines 857–927)
    └── Helpers fmt/g/s      (lines 929–932)
```

### Pattern 1: `window.*` function assignment (used by all tabs)

All interactive functions are assigned to `window` so inline `onclick` attributes can reach them from the module script:

```js
// Source: index.html line 619
window.renderCats = () => { ... };
window.selCat = (c, el) => { ... };
window.calcMeta = () => { ... };
```

Phase 2 functions MUST follow this exact pattern:

```js
window.presAgregarLinea = () => { ... };
window.presEliminarLinea = (btn) => { ... };
window.presSetModo = (btn, modo) => { ... };
window.presCargarProductos = (catSel) => { ... };
window.presAutocompletarPrecio = (prodSel) => { ... };
window.presRecalcLinea = (inputEl) => { ... };
window.presRecalcTotales = () => { ... };
window.presSetDescTipo = (tipo) => { ... };
```

### Pattern 2: In-memory `prods` array as catalog source (HIGH confidence)

Products are loaded once at startup in `fsLoad()` (line 500–519) into `let prods = []`. Every product object has these exact fields:

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `id` | number | `8` | unique id |
| `nombre` | string | `'Pie de Limón Merengado'` | display name |
| `cat` | string | `'Pasteles & Tartas'` | category (NOT `categoria`) |
| `tipo` | string | `'propio'` or `'reventa'` | |
| `unidad` | string | `'unidad'`, `'kg'`, `'docena'` | |
| `costo` | number | `4500` | base cost |
| `precio` | number | computed `cpx(p)` | **sale price — use this for autocomplete** |
| `combate` | string | `''` | competitor reference price |

**Critical:** The UI-SPEC refers to `precioFinal` but the actual field in the codebase is `precio`. Use `p.precio`.

**Critical:** Category field is `cat` in code (from DEFAULTS array), but Firestore docs loaded via `fsLoad` also use `cat`. Tab 3's `poblarProductos` confirms this: `(p.cat || p.categoria)` — the fallback `p.categoria` handles old docs, but `p.cat` is the primary field.

**Category values** (from modal at line 399–406 and DEFAULTS):
- `'Pan Artesanal'`
- `'Pasteles & Tartas'`
- `'Tortas'`
- `'Dulces & Alfajores'`
- `'Queques & Muffins'`
- `'Empanadas'`

### Pattern 3: Real-time calculation via `oninput` (calcMeta model)

`calcMeta()` (line 736) is called via `oninput` on sliders and immediately recalculates all result values. This is the model for `presRecalcLinea` + `presRecalcTotales`:

```js
// Source: index.html line 736
window.calcMeta = () => {
  const dias = +g('dias') || 26;  // reads from DOM, defaults on empty
  // ... computes ...
  s('m1', km.toLocaleString('es-CL'));  // writes to DOM span
};
```

Phase 2 recalc chain:
1. `oninput` on `.pres-cant` or `.pres-precio` → calls `presRecalcLinea(this)`
2. `presRecalcLinea` updates `.pres-subtotal-linea` for that row → calls `presRecalcTotales()`
3. `presRecalcTotales` sums all row subtotals → updates `#pres-val-subtotal`, `#pres-val-descuento`, `#pres-val-total`
4. `oninput` on `#pres-desc-valor` → calls `presRecalcTotales()` directly

### Pattern 4: Dynamic row generation via innerHTML template (renderV / renderC model)

`renderV()` (line 838) and `renderC()` (line 908) generate rows by building template literal strings and assigning to `innerHTML`. Phase 2 uses a slightly different approach: rows are appended individually (not full re-render) to preserve input state.

```js
// Source: index.html line 917
tb.innerHTML = [...compras].sort((a,b) => b.id-a.id).map(c => `<tr>
  <td>...</td>
</tr>`).join('');
```

For Phase 2, each row is a standalone `<div class="pres-linea">` created via:
```js
const div = document.createElement('div');
div.innerHTML = templateString;  // or div.className = 'pres-linea'; etc.
document.getElementById('pres-lineas').appendChild(div.firstElementChild);
```

Alternatively, create the full div element and set its innerHTML. Both approaches valid.

### Pattern 5: Mode toggle active state (cat-btn model)

The `.cat-btn.active` toggle (line 58, 624–629) is the visual model for both the mode toggle and discount type toggle:

```css
/* Source: index.html line 58 */
.cat-btn.active { background: var(--dark); color: var(--gold); border-color: var(--dark); }
```

```js
// Source: index.html line 624
window.selCat = (c, el) => {
  catActiva = c;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  ...
};
```

For the mode toggle and discount type toggle, the same pattern applies: loop siblings, remove active, add active to clicked.

### Pattern 6: Closest-parent DOM traversal for delete

Tab 3 ventas delete uses: `onclick="delVenta(${v.id})"` with an id. Phase 2 uses button reference instead:

```js
window.presEliminarLinea = (btn) => {
  btn.closest('.pres-linea').remove();
  // then check if #pres-lineas is empty
  // then call presRecalcTotales()
};
```

This is the simplest pattern — no IDs needed for delete.

### Anti-Patterns to Avoid

- **Full re-render of lines container:** Unlike `renderV()`/`renderC()`, do NOT set `#pres-lineas.innerHTML` on every change — this destroys input state. Each row is created once and mutated in place.
- **Using `where()` query for catalog filter:** Not needed — `prods` is already in memory. Filter with `prods.filter(p => (p.cat || p.categoria) === value)`.
- **Using `categoria` instead of `cat`:** The primary field is `cat`. Use `(p.cat || p.categoria)` for robustness (as Tab 3 does).
- **Using `precioFinal` as field name:** The actual field is `precio`. The UI-SPEC uses `precioFinal` as a conceptual name but the data uses `precio`.
- **Storing row subtotals as formatted strings:** Store raw numbers separately (or parse back from formatted display) when summing in `presRecalcTotales`. The `.pres-subtotal-linea` input shows formatted value — read numeric from `.pres-cant` and `.pres-precio` instead, OR store as `data-valor` attribute.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chilean peso format | Custom formatter | `fmt(n)` at line 932 | Already defined, consistent across tabs |
| DOM element reading | Custom getter | `g(id)` at line 930 | Project convention |
| DOM text update | Custom setter | `s(id, val)` at line 931 | Project convention |
| Firestore imports | Re-import | Existing `getDocs`, `collection`, `query`, `orderBy` from line 440 | Already imported — DO NOT add new imports |
| Product catalog | New Firestore query | Filter `prods[]` array in memory | Data already loaded at startup |

**Key insight:** The entire catalog (categories + products + prices) is already in the `prods` array in memory. No additional Firestore reads are needed for LINE-01.

---

## Common Pitfalls

### Pitfall 1: Summing formatted string values in presRecalcTotales
**What goes wrong:** `.pres-subtotal-linea` displays formatted text like `$1.500`. Trying to `parseFloat` or `parseInt` this fails because of the `$` and dot separators.
**Why it happens:** The display value and the numeric value are different representations.
**How to avoid:** Option A — read from `.pres-cant` and `.pres-precio` inputs in each row and recompute row totals during the sum loop. Option B — store the raw number as `data-valor` attribute on `.pres-subtotal-linea` and update it alongside the formatted display. Option A is simpler.
**Warning signs:** `NaN` in total display.

### Pitfall 2: prods array not yet loaded when presAgregarLinea is called
**What goes wrong:** User adds a catalog line before `fsLoad()` completes — `prods` is empty, category options list shows nothing.
**Why it happens:** `fsLoad()` is async and called in `onAuthStateChanged`. By the time Tab 5 is opened, it should be loaded, but rapid tab switching could theoretically race.
**How to avoid:** `presCargarProductos` can check `if(!prods.length)` and show a fallback message. In practice the tab is behind auth so `fsLoad` completes first, but defensive coding is cheap.

### Pitfall 3: Module scope — inline onclick can't call functions
**What goes wrong:** A function defined as `function presAgregarLinea(){}` inside `<script type="module">` is NOT accessible from inline `onclick="presAgregarLinea()"`.
**Why it happens:** ES modules have their own scope, not window scope.
**How to avoid:** Always use `window.presAgregarLinea = () => {}` pattern. Every existing function in the file follows this. Never use `function foo(){}` declarations for onclick targets.
**Warning signs:** "presAgregarLinea is not defined" console error.

### Pitfall 4: inserting HTML in wrong location
**What goes wrong:** Cards 6 and 7 placed after `</div>` of `#tab-presupuestos` instead of inside it.
**Why it happens:** The panel closing tag (line 386) and the next `</div>` closing `#pantalla-app` (line 387) are adjacent — easy to mis-count.
**How to avoid:** Insert Cards 6 and 7 BEFORE line 386 (the `</div>` that closes `#tab-presupuestos`). Verify with `grep -n "tab-presupuestos"` after edit.

### Pitfall 5: presRecalcTotales called before any row exists
**What goes wrong:** Called on page load or when all rows are deleted — loops over empty NodeList without issue, but must handle `subtotal = 0` gracefully (don't divide by zero for %).
**Why it happens:** Discount % calculation: `subtotal * (val / 100)` — if subtotal is 0 and discount > 0, result is 0 (safe). No division by zero risk.
**How to avoid:** Clamp `descuento = Math.min(descuento, subtotal)` after calculation as specified in UI-SPEC.

### Pitfall 6: `cat` vs `categoria` field confusion
**What goes wrong:** Filter returns 0 products — category options exist but no products match.
**Why it happens:** Firestore docs may store field as `categoria` (older docs) while in-memory DEFAULTS use `cat`.
**How to avoid:** Use `(p.cat || p.categoria)` for the filter, same as `poblarProductos()` does at line 780.

---

## Code Examples

Verified patterns from `public/gestion/index.html`:

### Firebase imports already available (line 440)
```js
import { getFirestore, doc, setDoc, getDoc, collection, getDocs,
         addDoc, deleteDoc, query, orderBy }
  from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js';
```
Phase 2 needs NO new imports. `getDocs` and `collection` already imported.

### Filtering products by category (from poblarProductos, line 780)
```js
// Source: index.html line 780
const filtrados = prods.filter(p => (p.cat || p.categoria) === mapacat[cat]);
```

### Formatting Chilean pesos (line 932)
```js
// Source: index.html line 932
function fmt(n){ return '$' + Math.round(n).toLocaleString('es-CL'); }
```
Use directly: `fmt(rowTotal)` → `'$12.500'`

### Category toggle active state (line 624)
```js
// Source: index.html line 624
window.selCat = (c, el) => {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
};
```

### Reading row subtotals (recommended approach for presRecalcTotales)
```js
// Pattern derived from calcMeta (line 736–747) — read DOM inputs, not display values
let subtotal = 0;
document.querySelectorAll('.pres-linea').forEach(row => {
  const cant  = parseFloat(row.querySelector('.pres-cant').value)  || 0;
  const precio = parseFloat(row.querySelector('.pres-precio').value) || 0;
  subtotal += cant * precio;
});
```

### Existing result-box structure in DOM (already styled, line 49–54)
```css
/* Source: index.html line 49–54 */
.result-box { background: var(--dark); border-radius: 8px; padding: 18px 22px; color: #fff; }
.result-row { display: flex; justify-content: space-between; ... }
.result-row.highlight .val { color: var(--gold); font-size: 17px; }
```

### presCargarProductos — catalog cascade (derived from poblarProductos)
```js
window.presCargarProductos = (catSel) => {
  const cat = catSel.value;
  const prodSel = catSel.closest('.pres-desc-wrap').querySelector('.pres-prod-sel');
  if (!cat) {
    prodSel.innerHTML = '<option value="">— Producto —</option>';
    prodSel.disabled = true;
    return;
  }
  const filtrados = prods.filter(p => (p.cat || p.categoria) === cat);
  prodSel.innerHTML = '<option value="">— Producto —</option>' +
    filtrados.map(p => `<option value="${p.precio}">${p.nombre}</option>`).join('');
  prodSel.disabled = false;
};
```
Note: `option value` stores the price directly — same approach as `autocompletarPrecio()` at line 788.

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|-----------------|-------|
| Separate Firestore query per catalog dropdown change | Filter in-memory `prods[]` | Already implemented in Tab 3; same for Phase 2 |
| Full re-render of row list on every change | Append/remove individual rows | Required for Phase 2 to preserve input state |

---

## Open Questions

1. **`galdi_productos` field `cat` vs `categoria`**
   - What we know: DEFAULTS array uses `cat`; `poblarProductos` uses `(p.cat || p.categoria)` fallback; Firestore `setDoc` writes whatever is in the object
   - What's unclear: Whether older Firestore docs use `categoria` — but code already handles both
   - Recommendation: Always use `(p.cat || p.categoria)` in filter. No investigation needed.

2. **Category list for `pres-cat-sel` dropdown**
   - What we know: 6 categories in DEFAULTS + modal. In-memory `prods` may have more if custom products added.
   - What's unclear: Whether to hardcode the 6 categories or derive dynamically from `prods`
   - Recommendation: Derive dynamically with `[...new Set(prods.map(p => p.cat || p.categoria))]` — same approach as `renderCats()` at line 620. This future-proofs as new categories are added.

3. **Discount input: max attribute for % type**
   - What we know: UI-SPEC says `max="100"` for % type, no max for fixed
   - What's unclear: Should `presSetDescTipo` also set/remove the `max` attribute on `#pres-desc-valor`?
   - Recommendation: Yes — set `max="100"` when switching to pct, remove `max` when switching to fijo. Low complexity, prevents invalid % entries.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 2 is purely code additions to a single HTML file. No external dependencies, CLIs, databases, or runtimes beyond the already-running Firebase project.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in `.planning/config.json` — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — vanilla HTML/JS, no test runner configured |
| Config file | None — Wave 0 gap |
| Quick run command | Manual browser open: `firebase serve` then open `http://localhost:5000/gestion/` |
| Full suite command | Manual checklist per success criteria |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LINE-01 | Catalog cascade: select category → products load → price autocompletes | manual-only | — | N/A |
| LINE-02 | Manual mode: free text + qty + price row | manual-only | — | N/A |
| LINE-03 | "+ Agregar línea" adds empty row; header appears | manual-only | — | N/A |
| LINE-04 | "✕" removes row; empty state shows when 0 rows | manual-only | — | N/A |
| TOT-01 | Row subtotal = qty × price, updates on every keystroke | manual-only | — | N/A |
| TOT-02 | Discount toggle % ↔ fixed, symbol changes, value resets | manual-only | — | N/A |
| TOT-03 | Total = subtotal − discount, updates in real time | manual-only | — | N/A |

**Justification for manual-only:** No test framework exists in this project (single HTML file, no npm, no jest/vitest/playwright config). All verification is browser-based.

### Automated Structural Checks (grep-based, runnable in CI or bash)

These CAN be run automatically after implementation:

```bash
# Verify all required IDs and classes are present
grep -c "pres-lineas"         public/gestion/index.html  # >= 2
grep -c "pres-header-lineas"  public/gestion/index.html  # >= 1
grep -c "pres-empty-lineas"   public/gestion/index.html  # >= 1
grep -c "presAgregarLinea"    public/gestion/index.html  # >= 2 (def + call)
grep -c "presEliminarLinea"   public/gestion/index.html  # >= 2
grep -c "presRecalcLinea"     public/gestion/index.html  # >= 2
grep -c "presRecalcTotales"   public/gestion/index.html  # >= 2
grep -c "presSetDescTipo"     public/gestion/index.html  # >= 2
grep -c "presCargarProductos" public/gestion/index.html  # >= 2
grep -c "pres-val-subtotal"   public/gestion/index.html  # >= 2
grep -c "pres-val-total"      public/gestion/index.html  # >= 2
grep -c "card-detalle"        public/gestion/index.html  # >= 1
grep -c "card-totales"        public/gestion/index.html  # >= 1
```

### Wave 0 Gaps

No new test infrastructure needed. Structural verification is grep-based (see above). Manual browser testing covers functional verification.

---

## Sources

### Primary (HIGH confidence)
- `public/gestion/index.html` lines 1–935 — full read; all Firestore patterns, CSS classes, JS functions, field names verified directly from source code
- `.planning/phases/02-lineas-detalle-totales/02-UI-SPEC.md` — approved interaction + visual contract

### Secondary (MEDIUM confidence)
- `.planning/phases/01-tab-formulario-base/01-01-PLAN.md` — confirmed implementation approach for Tab 5 base

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — single file, all dependencies verified by reading source
- Architecture patterns: HIGH — all patterns extracted directly from existing code
- Field names (`cat` vs `categoria`, `precio`): HIGH — verified from DEFAULTS array + Tab 3 usage
- Pitfalls: HIGH — identified from actual code patterns and direct reading
- Validation: HIGH — confirmed no test framework exists

**Research date:** 2026-04-11
**Valid until:** Stable — single file project, no external dependencies to go stale
