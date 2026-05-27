import { PageTitle } from '@/shared/ui'
import { SidebarTrigger } from '@/shared/ui/sidebar'

import {
  expensePageToolbarClassName,
  expensePageToolbarTitleEndClassName,
} from '../lib/expensePageLayout'

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
      <PageTitle className="min-w-0 flex-1">Расходы</PageTitle>
      <div className={expensePageToolbarTitleEndClassName}>
        <ExpensePageMonthPicker
          value={periodMonth}
          onChange={onPeriodMonthChange}
        />
        <SidebarTrigger className="shrink-0 md:hidden" />
      </div>
    </div>
  )
}
