import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { config } from 'dotenv';

/**
 * Импортируйте этот модуль первым в `main.ts`, до `AppModule`:
 * иначе DI создаёт PrismaService до вызова `config()` и `DATABASE_URL` пустой.
 *
 * Загружается только `apps/server/.env`
 */
function findServerPackageRoot(from: string): string | undefined {
  let dir = from;
  for (let i = 0; i < 10; i++) {
    const pkgPath = resolve(dir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
          name?: string;
        };
        if (pkg.name === 'server') {
          return dir;
        }
      } catch {
        // ignore invalid package.json
      }
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return undefined;
}

const serverRoot = findServerPackageRoot(__dirname);
if (serverRoot) {
  const envPath = resolve(serverRoot, '.env');
  if (existsSync(envPath)) {
    config({ path: envPath, override: true });
  }
}
