import { sumMoneyAmounts } from '@nestly/shared'

type AmountRow = { amount: string }

export function sumAllocationAmounts(allocations: readonly AmountRow[]): number {
  return sumMoneyAmounts(allocations.map((row) => row.amount))
}
