import type { Allocation } from '@/entities/allocation/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import {
  getMonthKeyFromIso,
  isBeforePeriodMonth,
  isSamePeriodMonth,
} from '@coffer/shared'

export function filterIncomesByPeriod(
  incomes: readonly Income[],
  periodMonth: string,
): Income[] {
  return incomes.filter((income) =>
    isSamePeriodMonth(income.period_month, periodMonth),
  )
}

export function filterExpensesByPeriod(
  expenses: readonly Expense[],
  periodMonth: string,
): Expense[] {
  return expenses.filter((expense) => isSamePeriodMonth(expense.date, periodMonth))
}

function getAllocationPeriodMonthKey(allocation: Allocation): string | undefined {
  if (allocation.period_month) {
    return getMonthKeyFromIso(allocation.period_month)
  }

  return getMonthKeyFromIso(allocation.income.period_month)
}

export function filterAllocationsByPeriod(
  allocations: readonly Allocation[],
  _incomes: readonly Income[],
  periodMonth: string,
): Allocation[] {
  return allocations.filter(
    (allocation) => getAllocationPeriodMonthKey(allocation) === periodMonth,
  )
}

/** Распределения из месяцев строго до `periodMonth`. */
export function filterAllocationsBeforePeriod(
  allocations: readonly Allocation[],
  _incomes: readonly Income[],
  periodMonth: string,
): Allocation[] {
  return allocations.filter((allocation) => {
    const monthKey = getAllocationPeriodMonthKey(allocation)

    return monthKey != null && monthKey < periodMonth
  })
}

/** Расходы с датой в месяцах строго до `periodMonth`. */
export function filterExpensesBeforePeriod(
  expenses: readonly Expense[],
  periodMonth: string,
): Expense[] {
  return expenses.filter((expense) =>
    isBeforePeriodMonth(expense.date, periodMonth),
  )
}
