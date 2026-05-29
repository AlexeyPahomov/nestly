import { appRouteNavLabel, getAppRoute } from '@/app/config/routes'
import { cn } from '@/shared/lib/utils'
import { PageTitle, pageSectionToolbarClassName } from '@/shared/ui'

import { expensePageToolbarClassName } from '../lib/expensePageLayout'

import { ExpensePageMonthSwitcher } from './ExpensePageMonthSwitcher'

const expenseRoute = getAppRoute('expenses')

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
      <PageTitle className="hidden min-w-0 flex-1 md:block">
        {appRouteNavLabel(expenseRoute)}
      </PageTitle>
      <ExpensePageMonthSwitcher
        periodMonth={periodMonth}
        onPeriodMonthChange={onPeriodMonthChange}
      />
    </div>
  )
}
