import type { Allocation } from '@/entities/allocation/model/types'
import { toMoneyNumber } from '@/shared/lib/money'

export function sumAllocatedByIncome(
  allocations: readonly Pick<Allocation, 'income_id' | 'amount'>[],
): Map<string, number> {
  const totals = new Map<string, number>()

  for (const row of allocations) {
    totals.set(
      row.income_id,
      (totals.get(row.income_id) ?? 0) + toMoneyNumber(row.amount),
    )
  }

  return totals
}
