import {
  getNextPeriodMonth,
  getPreviousPeriodMonth,
} from '@coffer/shared'

/** Три месяца вокруг выбранного — ось планирования. */
export function buildPlanningTimelineMonths(
  centerPeriodMonth: string,
): string[] {
  const previous = getPreviousPeriodMonth(centerPeriodMonth)
  const next = getNextPeriodMonth(centerPeriodMonth)

  return [
    ...(previous ? [previous] : []),
    centerPeriodMonth,
    ...(next ? [next] : []),
  ]
}
