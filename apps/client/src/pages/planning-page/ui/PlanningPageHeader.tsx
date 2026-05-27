import { PlanningMobileLiquidityHeader } from '@/widgets/liquidity-flow-preview'
import { PlanningPageToolbar } from '@/widgets/planning-page-toolbar'

import type { usePlanningPage } from '../model/usePlanningPage'

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
        onSelectMonth={page.setPeriodMonth}
      />

      {!page.isLoading ? (
        <PlanningMobileLiquidityHeader
          projection={page.projection}
          incomeTotal={page.incomeTotal}
        />
      ) : null}
    </>
  )
}
