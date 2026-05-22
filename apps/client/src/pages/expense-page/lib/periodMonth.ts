import type { Allocation } from '@/entities/allocation/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import {
  monthValueFromDate,
  parseDateInputValue,
  parseMonthStringToDate,
} from '@/shared/lib/date'

/** Ключ месяца `YYYY-MM` из ISO-даты или `period_month`. */
export function getMonthKeyFromIso(iso: string): string | undefined {
  const normalized = iso.length === 7 ? `${iso}-01` : iso.slice(0, 10)
  const date = parseDateInputValue(normalized)

  return date ? monthValueFromDate(date) : undefined
}

export function isSamePeriodMonth(
  isoOrMonth: string,
  periodMonth: string,
): boolean {
  return getMonthKeyFromIso(isoOrMonth) === periodMonth
}

export function isBeforePeriodMonth(
  isoOrMonth: string,
  periodMonth: string,
): boolean {
  const monthKey = getMonthKeyFromIso(isoOrMonth)

  return monthKey != null && monthKey < periodMonth
}

export function getPreviousPeriodMonth(
  periodMonth: string,
): string | undefined {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return undefined
  }

  return monthValueFromDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
}

type FormatPeriodMonthLabelOptions = {
  /** Для вставки в предложение: «перенесено с апреля 2026». */
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
