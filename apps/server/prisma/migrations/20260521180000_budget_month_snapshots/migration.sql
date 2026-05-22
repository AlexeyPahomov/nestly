-- Same as prisma/manual/20260521180000_budget_month_snapshots.sql (for migrate deploy)

CREATE TYPE "BudgetMonthStatus" AS ENUM ('OPEN', 'CLOSED');

CREATE TYPE "AllocationType" AS ENUM (
  'INCOME_ASSIGNMENT',
  'CATEGORY_TRANSFER',
  'MANUAL_ADJUSTMENT'
);

CREATE TABLE "BudgetMonth" (
  "id"         UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id"    TEXT NOT NULL,
  "year"       INTEGER NOT NULL,
  "month"      INTEGER NOT NULL,
  "status"     "BudgetMonthStatus" NOT NULL DEFAULT 'OPEN',
  "opened_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closed_at"  TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "BudgetMonth_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "BudgetMonth_user_id_year_month_key" UNIQUE ("user_id", "year", "month"),
  CONSTRAINT "BudgetMonth_month_check" CHECK ("month" >= 1 AND "month" <= 12)
);

CREATE INDEX "BudgetMonth_user_id_status_idx" ON "BudgetMonth" ("user_id", "status");

CREATE TABLE "CategoryMonthSnapshot" (
  "id"              UUID NOT NULL DEFAULT gen_random_uuid(),
  "budget_month_id" UUID NOT NULL,
  "category_id"     UUID NOT NULL,
  "user_id"         TEXT NOT NULL,
  "year"            INTEGER NOT NULL,
  "month"           INTEGER NOT NULL,
  "opening_balance" DECIMAL(65, 30) NOT NULL DEFAULT 0,
  "allocated"       DECIMAL(65, 30) NOT NULL DEFAULT 0,
  "spent"           DECIMAL(65, 30) NOT NULL DEFAULT 0,
  "closing_balance" DECIMAL(65, 30) NOT NULL DEFAULT 0,
  "version"         INTEGER NOT NULL DEFAULT 0,
  "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CategoryMonthSnapshot_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CategoryMonthSnapshot_budget_month_id_fkey"
    FOREIGN KEY ("budget_month_id") REFERENCES "BudgetMonth" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "CategoryMonthSnapshot_category_id_fkey"
    FOREIGN KEY ("category_id") REFERENCES "Category" ("id")
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "CategoryMonthSnapshot_budget_month_id_category_id_key"
    UNIQUE ("budget_month_id", "category_id"),
  CONSTRAINT "CategoryMonthSnapshot_month_check" CHECK ("month" >= 1 AND "month" <= 12)
);

CREATE INDEX "CategoryMonthSnapshot_user_id_year_month_idx"
  ON "CategoryMonthSnapshot" ("user_id", "year", "month");

CREATE INDEX "CategoryMonthSnapshot_category_id_idx"
  ON "CategoryMonthSnapshot" ("category_id");

CREATE TABLE "MonthCloseReport" (
  "id"                  UUID NOT NULL DEFAULT gen_random_uuid(),
  "budget_month_id"     UUID NOT NULL,
  "income_total"        DECIMAL(65, 30) NOT NULL,
  "spent_total"         DECIMAL(65, 30) NOT NULL,
  "reserved_total"      DECIMAL(65, 30) NOT NULL,
  "overspent_total"     DECIMAL(65, 30) NOT NULL,
  "carry_forward_total" DECIMAL(65, 30) NOT NULL,
  "warnings_json"       JSONB,
  "closed_at"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "MonthCloseReport_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "MonthCloseReport_budget_month_id_key" UNIQUE ("budget_month_id"),
  CONSTRAINT "MonthCloseReport_budget_month_id_fkey"
    FOREIGN KEY ("budget_month_id") REFERENCES "BudgetMonth" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "Allocation"
  ADD COLUMN "type" "AllocationType" NOT NULL DEFAULT 'INCOME_ASSIGNMENT';

ALTER TABLE "Allocation"
  ADD COLUMN "period_month" TIMESTAMP(3);

UPDATE "Allocation" AS a
SET "period_month" = i."period_month"
FROM "Income" AS i
WHERE a."income_id" = i."id";

ALTER TABLE "Allocation"
  ALTER COLUMN "period_month" SET NOT NULL;

CREATE INDEX "Allocation_user_id_period_month_idx"
  ON "Allocation" ("user_id", "period_month");
