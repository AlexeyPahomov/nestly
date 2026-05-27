import { PageTitle, pageSectionToolbarClassName } from '@/shared/ui'

import { expensePageToolbarTitleEndClassName } from '../lib/expensePageLayout'

import { ExpensePageMonthPicker } from './ExpensePageMonthPicker'

export type ExpensePageToolbarProps = {
  periodMonth: string
  onPeriodMonthChange: (periodMonth: string) => void
}

export function ExpensePageToolbar({
  periodMonth,
  onPeriodMonthChange,
}: ExpensePageToolbarProps) {
  return (
    <div className={pageSectionToolbarClassName}>
      <PageTitle className="min-w-0 flex-1">Расходы</PageTitle>
      <div className={expensePageToolbarTitleEndClassName}>
        <ExpensePageMonthPicker
          value={periodMonth}
          onChange={onPeriodMonthChange}
        />
      </div>
    </div>
  )
}
