import type { Allocation } from '@/entities/allocation/model/types'
import type { Income } from '@/entities/income/model/types'
import { toMoneyNumber } from '@/shared/lib/money'

function sumAllocatedByIncome(
  allocations: readonly Allocation[],
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

/** Доход с максимальным свободным остатком, достаточным для пополнения лимита. */
export function pickIncomeForTopUp(
  incomes: readonly Income[],
  allocations: readonly Allocation[],
  topUpAmount: number,
): { incomeId: string; remaining: number } | null {
  if (topUpAmount <= 0) {
    return null
  }

  const allocatedByIncome = sumAllocatedByIncome(allocations)
  let best: { incomeId: string; remaining: number } | null = null

  for (const income of incomes) {
    const remaining =
      toMoneyNumber(income.amount) - (allocatedByIncome.get(income.id) ?? 0)
    if (remaining >= topUpAmount) {
      if (!best || remaining > best.remaining) {
        best = { incomeId: income.id, remaining }
      }
    }
  }

  return best
}
