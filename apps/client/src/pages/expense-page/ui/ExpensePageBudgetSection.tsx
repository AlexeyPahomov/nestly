import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import { CurrentBudgetSummary } from '@/widgets/current-budget-summary'

export type ExpensePageBudgetSectionProps = {
  summary: CurrentBudgetSummaryView
}

export function ExpensePageBudgetSection({
  summary,
}: ExpensePageBudgetSectionProps) {
  return (
    <div className="shrink-0 ps-px pt-px md:ps-0.5 md:pt-0.5">
      <CurrentBudgetSummary {...summary} />
    </div>
  )
}
