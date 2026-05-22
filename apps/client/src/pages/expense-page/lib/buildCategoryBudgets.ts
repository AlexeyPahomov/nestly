import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { mapCategoryBudgetRows } from '@/entities/budget/lib/mapCategoryBudgetItems'
import {
  CATEGORY_TYPES,
  computeCategoryBudgetsForPeriod,
  type CategoryType,
} from '@nestly/shared'

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

function categoryTypeSortIndex(type: CategoryType): number {
  const index = CATEGORY_TYPES.indexOf(type)
  return index === -1 ? CATEGORY_TYPES.length : index
}

/** Сначала по типу категории, внутри типа — по убыванию остатка. */
export function sortBudgetItemsForDisplay(
  items: readonly CategoryBudgetItem[],
): CategoryBudgetItem[] {
  return [...items].sort((a, b) => {
    const byType =
      categoryTypeSortIndex(a.category.type) -
      categoryTypeSortIndex(b.category.type)
    if (byType !== 0) {
      return byType
    }
    return b.remaining - a.remaining
  })
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
