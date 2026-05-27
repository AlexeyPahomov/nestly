import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import { CurrentBudgetSummary } from '@/widgets/current-budget-summary'

export type ExpensePageBudgetSectionProps = {
  summary: CurrentBudgetSummaryView
}

export function ExpensePageBudgetSection({
  summary,
}: ExpensePageBudgetSectionProps) {
  return (
    <div className="shrink-0">
      <CurrentBudgetSummary {...summary} />
    </div>
  )
}
