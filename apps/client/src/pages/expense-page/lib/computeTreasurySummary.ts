import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import type { Allocation } from '@/entities/allocation/model/types'
import type { Income } from '@/entities/income/model/types'
import { sumMoneyAmounts } from '@nestly/shared'

import { sumBudgetTotals } from './buildCategoryBudgets'
import type { CategoryBudgetItem, TreasurySummary } from './types'

export function computeTreasurySummary(
  incomes: readonly Income[],
  allocations: readonly Allocation[],
  budgetItems: readonly CategoryBudgetItem[],
): TreasurySummary {
  const totalFunds = sumMoneyAmounts(incomes.map((income) => income.amount))
  const allocatedTotal = sumAllocationAmounts(allocations)
  const { remaining, spent } = sumBudgetTotals(budgetItems)

  return {
    totalFunds,
    availableToAllocate: totalFunds - allocatedTotal,
    categoryRemainingTotal: remaining,
    totalSpent: spent,
  }
}
