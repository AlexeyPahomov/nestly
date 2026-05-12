/**
 * Prisma 7 генерирует client.ts с import.meta.url; при сборке Nest (CJS) в dist
 * остаётся import.meta, и Node трактует файл как ESM → "exports is not defined".
 * После generate подменяем на __dirname (корректно в скомпилированном CJS).
 */
const fs = require('fs');
const path = require('path');

const clientPath = path.join(__dirname, '../src/generated/prisma/client.ts');
if (!fs.existsSync(clientPath)) {
  process.exit(0);
}

let s = fs.readFileSync(clientPath, 'utf8');
const needle =
  "globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))";
if (!s.includes(needle)) {
  process.exit(0);
}

s = s.replace(needle, "globalThis['__dirname'] = __dirname");
s = s.replace(
  /import \{ fileURLToPath \} from 'node:url'\r?\n/,
  '',
);

fs.writeFileSync(clientPath, s);
