import { getMonthKeyFromIso } from '@coffer/shared'

import type { Income } from '@/entities/income/model/types'
import { formatMonthLabel } from '@/shared/lib/format'
import { toMoneyNumber } from '@/shared/lib/money'

import {
  resolveIncomeCardTone,
  type IncomeCardView,
} from './allocationIncomeCard'

export function getIncomePeriodMonth(income: Income): string {
  return getMonthKeyFromIso(income.period_month) ?? income.period_month
}

export function buildAllocationIncomeCards(
  incomes: readonly Income[],
  allocatedByIncome: Map<string, number>,
): IncomeCardView[] {
  const byMonth = new Map<string, { amount: number; allocated: number }>()

  for (const income of incomes) {
    const periodMonth = getIncomePeriodMonth(income)
    const amount = toMoneyNumber(income.amount)
    const allocated = allocatedByIncome.get(income.id) ?? 0
    const prev = byMonth.get(periodMonth) ?? { amount: 0, allocated: 0 }

    byMonth.set(periodMonth, {
      amount: prev.amount + amount,
      allocated: prev.allocated + allocated,
    })
  }

  return [...byMonth.entries()]
    .sort(([monthA], [monthB]) => monthB.localeCompare(monthA))
    .map(([periodMonth, totals]) => {
      const allocatedPercent =
        totals.amount > 0
          ? Math.min(100, Math.round((totals.allocated / totals.amount) * 100))
          : 0

      return {
        id: periodMonth,
        periodMonth,
        periodLabel: formatMonthLabel(`${periodMonth}-01`),
        amount: totals.amount,
        tone: resolveIncomeCardTone(totals.allocated, allocatedPercent),
      }
    })
}
