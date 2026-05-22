import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { sumMoneyAmounts } from '@nestly/shared'

import { buildCategoryBudgets } from './buildCategoryBudgets'
import {
  filterAllocationsByPeriod,
  filterExpensesByPeriod,
  filterIncomesByPeriod,
  formatPeriodMonthLabel,
} from './periodMonth'
import type { OperationalSummary } from './types'

function sumSavingsInReserve(
  budgetItems: ReturnType<typeof buildCategoryBudgets>,
): number {
  return budgetItems
    .filter((item) => isSavingsCategory(item.category.type))
    .reduce((sum, item) => sum + Math.max(0, item.remaining), 0)
}

/** Сумма отрицательных остатков расходных конвертов (перерасход «съел» свободный пул). */
function sumExpenseOverspendCharge(
  budgetItems: ReturnType<typeof buildCategoryBudgets>,
): number {
  return budgetItems
    .filter((item) => !isSavingsCategory(item.category.type))
    .reduce((sum, item) => sum + Math.min(0, item.remaining), 0)
}

/**
 * Операционная сводка за месяц (не lifetime-агрегаты).
 *
 * Доступно = доходы месяца − распределения месяца + перерасход по конвертам.
 * (Деньги, ещё не разложенные по конвертам; при трате сверх лимита — минус.)
 */
export function computeOperationalSummary(
  incomes: readonly Income[],
  allocations: readonly Allocation[],
  expenses: readonly Expense[],
  categories: readonly Category[],
  periodMonth: string,
): OperationalSummary {
  const periodIncomes = filterIncomesByPeriod(incomes, periodMonth)
  const periodAllocations = filterAllocationsByPeriod(
    allocations,
    incomes,
    periodMonth,
  )
  const periodExpenses = filterExpensesByPeriod(expenses, periodMonth)

  const budgetItems = buildCategoryBudgets(
    categories,
    periodAllocations,
    periodExpenses,
  )

  const incomeTotal = sumMoneyAmounts(
    periodIncomes.map((income) => income.amount),
  )
  const spentThisMonth = sumMoneyAmounts(
    periodExpenses.map((expense) => expense.amount),
  )
  const allocatedTotal = sumAllocationAmounts(periodAllocations)
  const inReserve = sumSavingsInReserve(budgetItems)
  const overspendCharge = sumExpenseOverspendCharge(budgetItems)
  const available = incomeTotal - allocatedTotal + overspendCharge

  return {
    periodMonth,
    periodLabel: formatPeriodMonthLabel(periodMonth),
    available,
    inReserve,
    spentThisMonth,
  }
}
