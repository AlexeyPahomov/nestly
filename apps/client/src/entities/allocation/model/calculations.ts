import { sumMoneyAmounts } from '@coffer/shared'

type AmountRow = { amount: string }

export function sumAllocationAmounts(allocations: readonly AmountRow[]): number {
  return sumMoneyAmounts(allocations.map((row) => row.amount))
}
