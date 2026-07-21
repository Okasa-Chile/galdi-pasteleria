// scripts/analizar_anchors.mjs
// Diagnóstico SEO: enlazado interno (anchors) + ALT de imágenes en el homepage
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const HTML_PATH = 'out/index.html';

if (!fs.existsSync(HTML_PATH)) {
  console.error(`❌ No existe ${HTML_PATH}. Corre 'npm run build' primero.`);
  process.exit(1);
}

const html = fs.readFileSync(HTML_PATH, 'utf-8');
const dom = new JSDOM(html);
const doc = dom.window.document;

// Todos los <a> del home
const anchors = Array.from(doc.querySelectorAll('a'));

// Solo internos (mismo dominio o relativos, no wa.me / mailto / http externos)
const internal = anchors
  .map(a => ({
    node: a,
    href: a.getAttribute('href') || '',
    text: (a.textContent || '').replace(/\s+/g, ' ').trim(),
    ariaLabel: a.getAttribute('aria-label') || '',
    ariaHidden: a.getAttribute('aria-hidden') === 'true',
  }))
  .filter(a =>
    a.href &&
    !a.href.startsWith('http') &&
    !a.href.startsWith('mailto:') &&
    !a.href.startsWith('tel:') &&
    !a.href.startsWith('#') &&
    !a.href.startsWith('wa.me')
  );

console.log(`\n=== Total anchors internos: ${internal.length} ===\n`);

// Agrupar por texto para detectar repetidos
const byText = {};
internal.forEach(a => {
  const key = a.text || '[SIN TEXTO]';
  if (!byText[key]) byText[key] = [];
  byText[key].push(a);
});

console.log('=== ANCHOR TEXTS REPETIDOS (mismo texto, distinto href) ===');
Object.entries(byText)
  .filter(([text, arr]) => text !== '[SIN TEXTO]' && arr.length > 1 && new Set(arr.map(a => a.href)).size > 1)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([text, arr]) => {
    console.log(`\n  "${text}" (${arr.length}x)`);
    arr.forEach(a => console.log(`    → ${a.href}`));
  });

console.log('\n=== ANCHOR TEXTS LARGOS (>60 caracteres) ===');
internal
  .filter(a => a.text.length > 60)
  .sort((a, b) => b.text.length - a.text.length)
  .forEach(a => {
    console.log(`\n  [${a.text.length} chars] → ${a.href}`);
    console.log(`    "${a.text}"`);
  });

console.log('\n=== ENLACES INTERNOS CON QUERY PARAMS ===');
internal
  .filter(a => a.href.includes('?'))
  .forEach(a => {
    console.log(`\n  → ${a.href}`);
    console.log(`    texto: "${a.text || '[SIN TEXTO]'}"${a.ariaLabel ? `  (aria-label: "${a.ariaLabel}")` : ''}`);
  });

console.log('\n=== ANCHORS SIN TEXTO (revisar si son falsos positivos: imagen con alt, u overlay aria-hidden) ===');
internal
  .filter(a => !a.text)
  .forEach(a => {
    const img = a.node.querySelector('img');
    const imgAlt = img ? img.getAttribute('alt') : null;
    const tag = a.ariaHidden
      ? '  [aria-hidden="true" — overlay clickeable duplicado, ignorado por lectores de pantalla]'
      : img
      ? `  [contiene <img alt="${imgAlt ?? ''}">]`
      : '';
    console.log(`  → ${a.href}  (aria-label: "${a.ariaLabel}")${tag}`);
  });

console.log('\n=== TOP 20 destinos con MÁS anchors apuntando ===');
const byHref = {};
internal.forEach(a => {
  byHref[a.href] = (byHref[a.href] || 0) + 1;
});
Object.entries(byHref)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([href, count]) => {
    if (count > 1) console.log(`  ${count}x  →  ${href}`);
  });

// --- Imágenes sin ALT ---
console.log('\n=== IMÁGENES SIN ALT O CON ALT VACÍO ===');
const images = Array.from(doc.querySelectorAll('img'));
console.log(`(Total imágenes en el home: ${images.length})\n`);
images
  .filter(img => {
    const alt = img.getAttribute('alt');
    return alt === null || alt.trim() === '';
  })
  .forEach(img => {
    const alt = img.getAttribute('alt');
    const estado = alt === null ? 'SIN atributo alt' : 'alt VACÍO';
    console.log(`  [${estado}] src: ${img.getAttribute('src')}`);
  });

console.log('');
