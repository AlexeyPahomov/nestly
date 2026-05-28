import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import { mergeBudgetMonthWithDerived } from '@/entities/budget-month/lib/mergeBudgetMonthWithDerived'
import type { BudgetMonthView } from '@/entities/budget-month/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { monthValueFromDate } from '@coffer/shared'

import type { CategoryBudgetItem } from '../model/types'

import {
  buildCategoryBudgets,
  sortBudgetItemsForDisplay,
} from './buildCategoryBudgets'

function dropCarryForwardForFuturePeriods(
  items: readonly CategoryBudgetItem[],
  periodMonth: string,
): CategoryBudgetItem[] {
  const currentPeriodMonth = monthValueFromDate(new Date())
  if (periodMonth <= currentPeriodMonth) {
    return [...items]
  }

  return items.map((item) => ({
    ...item,
    carriedFromPrevious: 0,
    remaining: item.allocated - item.spent,
  }))
}

export function resolveExpensePageBudgetItems(
  categories: readonly Category[],
  allocations: readonly Allocation[],
  expenses: readonly Expense[],
  incomes: readonly Income[],
  periodMonth: string,
  budgetMonthView: BudgetMonthView | undefined,
): CategoryBudgetItem[] {
  const derived = buildCategoryBudgets(
    categories,
    allocations,
    expenses,
    incomes,
    periodMonth,
  )

  const resolved = mergeBudgetMonthWithDerived(
    derived,
    budgetMonthView,
    categories,
    periodMonth,
  )
  const normalized = dropCarryForwardForFuturePeriods(resolved, periodMonth)

  return sortBudgetItemsForDisplay(normalized)
}
