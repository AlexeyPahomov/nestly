import type { CurrentBudgetSummaryView } from '../model/currentBudgetSummaryView'
import type { OperationalSummary } from '../model/operationalSummary'

export function toCurrentBudgetSummaryView(
  summary: OperationalSummary,
): CurrentBudgetSummaryView {
  return {
    available: summary.available,
    inReserve: summary.inReserve,
    spentThisMonth: summary.spentThisMonth,
    carryForwardTotal: summary.carryForwardTotal,
    previousPeriodLabel: summary.previousPeriodLabel,
    reserveCategory: summary.reserveCategory,
  }
}
