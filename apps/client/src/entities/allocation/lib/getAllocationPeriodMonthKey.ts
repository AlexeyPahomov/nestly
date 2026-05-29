import { getMonthKeyFromIso } from '@coffer/shared'

import type { Allocation } from '../model/types'

export function getAllocationPeriodMonthKey(
  allocation: Pick<Allocation, 'period_month' | 'income'>,
): string | undefined {
  return (
    getMonthKeyFromIso(allocation.period_month) ??
    getMonthKeyFromIso(allocation.income.period_month)
  )
}

export function isAllocationAlignedWithIncome(
  allocation: Pick<Allocation, 'period_month' | 'income'>,
): boolean {
  const incomeMonth = getMonthKeyFromIso(allocation.income.period_month)
  const allocationMonth = getAllocationPeriodMonthKey(allocation)

  return (
    incomeMonth == null ||
    allocationMonth == null ||
    incomeMonth === allocationMonth
  )
}
