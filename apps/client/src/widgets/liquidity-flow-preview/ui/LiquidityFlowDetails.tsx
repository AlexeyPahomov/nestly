import type { MonthBudgetProjection } from '@/processes/forecasting'
import { formatAmount } from '@/shared/lib/format'

import {
  liquidityFlowAllocatedDetailLabel,
  liquidityFlowIncomeDetailLabel,
  liquidityFlowNodeLabels,
} from '../lib/liquidityFlowCopy'

export type LiquidityFlowDetailsProps = {
  projection: MonthBudgetProjection
  incomeTotal: number
  allocatedTotal?: number
}

type DetailLine = {
  label: string
  amount: number
  sign?: '+' | '−' | '='
}

function buildDetailLines(
  projection: MonthBudgetProjection,
  incomeTotal: number,
  allocatedTotal: number,
): DetailLine[] {
  const optionalLines: DetailLine[] = []

  if (incomeTotal > 0) {
    optionalLines.push({
      label: liquidityFlowIncomeDetailLabel,
      amount: incomeTotal,
      sign: '+',
    })
  }

  if (allocatedTotal > 0) {
    optionalLines.push({
      label: liquidityFlowAllocatedDetailLabel,
      amount: allocatedTotal,
      sign: '−',
    })
  }

  return [
    ...optionalLines,
    { label: liquidityFlowNodeLabels.pool, amount: projection.available, sign: '+' },
    { label: liquidityFlowNodeLabels.planned, amount: projection.plannedTotal, sign: '−' },
    { label: liquidityFlowNodeLabels.reserved, amount: projection.reservedTotal, sign: '−' },
    {
      label: liquidityFlowNodeLabels.forecast,
      amount: projection.projectedFree,
      sign: '=',
    },
  ]
}

export function LiquidityFlowDetails({
  projection,
  incomeTotal,
  allocatedTotal = 0,
}: LiquidityFlowDetailsProps) {
  const lines = buildDetailLines(projection, incomeTotal, allocatedTotal)

  return (
    <div className="space-y-2 text-sm">
      <p className="text-zinc-600">
        Свободный пул минус обязательства по планам и резервам даёт прогноз
        свободных средств на конец месяца.
      </p>
      <ul className="space-y-1.5 font-mono tabular-nums text-zinc-800">
        {lines.map((line) => (
          <li
            key={line.label}
            className="flex items-baseline justify-between gap-4"
          >
            <span className="text-zinc-500">
              {line.sign ? `${line.sign} ` : ''}
              {line.label}
            </span>
            <span>{formatAmount(line.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
