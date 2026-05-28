import { cn } from '@/shared/lib/utils'
import { PageTitle, pageSectionToolbarClassName } from '@/shared/ui'

import { expensePageToolbarClassName } from '../lib/expensePageLayout'

import { ExpensePageMonthSwitcher } from './ExpensePageMonthSwitcher'

export type ExpensePageToolbarProps = {
  periodMonth: string
  onPeriodMonthChange: (periodMonth: string) => void
}

export function ExpensePageToolbar({
  periodMonth,
  onPeriodMonthChange,
}: ExpensePageToolbarProps) {
  return (
    <div className={cn(pageSectionToolbarClassName, expensePageToolbarClassName)}>
      <PageTitle className="hidden min-w-0 flex-1 md:block">Расходы</PageTitle>
      <ExpensePageMonthSwitcher
        periodMonth={periodMonth}
        onPeriodMonthChange={onPeriodMonthChange}
      />
    </div>
  )
}
