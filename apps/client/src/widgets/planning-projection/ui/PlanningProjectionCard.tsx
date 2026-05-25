import type { MonthBudgetProjection } from '@nestly/shared'

import { cn } from '@/shared/lib/utils'
import { formatAmount } from '@/shared/lib/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

export type PlanningProjectionCardProps = {
  projection: MonthBudgetProjection
  periodLabel: string
}

export function PlanningProjectionCard({
  projection,
  periodLabel,
}: PlanningProjectionCardProps) {
  const freeTone =
    projection.projectedFree > 0
      ? 'text-emerald-700'
      : projection.projectedFree < 0
        ? 'text-red-600'
        : 'text-zinc-700'

  return (
    <Card className="border-zinc-200/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Прогноз — {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-zinc-500">Свободный пул</p>
          <p className="font-semibold text-zinc-900">
            {formatAmount(projection.available)}
          </p>
        </div>
        <div>
          <p className="text-zinc-500">Прогноз свободного</p>
          <p className={cn('font-semibold', freeTone)}>
            {formatAmount(projection.projectedFree)}
          </p>
        </div>
        <div>
          <p className="text-zinc-500">В плане</p>
          <p className="font-semibold">{formatAmount(projection.plannedTotal)}</p>
        </div>
        <div>
          <p className="text-zinc-500">В резерве</p>
          <p className="font-semibold">{formatAmount(projection.reservedTotal)}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-zinc-500">Уже потрачено (факт)</p>
          <p className="font-semibold">{formatAmount(projection.spentTotal)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
