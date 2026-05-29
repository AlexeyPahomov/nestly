import { PlanningMetricCard } from '@/widgets/planning-month-metrics'

import type { CurrentBudgetSummaryCardProps } from '../lib/buildCurrentBudgetSummaryCards'

export function CurrentBudgetMetricCard(props: CurrentBudgetSummaryCardProps) {
  return <PlanningMetricCard mobileCompact {...props} />
}
