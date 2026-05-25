import type { MonthBudgetProjection } from '@/processes/forecasting'

import type { OperationalSummary } from '../model/operationalSummary'

export function monthProjectionFromSummary(
  summary: OperationalSummary,
): MonthBudgetProjection {
  const plannedTotal = summary.plannedTotal
  const reservedTotal = summary.reservedTotal

  return {
    available: summary.available,
    spentTotal: summary.spentThisMonth,
    plannedTotal,
    reservedTotal,
    commitmentTotal: plannedTotal + reservedTotal,
    projectedFree: summary.projectedFree,
  }
}
