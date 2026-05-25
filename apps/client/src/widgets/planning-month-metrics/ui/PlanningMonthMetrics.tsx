import type { MonthBudgetProjection } from '@/processes/forecasting'
import { TooltipProvider } from '@/shared/ui'

import {
  PLANNING_METRIC_COPY,
  planningForecastMetricTitle,
} from '../lib/planningMetricCopy'
import { planningMonthMetricsGridClassName } from '../lib/planningMonthMetricsLayout'

import { PlanningMetricCard } from './PlanningMetricCard'

export type PlanningMonthMetricsProps = {
  projection: MonthBudgetProjection
  periodLabel: string
}

export function PlanningMonthMetrics({
  projection,
  periodLabel,
}: PlanningMonthMetricsProps) {
  const copy = PLANNING_METRIC_COPY

  return (
    <TooltipProvider delayDuration={300}>
      <div className={planningMonthMetricsGridClassName}>
        <PlanningMetricCard
          accent="forecast"
          title={planningForecastMetricTitle(periodLabel)}
          hint={copy.forecast.hint}
          tooltip={copy.forecast.tooltip}
          value={projection.projectedFree}
        />
        <PlanningMetricCard
          accent="pool"
          title={copy.pool.title}
          hint={copy.pool.hint}
          tooltip={copy.pool.tooltip}
          value={projection.available}
        />
        <PlanningMetricCard
          accent="planned"
          title={copy.planned.title}
          hint={copy.planned.hint}
          tooltip={copy.planned.tooltip}
          value={projection.plannedTotal}
        />
        <PlanningMetricCard
          accent="reserved"
          title={copy.reserved.title}
          hint={copy.reserved.hint}
          tooltip={copy.reserved.tooltip}
          value={projection.reservedTotal}
        />
      </div>
    </TooltipProvider>
  )
}
