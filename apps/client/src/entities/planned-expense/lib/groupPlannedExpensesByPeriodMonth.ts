import type { PlannedExpense } from '../model/types'

export function filterPlannedExpensesByPeriodMonth(
  items: readonly PlannedExpense[],
  periodMonth: string,
): PlannedExpense[] {
  return items.filter((item) => item.period_month === periodMonth)
}

export function countPlannedExpensesByPeriodMonth(
  items: readonly PlannedExpense[],
): Record<string, number> {
  const counts: Record<string, number> = {}

  for (const item of items) {
    counts[item.period_month] = (counts[item.period_month] ?? 0) + 1
  }

  return counts
}
