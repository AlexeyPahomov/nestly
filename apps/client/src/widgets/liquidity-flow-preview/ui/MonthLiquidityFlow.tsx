import type { MonthBudgetProjection } from '@/processes/forecasting'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

export type MonthLiquidityFlowProps = {
  periodLabel: string
  projection: MonthBudgetProjection
  /** Доход за месяц (для строки «+»). */
  incomeTotal?: number
}

type FlowLine = {
  label: string
  amount: number
  sign: '+' | '−' | '='
  emphasis?: boolean
}

export function MonthLiquidityFlow({
  periodLabel,
  projection,
  incomeTotal,
}: MonthLiquidityFlowProps) {
  const lines: FlowLine[] = []

  if (incomeTotal != null && incomeTotal > 0) {
    lines.push({ label: 'доход', amount: incomeTotal, sign: '+' })
  }

  lines.push({
    label: 'свободный пул',
    amount: projection.available,
    sign: '+',
  })

  if (projection.reservedTotal > 0) {
    lines.push({
      label: 'резерв',
      amount: projection.reservedTotal,
      sign: '−',
    })
  }

  if (projection.plannedTotal > 0) {
    lines.push({
      label: 'планы',
      amount: projection.plannedTotal,
      sign: '−',
    })
  }

  lines.push({
    label: 'прогноз',
    amount: projection.projectedFree,
    sign: '=',
    emphasis: true,
  })

  return (
    <Card className="border-zinc-200/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Поток ликвидности — {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 font-mono text-sm">
        {lines.map((line) => (
          <div
            key={`${line.sign}-${line.label}`}
            className={cn(
              'flex items-baseline justify-between gap-4 tabular-nums',
              line.emphasis && 'font-semibold text-zinc-900',
            )}
          >
            <span className="text-zinc-500">
              {line.sign} {line.label}
            </span>
            <span>{formatAmount(line.amount)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
