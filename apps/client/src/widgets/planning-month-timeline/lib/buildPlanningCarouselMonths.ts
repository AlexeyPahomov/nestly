import {
  getNextPeriodMonth,
  getPreviousPeriodMonth,
} from '@coffer/shared'

const CAROUSEL_RADIUS = 2

/** Пять месяцев вокруг выбранного — стабильная лента для Embla. */
export function buildPlanningCarouselMonths(
  centerPeriodMonth: string,
): string[] {
  const before: string[] = []
  let cursor: string | null = centerPeriodMonth

  for (let i = 0; i < CAROUSEL_RADIUS; i += 1) {
    const previous: string | null = cursor
      ? (getPreviousPeriodMonth(cursor) ?? null)
      : null
    if (!previous) {
      break
    }
    before.unshift(previous)
    cursor = previous
  }

  const after: string[] = []
  cursor = centerPeriodMonth

  for (let i = 0; i < CAROUSEL_RADIUS; i += 1) {
    const next: string | null = cursor
      ? (getNextPeriodMonth(cursor) ?? null)
      : null
    if (!next) {
      break
    }
    after.push(next)
    cursor = next
  }

  return [...before, centerPeriodMonth, ...after]
}

export function getPlanningCarouselCenterIndex(
  months: readonly string[],
  centerPeriodMonth: string,
): number {
  const index = months.indexOf(centerPeriodMonth)
  return index >= 0 ? index : 0
}
