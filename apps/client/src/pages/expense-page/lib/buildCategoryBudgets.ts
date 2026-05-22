import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { mapCategoryBudgetRows } from '@/entities/budget/lib/mapCategoryBudgetItems'
import { computeCategoryBudgetsForPeriod } from '@nestly/shared'

import type { CategoryBudgetItem } from '@/entities/budget/model/types'

import type { BudgetTotals } from './types'

export function buildCategoryBudgets(
  categories: readonly Category[],
  allocations: readonly Allocation[],
  expenses: readonly Expense[],
  _incomes: readonly Income[],
  periodMonth: string,
): CategoryBudgetItem[] {
  const rebuilt = computeCategoryBudgetsForPeriod(
    categories.map((c) => ({ id: c.id, type: c.type })),
    allocations.map((a) => ({
      category_id: a.category_id,
      amount: a.amount,
      period_month: a.period_month,
    })),
    expenses.map((e) => ({
      category_id: e.category_id,
      amount: e.amount,
      date: e.date,
    })),
    periodMonth,
  )

  return mapCategoryBudgetRows(categories, rebuilt)
}

/** Перерасход (remaining < 0) — в начале списка расходных конвертов. */
export function sortBudgetItemsByRemainingAsc(
  items: readonly CategoryBudgetItem[],
): CategoryBudgetItem[] {
  return [...items].sort((a, b) => a.remaining - b.remaining)
}

/** Накопления сверху, затем расходные: перерасходные, потом остальные. */
export function sortBudgetItemsForDisplay(
  items: readonly CategoryBudgetItem[],
): CategoryBudgetItem[] {
  const savings = items.filter((item) => isSavingsCategory(item.category.type))
  const expenses = items.filter((item) => !isSavingsCategory(item.category.type))

  const overdrawn = expenses
    .filter((item) => item.remaining < 0)
    .sort((a, b) => a.remaining - b.remaining)
  const inBudget = expenses
    .filter((item) => item.remaining >= 0)
    .sort((a, b) => a.remaining - b.remaining)

  const savingsSorted = [...savings].sort(
    (a, b) => b.remaining - a.remaining,
  )

  return [...savingsSorted, ...overdrawn, ...inBudget]
}

export function sumBudgetTotals(
  items: readonly CategoryBudgetItem[],
): BudgetTotals {
  return items.reduce(
    (acc, item) => ({
      allocated: acc.allocated + item.allocated,
      spent: acc.spent + item.spent,
      remaining: acc.remaining + item.remaining,
    }),
    { allocated: 0, spent: 0, remaining: 0 },
  )
}
