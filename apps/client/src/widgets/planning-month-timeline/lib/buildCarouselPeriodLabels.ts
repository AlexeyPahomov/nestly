import { formatPeriodMonthLabel } from '@/entities/budget/lib/periodLabels'

import { buildPlanningCarouselMonths } from './buildPlanningCarouselMonths'

export function buildCarouselPeriodLabels(
  periodMonth: string,
): Record<string, string> {
  return Object.fromEntries(
    buildPlanningCarouselMonths(periodMonth).map((month) => [
      month,
      formatPeriodMonthLabel(month),
    ]),
  )
}
