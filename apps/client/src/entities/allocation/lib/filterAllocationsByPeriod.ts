import type { Allocation } from '../model/types'

import { getAllocationPeriodMonthKey } from './getAllocationPeriodMonthKey'
import { mergeAllocationsByCategory } from './mergeAllocationsByCategory'

export function filterAllocationsByPeriod(
  allocations: readonly Allocation[],
  periodMonth: string,
): Allocation[] {
  return allocations.filter(
    (allocation) => getAllocationPeriodMonthKey(allocation) === periodMonth,
  )
}

/** Распределения из месяцев строго до `periodMonth`. */
export function filterAllocationsBeforePeriod(
  allocations: readonly Allocation[],
  periodMonth: string,
): Allocation[] {
  return allocations.filter((allocation) => {
    const monthKey = getAllocationPeriodMonthKey(allocation)

    return monthKey != null && monthKey < periodMonth
  })
}

/** Распределения за месяц: фильтр по `period_month` и одна строка на категорию. */
export function resolveAllocationsForPeriodMonth(
  allocations: readonly Allocation[],
  periodMonth: string,
): Allocation[] {
  return mergeAllocationsByCategory(
    filterAllocationsByPeriod(allocations, periodMonth),
  )
}
