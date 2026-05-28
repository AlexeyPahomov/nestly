import { PlanningPageToolbar } from '@/widgets/planning-page-toolbar'

import type { usePlanningPage } from '../model/usePlanningPage'

import { PlanningPageMonthMobileHeader } from './PlanningPageMonthViews'
import { PlanningPageMonthTransition } from './PlanningPageMonthTransition'

type PlanningPageHeaderProps = {
  page: ReturnType<typeof usePlanningPage>
}

export function PlanningPageHeader({ page }: PlanningPageHeaderProps) {
  return (
    <>
      <PlanningPageToolbar
        periodMonth={page.periodMonth}
        periodLabels={page.periodLabels}
        itemCounts={page.itemCounts}
        itemSwatches={page.itemSwatches}
        onSelectMonth={page.setPeriodMonth}
      />

      <PlanningPageMonthTransition periodMonth={page.periodMonth}>
        <PlanningPageMonthMobileHeader page={page} />
      </PlanningPageMonthTransition>
    </>
  )
}
