import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { config } from 'dotenv';

/**
 * Импортируйте этот модуль первым в `main.ts`, до `AppModule`:
 * иначе DI создаёт PrismaService до вызова `config()` и `DATABASE_URL` пустой.
 *
 * Поднимаемся от cwd вверх и подгружаем все найденные `.env` (от корня к cwd),
 * чтобы локальный `apps/server/.env` мог переопределить корневой.
 */
const paths: string[] = [];
let dir = process.cwd();
for (let i = 0; i < 10; i++) {
  const candidate = resolve(dir, '.env');
  if (existsSync(candidate)) {
    paths.push(candidate);
  }
  const parent = dirname(dir);
  if (parent === dir) {
    break;
  }
  dir = parent;
}

for (const p of paths.reverse()) {
  config({ path: p, override: true });
}
