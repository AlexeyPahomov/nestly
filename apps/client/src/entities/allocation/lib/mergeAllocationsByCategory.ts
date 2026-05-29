import { sumMoneyAmounts } from '@coffer/shared'

import { toMoneyNumber } from '@/shared/lib/money'

import type { Allocation } from '../model/types'

function pickPrimaryAllocation(group: readonly Allocation[]): Allocation {
  return group.reduce((best, current) =>
    toMoneyNumber(current.amount) > toMoneyNumber(best.amount) ? current : best,
  )
}

/** Одна строка на категорию: суммы распределений за месяц складываются. */
export function mergeAllocationsByCategory(
  allocations: readonly Allocation[],
): Allocation[] {
  const groups = new Map<string, Allocation[]>()

  for (const allocation of allocations) {
    const group = groups.get(allocation.category_id)
    if (group) {
      group.push(allocation)
    } else {
      groups.set(allocation.category_id, [allocation])
    }
  }

  return [...groups.values()].map((group) => {
    if (group.length === 1) {
      return group[0]
    }

    return {
      ...pickPrimaryAllocation(group),
      amount: String(sumMoneyAmounts(group.map((item) => item.amount))),
    }
  })
}
