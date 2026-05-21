import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import type { Allocation } from '@/entities/allocation/model/types'
import type { Income } from '@/entities/income/model/types'
import { sumMoneyAmounts } from '@nestly/shared'

import type { TreasurySummary } from './types'

export function computeTreasurySummary(
  incomes: readonly Income[],
  allocations: readonly Allocation[],
): TreasurySummary {
  const totalFunds = sumMoneyAmounts(incomes.map((income) => income.amount))
  const allocatedTotal = sumAllocationAmounts(allocations)

  return {
    totalFunds,
    allocatedTotal,
    availableToAllocate: totalFunds - allocatedTotal,
  }
}
