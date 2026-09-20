import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const distDir = new URL('../dist/', import.meta.url);
const routes = ['products', 'solutions', 'technology', 'operations', 'about', 'why-us', 'contact'];

copyFileSync(new URL('index.html', distDir), new URL('404.html', distDir));
writeFileSync(new URL('.nojekyll', distDir), '');

for (const route of routes) {
  const routeDir = new URL(`${route}/`, distDir);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(new URL('index.html', distDir), fileURLToPath(new URL('index.html', routeDir)));
}
