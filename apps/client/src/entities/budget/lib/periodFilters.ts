import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import { isBeforePeriodMonth, isSamePeriodMonth } from '@coffer/shared'

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

/** Расходы с датой в месяцах строго до `periodMonth`. */
export function filterExpensesBeforePeriod(
  expenses: readonly Expense[],
  periodMonth: string,
): Expense[] {
  return expenses.filter((expense) =>
    isBeforePeriodMonth(expense.date, periodMonth),
  )
}
