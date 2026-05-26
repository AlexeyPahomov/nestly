-- Align with @coffer/shared CATEGORY_TYPES: income | expense | savings
ALTER TABLE "Category" DROP CONSTRAINT IF EXISTS "Category_type_check";

ALTER TABLE "Category" ADD CONSTRAINT "Category_type_check" CHECK (type IN ('income', 'expense', 'savings'));
