import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import type { Expense } from '@/entities/expense/model/types'
import { toMoneyNumber } from '@/shared/lib/money'

import type { BudgetTotals, CategoryBudgetItem } from './types'

type AmountRow = { category_id: string; amount: string | number }

function sumByCategoryId(rows: readonly AmountRow[]): Map<string, number> {
  const totals = new Map<string, number>()
  for (const row of rows) {
    const prev = totals.get(row.category_id) ?? 0
    totals.set(row.category_id, prev + toMoneyNumber(row.amount))
  }
  return totals
}

export function buildCategoryBudgets(
  categories: readonly Category[],
  allocations: readonly Allocation[],
  expenses: readonly Expense[],
): CategoryBudgetItem[] {
  const allocatedByCategory = sumByCategoryId(allocations)
  const spentByCategory = sumByCategoryId(expenses)

  return categories
    .filter((category) => category.type !== 'income')
    .map((category) => {
      const allocated = allocatedByCategory.get(category.id) ?? 0
      const spent = spentByCategory.get(category.id) ?? 0
      return {
        category,
        allocated,
        spent,
        remaining: allocated - spent,
      }
    })
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

  const savingsSorted = [...savings].sort((a, b) => b.allocated - a.allocated)

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
