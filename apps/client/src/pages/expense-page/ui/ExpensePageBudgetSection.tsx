import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import { CurrentBudgetSummary } from '@/widgets/current-budget-summary'

import { expensePageBudgetHeaderClassName } from '../lib/expensePageLayout'

import { ExpensePageMonthPicker } from './ExpensePageMonthPicker'

export type ExpensePageBudgetSectionProps = {
  summary: CurrentBudgetSummaryView
  periodMonth: string
  onPeriodMonthChange: (periodMonth: string) => void
}

export function ExpensePageBudgetSection({
  summary,
  periodMonth,
  onPeriodMonthChange,
}: ExpensePageBudgetSectionProps) {
  return (
    <div className="shrink-0 space-y-3">
      <div className={expensePageBudgetHeaderClassName}>
        <ExpensePageMonthPicker
          value={periodMonth}
          onChange={onPeriodMonthChange}
          placement="budget-header"
        />
      </div>
      <CurrentBudgetSummary {...summary} />
    </div>
  )
}
