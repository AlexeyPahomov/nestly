import type { CategoryBudgetItem } from '@/entities/budget/model/types'

import { formatPeriodMonthGenitive, getPreviousPeriodMonth } from './periodMonth'

export type CarryForwardMeta = {
  total: number
  previousPeriodLabel?: string
}

export function sumCarryForwardTotal(
  items: readonly CategoryBudgetItem[],
): number {
  return items.reduce((sum, item) => sum + item.carriedFromPrevious, 0)
}

export function getCarryForwardMeta(
  periodMonth: string,
  items: readonly CategoryBudgetItem[],
): CarryForwardMeta {
  const total = sumCarryForwardTotal(items)
  const previousPeriodMonth = getPreviousPeriodMonth(periodMonth)

  return {
    total,
    previousPeriodLabel:
      total !== 0 && previousPeriodMonth
        ? formatPeriodMonthGenitive(previousPeriodMonth)
        : undefined,
  }
}
