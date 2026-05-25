import type { MonthBudgetProjection } from '@/processes/forecasting'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { SummaryMetricCard } from '@/shared/ui/summary-metric-card'

/** Forecasting: что будет, если планы и резервы исполнятся. */
export type ProjectedBudgetSummaryProps = {
  projection: MonthBudgetProjection
  periodLabel: string
  /** На странице расходов — компактная колонка рядом с фактом. */
  variant?: 'card' | 'compact'
  className?: string
}

export function ProjectedBudgetSummary({
  projection,
  periodLabel,
  variant = 'card',
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

  const metricsGridClassName =
    variant === 'compact'
      ? 'grid grid-cols-2 gap-2'
      : 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <Card className={cn('border-zinc-200/80 shadow-none', className)}>
      <CardHeader className={cn(variant === 'compact' && 'px-4 py-3 pb-1')}>
        <CardTitle
          className={cn(
            'font-medium',
            variant === 'compact' ? 'text-sm text-zinc-600' : 'text-base',
          )}
        >
          Прогноз — {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(variant === 'compact' && 'px-4 pb-3 pt-1')}>
        <div className={metricsGridClassName}>
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
