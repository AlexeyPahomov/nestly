CREATE TYPE "CarryOverPolicy" AS ENUM (
  'RESET',
  'CARRY',
  'TRANSFER_TO_FREE'
);

ALTER TABLE "Category"
  ADD COLUMN "carry_over_policy" "CarryOverPolicy" NOT NULL DEFAULT 'RESET';

ALTER TABLE "PlannedExpense"
  ADD COLUMN "reserved_amount" DECIMAL(65, 30) NOT NULL DEFAULT 0;
