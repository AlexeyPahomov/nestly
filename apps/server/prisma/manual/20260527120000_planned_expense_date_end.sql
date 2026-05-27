-- Planned expense date range end (optional). Run in SQL Editor if not using migrate deploy.
-- After run: npm run db:generate -w server

ALTER TABLE "PlannedExpense" ADD COLUMN IF NOT EXISTS "planned_date_end" TIMESTAMP(3);
