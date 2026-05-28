import type { Allocation } from '@/entities/allocation/model/types'
import type { Income } from '@/entities/income/model/types'

export function filterAllocationsForIncomes(
  allocations: readonly Allocation[],
  incomes: readonly Income[],
): Allocation[] {
  const incomeIds = new Set(incomes.map((income) => income.id))
  return allocations.filter((allocation) => incomeIds.has(allocation.income_id))
}
