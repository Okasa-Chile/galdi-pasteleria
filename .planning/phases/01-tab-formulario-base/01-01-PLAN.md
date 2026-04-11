---
phase: 01-tab-formulario-base
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - public/gestion/index.html
autonomous: true
requirements:
  - FORM-01
  - FORM-02
  - FORM-03
  - FORM-04
  - FORM-05

must_haves:
  truths:
    - "Tab 5 'Presupuestos' aparece en la barra de navegacion y es visualmente identico a tabs 1-4"
    - "Al abrir el tab se muestra un numero correlativo automatico COT-GXXX pre-llenado en campo readonly"
    - "La socia puede ingresar nombre, telefono y email del cliente en campos dedicados"
    - "La socia puede seleccionar fecha y tipo de evento, agregar observaciones, establecer validez y forma de pago"
  artifacts:
    - path: "public/gestion/index.html"
      provides: "Tab 5 Presupuestos - button, panel, form, JS logic"
      contains: "tab-presupuestos"
  key_links:
    - from: "tab button onclick"
      to: "showTab('presupuestos',this)"
      via: "existing showTab function"
      pattern: "showTab.*presupuestos"
    - from: "showTab function"
      to: "Firestore galdi_presupuestos query"
      via: "if(id==='presupuestos') block inside showTab"
      pattern: "galdi_presupuestos"
    - from: "Firestore query result"
      to: "#pres-numero input"
      via: "max number calculation + DOM update"
      pattern: "pres-numero"
---

<objective>
Add Tab 5 "Presupuestos" to the Gestion panel with complete header form (number, client, event, observations, conditions) and automatic COT-GXXX number generation from Firestore.

Purpose: Enable the socias to open a new Presupuestos tab and fill in all header fields for a quote, with an auto-generated correlative number.
Output: Working Tab 5 with form UI and Firestore-driven number assignment.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-tab-formulario-base/01-UI-SPEC.md
@public/gestion/index.html
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Tab 5 button and Presupuestos panel HTML with all 5 form cards</name>
  <files>public/gestion/index.html</files>

  <read_first>
    - public/gestion/index.html (full file — study tabs div at line ~113, panel structure, existing card/grid patterns)
    - .planning/phases/01-tab-formulario-base/01-UI-SPEC.md
  </read_first>

  <action>
**1. Add Tab 5 button** — Insert a new `.tab` div AFTER the Tab 4 line (the line containing `onclick="showTab('ventas',this)"`):

```html
<div class="tab" onclick="showTab('presupuestos',this)">5 · Presupuestos</div>
```

**2. Add Tab 5 panel** — Insert the entire panel block BEFORE the closing `</div>` of `#pantalla-app` (i.e., right before the `<!-- MODAL -->` comment, after `tab-compras` panel's closing `</div>`). The panel markup:

```html
  <!-- TAB 5 -->
  <div id="tab-presupuestos" class="panel">

    <!-- Card 1: Numero -->
    <div class="card">
      <div class="card-title">Presupuesto</div>
      <div>
        <label>N° Presupuesto</label>
        <input type="text" id="pres-numero" readonly
               style="background:var(--sand);color:var(--gold2);font-weight:600;letter-spacing:0.08em;cursor:default;">
      </div>
    </div>

    <!-- Card 2: Cliente -->
    <div class="card">
      <div class="card-title">Datos del Cliente</div>
      <div style="margin-bottom:14px;">
        <label>Nombre del cliente *</label>
        <input type="text" id="pres-nombre" placeholder="ej: María González">
      </div>
      <div class="grid-2">
        <div>
          <label>Teléfono</label>
          <input type="text" id="pres-telefono" placeholder="ej: +56 9 1234 5678">
        </div>
        <div>
          <label>Email</label>
          <input type="text" id="pres-email" placeholder="ej: cliente@correo.cl">
        </div>
      </div>
    </div>

    <!-- Card 3: Evento -->
    <div class="card">
      <div class="card-title">Datos del Evento</div>
      <div class="grid-2">
        <div>
          <label>Fecha del evento</label>
          <input type="date" id="pres-fecha-evento">
        </div>
        <div>
          <label>Tipo de evento</label>
          <select id="pres-tipo-evento">
            <option value="">— Seleccionar tipo —</option>
            <option value="matrimonio">Matrimonio</option>
            <option value="cumpleanos">Cumpleaños</option>
            <option value="coffee-break">Coffee Break</option>
            <option value="coctel">Cóctel</option>
            <option value="aniversario">Aniversario</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Card 4: Observaciones -->
    <div class="card">
      <div class="card-title">Observaciones / Notas</div>
      <div>
        <label>Observaciones</label>
        <textarea id="pres-obs" rows="3" placeholder="Notas internas, detalles especiales, restricciones alimentarias..."
          style="width:100%;padding:8px 11px;border:1px solid var(--border);border-radius:6px;font-family:'Jost',sans-serif;font-size:13px;color:var(--brown);background:var(--cream);resize:vertical;"></textarea>
      </div>
    </div>

    <!-- Card 5: Condiciones -->
    <div class="card">
      <div class="card-title">Condiciones</div>
      <div class="grid-2">
        <div>
          <label>Válido hasta</label>
          <input type="date" id="pres-valido-hasta">
        </div>
        <div>
          <label>Forma de pago sugerida</label>
          <select id="pres-forma-pago">
            <option value="">— Seleccionar —</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="efectivo">Efectivo</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:18px;justify-content:flex-end;flex-wrap:wrap;">
        <button class="btn btn-gray" disabled style="opacity:0.5;cursor:not-allowed;">Guardar borrador</button>
        <button class="btn" disabled style="opacity:0.5;cursor:not-allowed;">Generar presupuesto</button>
      </div>
    </div>

  </div>
```

**3. Add CSS for date input and textarea focus** — In the `<style>` block, find the existing line:
```css
input:focus,select:focus{outline:none;border-color:var(--gold);}
```
Replace it with:
```css
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--gold);}
```
This ensures textarea gets the gold focus border too.

Also add `input[type=date]` to the existing input selector. Find:
```css
input[type=text],input[type=number],select{width:100%;padding:8px 11px;...}
```
And add `input[type=date]` to it:
```css
input[type=text],input[type=number],input[type=date],select{width:100%;padding:8px 11px;...}
```

**IMPORTANT:** Do NOT change any existing HTML or CSS. Only ADD the tab button, ADD the panel, and EXTEND the two CSS selectors above.
  </action>

  <acceptance_criteria>
    - grep "tab-presupuestos" public/gestion/index.html returns matches (panel id exists)
    - grep "5 · Presupuestos" public/gestion/index.html returns match (tab button text)
    - grep "pres-numero" public/gestion/index.html returns match (COT number input id)
    - grep "pres-nombre" public/gestion/index.html returns match (client name input)
    - grep "pres-telefono" public/gestion/index.html returns match (phone input)
    - grep "pres-email" public/gestion/index.html returns match (email input)
    - grep "pres-fecha-evento" public/gestion/index.html returns match (event date)
    - grep "pres-tipo-evento" public/gestion/index.html returns match (event type select)
    - grep "pres-obs" public/gestion/index.html returns match (textarea)
    - grep "pres-valido-hasta" public/gestion/index.html returns match (validity date)
    - grep "pres-forma-pago" public/gestion/index.html returns match (payment select)
    - grep "Guardar borrador" public/gestion/index.html returns match (disabled button)
    - grep "Generar presupuesto" public/gestion/index.html returns match (disabled button)
    - grep "showTab('presupuestos'" public/gestion/index.html returns match (tab onclick)
    - grep "DATOS DEL CLIENTE" public/gestion/index.html returns match (card title)
    - grep "DATOS DEL EVENTO" public/gestion/index.html returns match (card title)
    - grep "OBSERVACIONES / NOTAS" public/gestion/index.html returns match (card title)
    - grep "CONDICIONES" public/gestion/index.html returns match (card title)
    - grep "textarea:focus" public/gestion/index.html returns match (extended focus rule)
    - grep "input\[type=date\]" public/gestion/index.html returns match (date input styling)
  </acceptance_criteria>

  <verify>
    <automated>cd C:\OKasa\Web\galdi-nextjs && grep -c "tab-presupuestos" public/gestion/index.html && grep -c "pres-numero" public/gestion/index.html && grep -c "pres-nombre" public/gestion/index.html && grep -c "pres-forma-pago" public/gestion/index.html && grep -c "Guardar borrador" public/gestion/index.html</automated>
  </verify>
  <done>Tab 5 button appears in .tabs bar. Panel #tab-presupuestos contains 5 cards with all 9 form fields (pres-numero, pres-nombre, pres-telefono, pres-email, pres-fecha-evento, pres-tipo-evento, pres-obs, pres-valido-hasta, pres-forma-pago). Two disabled buttons at bottom. CSS extended for date inputs and textarea focus.</done>
</task>

<task type="auto">
  <name>Task 2: Add JS logic for COT-GXXX auto-number and presupuestos tab hook</name>
  <files>public/gestion/index.html</files>

  <read_first>
    - public/gestion/index.html (read the updated file from Task 1 — focus on the script block, showTab function at ~line 491, Firebase imports at ~line 344-346, onAuthStateChanged at ~line 479)
    - .planning/phases/01-tab-formulario-base/01-UI-SPEC.md (COT-GXXX Number Logic Contract section)
  </read_first>

  <action>
**1. Extend the showTab function** — In the existing `window.showTab` function (currently at ~line 491), add a presupuestos hook. Find:

```js
window.showTab = (id,el) => {
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  el.classList.add('active');
  if(id==='ventas')renderV();
  if(id==='compras')renderC();
  if(id==='simulador')calcMeta();
};
```

Replace with:

```js
window.showTab = (id,el) => {
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  el.classList.add('active');
  if(id==='ventas')renderV();
  if(id==='compras')renderC();
  if(id==='simulador')calcMeta();
  if(id==='presupuestos')cargarNumeroPres();
};
```

**2. Add the cargarNumeroPres function** — Insert this function AFTER the showTab function block (before the `// -- TAB 1: CATALOGO` comment):

```js
// ── TAB 5: PRESUPUESTOS ──────────────────────────────────────────────────
window.cargarNumeroPres = async () => {
  const el = document.getElementById('pres-numero');
  if (!el) return;
  try {
    const snap = await getDocs(collection(db, 'galdi_presupuestos'));
    let maxNum = 76; // default so first = 077
    snap.docs.forEach(d => {
      const data = d.data();
      if (data.numero && typeof data.numero === 'string') {
        const parsed = parseInt(data.numero.replace('COT-G', ''), 10);
        if (!isNaN(parsed) && parsed > maxNum) maxNum = parsed;
      }
    });
    const next = String(maxNum + 1).padStart(3, '0');
    el.value = 'COT-G' + next;
  } catch (e) {
    console.error('Error cargando numero presupuesto:', e);
    el.value = 'COT-G077';
  }
};
```

**Logic explanation:**
- Queries all docs in `galdi_presupuestos` collection
- For each doc, reads `numero` field (string like "COT-G077"), strips prefix, parses int
- Finds the maximum number across all docs
- Sets next = max + 1, zero-padded to 3 digits
- If collection empty or error: defaults to COT-G077 (maxNum starts at 76, so 76+1=77)
- Uses `getDocs` and `collection` which are already imported at top of script

**IMPORTANT:** Do NOT add any new Firebase imports — `getDocs` and `collection` are already imported. Do NOT modify any other existing functions. Only extend showTab and add the new function.
  </action>

  <acceptance_criteria>
    - grep "presupuestos.*cargarNumeroPres" public/gestion/index.html returns match (showTab hook)
    - grep "cargarNumeroPres" public/gestion/index.html returns at least 2 matches (definition + call)
    - grep "galdi_presupuestos" public/gestion/index.html returns match (Firestore collection name)
    - grep "COT-G" public/gestion/index.html returns matches (number format)
    - grep "padStart(3" public/gestion/index.html returns match (zero-padding logic)
    - grep "pres-numero" public/gestion/index.html returns at least 2 matches (HTML input + JS reference)
  </acceptance_criteria>

  <verify>
    <automated>cd C:\OKasa\Web\galdi-nextjs && grep -c "cargarNumeroPres" public/gestion/index.html && grep -c "galdi_presupuestos" public/gestion/index.html && grep -c "COT-G" public/gestion/index.html && grep -c "padStart" public/gestion/index.html</automated>
  </verify>
  <done>showTab function triggers cargarNumeroPres when presupuestos tab is opened. Function queries galdi_presupuestos, finds max COT-GXXX number, and pre-fills #pres-numero with next correlative. Falls back to COT-G077 on empty collection or error.</done>
</task>

</tasks>

<verification>
After both tasks complete, verify the full integration:

1. **HTML structure check:**
   ```bash
   grep -n "tab-presupuestos\|5 · Presupuestos\|pres-numero\|pres-nombre\|pres-telefono\|pres-email\|pres-fecha-evento\|pres-tipo-evento\|pres-obs\|pres-valido-hasta\|pres-forma-pago" public/gestion/index.html
   ```
   Must return matches for all 11 patterns.

2. **JS logic check:**
   ```bash
   grep -n "cargarNumeroPres\|galdi_presupuestos\|COT-G\|padStart" public/gestion/index.html
   ```
   Must return matches for all 4 patterns.

3. **Tab count check:**
   ```bash
   grep -c "class=\"tab" public/gestion/index.html
   ```
   Must return 5 (was 4 before).

4. **No broken existing tabs:** Existing tab IDs (tab-catalogo, tab-simulador, tab-compras, tab-ventas) must still be present.
</verification>

<success_criteria>
- Tab 5 "Presupuestos" button visible in tab bar with identical styling to tabs 1-4
- Panel #tab-presupuestos with 5 cards containing all form fields per UI-SPEC
- All 9 field IDs present: pres-numero, pres-nombre, pres-telefono, pres-email, pres-fecha-evento, pres-tipo-evento, pres-obs, pres-valido-hasta, pres-forma-pago
- COT-GXXX number auto-generated from Firestore on tab open
- Fallback to COT-G077 when no presupuestos exist
- Two disabled placeholder buttons: "Guardar borrador" and "Generar presupuesto"
- Existing tabs 1-4 unaffected
</success_criteria>

<output>
After completion, create `.planning/phases/01-tab-formulario-base/01-01-SUMMARY.md`
</output>
