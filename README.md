# Nestly

finance tracker

Монорепозиторий на npm workspaces: приложения в `apps/client` и `apps/server`, общие пакеты — в `packages/*` (при появлении).

## Быстрый старт

Из **корня репозитория** установите зависимости и запускайте приложения скриптами воркспейса:

```bash
npm install
npm run dev:server   # NestJS (режим разработки с перезапуском)
npm run dev:client   # Vite + React
```

## Запуск из каталогов приложений

**Сервер** (`apps/server`):

```bash
cd apps/server
npm run start:dev    # разработка
# npm run start      # обычный старт без watch
```

**Клиент** (`apps/client`):

```bash
cd apps/client
npm run dev
```

Сервер по умолчанию слушает порт из переменной `PORT` или `3000`. Клиент — адрес и порт из вывода Vite (обычно `http://localhost:5173`).
