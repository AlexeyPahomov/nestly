-- reserved_amount + carry_over_policy (Supabase SQL Editor)
-- npm run db:generate -w server

CREATE TYPE "CarryOverPolicy" AS ENUM (
  'RESET',
  'CARRY',
  'TRANSFER_TO_FREE'
);

ALTER TABLE "Category"
  ADD COLUMN IF NOT EXISTS "carry_over_policy" "CarryOverPolicy" NOT NULL DEFAULT 'RESET';

ALTER TABLE "PlannedExpense"
  ADD COLUMN IF NOT EXISTS "reserved_amount" DECIMAL(65, 30) NOT NULL DEFAULT 0;
