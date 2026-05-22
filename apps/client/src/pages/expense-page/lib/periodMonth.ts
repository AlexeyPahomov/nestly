import type { Allocation } from '@/entities/allocation/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import {
  getMonthKeyFromIso,
  getPreviousPeriodMonth,
  isBeforePeriodMonth,
  isSamePeriodMonth,
} from '@nestly/shared'
import { parseMonthStringToDate } from '@/shared/lib/date'

export {
  getMonthKeyFromIso,
  getPreviousPeriodMonth,
  isBeforePeriodMonth,
  isSamePeriodMonth,
}

type FormatPeriodMonthLabelOptions = {
  lowercase?: boolean
}

export function formatPeriodMonthLabel(
  periodMonth: string,
  options?: FormatPeriodMonthLabelOptions,
): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const label = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(date)

  const withoutYearSuffix = label.replace(/\s*г\.?$/, '')

  if (options?.lowercase) {
    return withoutYearSuffix.toLowerCase()
  }

  return withoutYearSuffix.charAt(0).toUpperCase() + withoutYearSuffix.slice(1)
}

/** Месяц в родительном падеже для «перенесено с …» (без года). */
export function formatPeriodMonthGenitive(periodMonth: string): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const monthPart = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
    .formatToParts(date)
    .find((part) => part.type === 'month')?.value

  return monthPart?.toLowerCase() ?? periodMonth
}

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
