import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origen = resolve(raiz, 'public/gestion/index.html');
const destinos = [
  resolve(raiz, 'out/gestion/index.html'),
  resolve(raiz, '_src/gestion-index.html'),
];

if (!existsSync(origen)) {
  console.error(`copiar-gestion: no existe ${origen}`);
  process.exit(1);
}

for (const destino of destinos) {
  mkdirSync(dirname(destino), { recursive: true });
  copyFileSync(origen, destino);
  console.log(`copiar-gestion: ${origen} -> ${destino}`);
}
