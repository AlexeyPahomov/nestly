import { PageSectionTitleRow } from '@/shared/ui'

import { expensePageToolbarClassName } from '../lib/expensePageLayout'

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
    <div className={expensePageToolbarClassName}>
      <PageSectionTitleRow>Расходы</PageSectionTitleRow>
      <ExpensePageMonthPicker
        value={periodMonth}
        onChange={onPeriodMonthChange}
        placement="page-header"
      />
    </div>
  )
}
