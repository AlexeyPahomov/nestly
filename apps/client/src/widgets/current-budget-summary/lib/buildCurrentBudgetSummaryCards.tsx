import type { ReactNode } from 'react'

import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import { ResponsiveLabel } from '@/shared/ui/responsive-label/ResponsiveLabel'
import type { PlanningMetricCardProps } from '@/widgets/planning-month-metrics'

import {
  buildCurrentBudgetAvailableInfo,
  CURRENT_BUDGET_METRIC_COPY,
} from './currentBudgetSummaryCopy'

export type CurrentBudgetSummaryCardProps = Omit<
  PlanningMetricCardProps,
  'mobileCompact'
>

export function buildCurrentBudgetSummaryCards({
  available,
  inReserve,
  spentThisMonth,
  carryForwardTotal = 0,
  previousPeriodLabel,
  reserveCategory,
}: CurrentBudgetSummaryView): CurrentBudgetSummaryCardProps[] {
  const copy = CURRENT_BUDGET_METRIC_COPY
  const reserveTitle = reserveCategory?.name ?? copy.reserve.desktopTitle

  return [
    {
      accent: 'pool',
      title: copy.available.title,
      caption: copy.available.caption,
      infoText: buildCurrentBudgetAvailableInfo(
        carryForwardTotal,
        previousPeriodLabel,
      ),
      value: available,
    },
    {
      accent: 'savings',
      title: metricResponsiveTitle(copy.reserve.mobileTitle, reserveTitle),
      caption: copy.reserve.caption,
      infoText: copy.reserve.infoText,
      value: inReserve,
    },
    {
      accent: 'spent',
      title: metricResponsiveTitle(
        copy.spent.mobileTitle,
        copy.spent.desktopTitle,
      ),
      caption: copy.spent.caption,
      infoText: copy.spent.infoText,
      value: spentThisMonth,
    },
  ]
}

function metricResponsiveTitle(mobile: string, desktop: string): ReactNode {
  return <ResponsiveLabel mobile={mobile} desktop={desktop} />
}
