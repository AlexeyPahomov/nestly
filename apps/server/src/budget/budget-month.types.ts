import type { BudgetMonth, Prisma } from '../generated/prisma/client';

/** Строка `BudgetMonth` без включений. */
export type BudgetMonthMeta = BudgetMonth;

/** Месяц со снимками категорий и данными категории для DTO. */
export type BudgetMonthWithSnapshots = Prisma.BudgetMonthGetPayload<{
  include: {
    snapshots: {
      include: { category: true };
    };
  };
}>;

export type CategorySnapshotRow = BudgetMonthWithSnapshots['snapshots'][number];
