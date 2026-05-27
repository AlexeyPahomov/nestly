import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { Spinner } from '@/shared/ui'
import { MonthLiquidityFlow, PlanningMobileLiquidityHeader } from '@/widgets/liquidity-flow-preview'
import { PlanningMonthMetrics } from '@/widgets/planning-month-metrics'

import type { usePlanningPage } from '../model/usePlanningPage'

import { PlanningPagePlansSection } from './PlanningPagePlansSection'

type PlanningPageMonthViewsProps = {
  page: ReturnType<typeof usePlanningPage>
  onEditPlanned: (item: PlannedExpense) => void
}

export function PlanningPageMonthMobileHeader({
  page,
}: Pick<PlanningPageMonthViewsProps, 'page'>) {
  if (page.isLoading) {
    return null
  }

  return (
    <PlanningMobileLiquidityHeader
      projection={page.projection}
      incomeTotal={page.incomeTotal}
    />
  )
}

export function PlanningPageMonthBody({
  page,
  onEditPlanned,
}: PlanningPageMonthViewsProps) {
  if (page.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-8 text-zinc-500" />
      </div>
    )
  }

  return (
    <>
      <PlanningMonthMetrics
        className="hidden md:grid"
        projection={page.projection}
        periodMonth={page.periodMonth}
      />

      <MonthLiquidityFlow
        className="hidden md:flex"
        projection={page.projection}
        incomeTotal={page.incomeTotal}
      />

      <PlanningPagePlansSection page={page} onEditPlanned={onEditPlanned} />
    </>
  )
}
