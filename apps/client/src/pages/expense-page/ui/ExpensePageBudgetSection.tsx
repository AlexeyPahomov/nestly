import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView';
import { CurrentBudgetSummary } from '@/widgets/current-budget-summary';

import { expensePageBudgetSectionClassName } from '../lib/expensePageLayout';

export type ExpensePageBudgetSectionProps = {
  summary: CurrentBudgetSummaryView;
};

export function ExpensePageBudgetSection({
  summary,
}: ExpensePageBudgetSectionProps) {
  return (
    <div className={expensePageBudgetSectionClassName}>
      <CurrentBudgetSummary {...summary} />
    </div>
  );
}
