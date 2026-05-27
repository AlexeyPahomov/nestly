# Ручные миграции SQL

Если БД обновляется через SQL Editor, выполните файл миграции целиком, затем:

```bash
pnpm --filter server db:generate
```

Опционально зарегистрируйте миграцию в Prisma (если используете `migrate deploy`):

```sql
INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count")
VALUES (
  gen_random_uuid()::text,
  '',
  NOW(),
  '20260521180000_budget_month_snapshots',
  NULL,
  NULL,
  NOW(),
  1
);
```

Checksum для production лучше взять из `prisma migrate diff` после применения.
