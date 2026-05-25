import type { MonthBudgetProjection } from '@/processes/forecasting'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { SummaryMetricCard } from '@/shared/ui/summary-metric-card'

/** Forecasting: что будет, если планы и резервы исполнятся. */
export type ProjectedBudgetSummaryProps = {
  projection: MonthBudgetProjection
  periodLabel: string
  className?: string
}

export function ProjectedBudgetSummary({
  projection,
  periodLabel,
  className,
}: ProjectedBudgetSummaryProps) {
  const freeTone =
    projection.projectedFree > 0
      ? 'text-emerald-700'
      : projection.projectedFree < 0
        ? 'text-destructive'
        : undefined

  const hasCommitments =
    projection.plannedTotal > 0 || projection.reservedTotal > 0

  if (!hasCommitments) {
    return null
  }

  return (
    <Card className={cn('border-zinc-200/80 shadow-none', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Прогноз — {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryMetricCard
            label="Свободный пул"
            value={projection.available}
          />
          <SummaryMetricCard
            label="Прогноз свободного"
            value={projection.projectedFree}
            valueClassName={freeTone}
          />
          <SummaryMetricCard
            label="Ещё в плане"
            value={projection.plannedTotal}
          />
          <SummaryMetricCard
            label="Заморожено"
            value={projection.reservedTotal}
          />
        </div>
      </CardContent>
    </Card>
  )
}
