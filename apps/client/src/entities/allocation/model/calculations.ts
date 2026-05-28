import { sumMoneyAmounts } from '@coffer/shared'

import { toMoneyNumber } from '@/shared/lib/money'

type AmountRow = { amount: string }

export function sumAllocationAmounts(allocations: readonly AmountRow[]): number {
  return sumMoneyAmounts(allocations.map((row) => row.amount))
}

/** Доля суммы от дохода, 0–100. `null`, если доход не задан или равен нулю. */
export function allocationIncomePercent(
  partAmount: number,
  incomeAmount: number | null | undefined,
): number | null {
  if (incomeAmount == null || incomeAmount <= 0) {
    return null
  }

  return Math.min(100, Math.max(0, Math.round((partAmount / incomeAmount) * 100)))
}

export function allocationIncomePercentOrZero(
  partAmount: number,
  incomeAmount: number | null | undefined,
): number {
  return allocationIncomePercent(partAmount, incomeAmount) ?? 0
}

function compareAllocationsByIncomePercentDesc<T extends AmountRow>(
  a: T,
  b: T,
  incomeAmount: number,
): number {
  const percentA = allocationIncomePercent(toMoneyNumber(a.amount), incomeAmount) ?? -1
  const percentB = allocationIncomePercent(toMoneyNumber(b.amount), incomeAmount) ?? -1

  if (percentB !== percentA) {
    return percentB - percentA
  }

  return toMoneyNumber(b.amount) - toMoneyNumber(a.amount)
}

export function sortAllocationsByIncomePercentDesc<T extends AmountRow>(
  allocations: readonly T[],
  incomeAmount: number | null | undefined,
): T[] {
  if (incomeAmount == null || incomeAmount <= 0) {
    return [...allocations]
  }

  return [...allocations].sort((a, b) =>
    compareAllocationsByIncomePercentDesc(a, b, incomeAmount),
  )
}
