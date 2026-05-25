CREATE TYPE "PlannedExpenseStatus" AS ENUM (
  'PLANNED',
  'RESERVED',
  'COMPLETED',
  'CANCELLED'
);

CREATE TABLE "PlannedExpense" (
  "id"              UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id"         TEXT NOT NULL,
  "title"           TEXT NOT NULL,
  "description"     TEXT,
  "amount"          DECIMAL(65, 30) NOT NULL,
  "planned_date"    TIMESTAMP(3) NOT NULL,
  "status"          "PlannedExpenseStatus" NOT NULL DEFAULT 'PLANNED',
  "category_id"     UUID,
  "budget_month_id" UUID NOT NULL,
  "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"      TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PlannedExpense_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PlannedExpense_category_id_fkey"
    FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "PlannedExpense_budget_month_id_fkey"
    FOREIGN KEY ("budget_month_id") REFERENCES "BudgetMonth"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "PlannedExpense_user_id_budget_month_id_idx"
  ON "PlannedExpense" ("user_id", "budget_month_id");

CREATE INDEX "PlannedExpense_budget_month_id_status_idx"
  ON "PlannedExpense" ("budget_month_id", "status");
