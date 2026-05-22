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

export function formatPeriodMonthLabel(periodMonth: string): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const label = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(date)

  const withoutYearSuffix = label.replace(/\s*г\.?$/, '')

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

export function filterAllocationsByPeriod(
  allocations: readonly Allocation[],
  incomes: readonly Income[],
  periodMonth: string,
): Allocation[] {
  const incomeIds = new Set(
    filterIncomesByPeriod(incomes, periodMonth).map((income) => income.id),
  )

  return allocations.filter((allocation) => incomeIds.has(allocation.income_id))
}
