import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import type { CategoryBudgetItem } from '@/entities/budget/model/types'
import type { Allocation } from '@/entities/allocation/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { sumMoneyAmounts } from '@nestly/shared'

import { getCarryForwardMeta } from './carryForward'
import {
  filterAllocationsByPeriod,
  filterExpensesByPeriod,
  filterIncomesByPeriod,
  formatPeriodMonthLabel,
} from './periodMonth'
import type { OperationalSummary } from './types'

function sumSavingsInReserve(
  budgetItems: readonly CategoryBudgetItem[],
): number {
  return budgetItems
    .filter((item) => isSavingsCategory(item.category.type))
    .reduce((sum, item) => sum + Math.max(0, item.remaining), 0)
}

/** Сумма отрицательных остатков расходных конвертов (перерасход «съел» свободный пул). */
function sumExpenseOverspendCharge(
  budgetItems: readonly CategoryBudgetItem[],
): number {
  return budgetItems
    .filter((item) => !isSavingsCategory(item.category.type))
    .reduce((sum, item) => sum + Math.min(0, item.remaining), 0)
}

/**
 * Операционная сводка за месяц по уже посчитанным конвертам (без повторного build).
 */
export function computeOperationalSummary(
  budgetItems: readonly CategoryBudgetItem[],
  incomes: readonly Income[],
  allocations: readonly Allocation[],
  expenses: readonly Expense[],
  periodMonth: string,
): OperationalSummary {
  const periodIncomes = filterIncomesByPeriod(incomes, periodMonth)
  const periodAllocations = filterAllocationsByPeriod(
    allocations,
    incomes,
    periodMonth,
  )
  const periodExpenses = filterExpensesByPeriod(expenses, periodMonth)

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
  const { total: carryForwardTotal, previousPeriodLabel } =
    getCarryForwardMeta(periodMonth, budgetItems)

  const savingsItem = budgetItems.find((item) =>
    isSavingsCategory(item.category.type),
  )

  return {
    periodMonth,
    periodLabel: formatPeriodMonthLabel(periodMonth),
    available,
    inReserve,
    spentThisMonth,
    carryForwardTotal,
    previousPeriodLabel,
    reserveCategory: savingsItem
      ? {
          name: savingsItem.category.name,
          icon: savingsItem.category.icon,
          type: savingsItem.category.type,
        }
      : undefined,
  }
}
