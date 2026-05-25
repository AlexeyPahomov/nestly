import type { PlannedExpense } from '../model/types'

export function remainingToReserve(item: PlannedExpense): number {
  return Math.max(0, item.amount - item.reserved_amount)
}
