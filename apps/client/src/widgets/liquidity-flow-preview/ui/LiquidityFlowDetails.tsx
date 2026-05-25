import type { MonthBudgetProjection } from '@/processes/forecasting'
import { formatAmount } from '@/shared/lib/format'

export type LiquidityFlowDetailsProps = {
  projection: MonthBudgetProjection
  incomeTotal: number
}

type DetailLine = {
  label: string
  amount: number
  sign?: '+' | '−' | '='
}

export function LiquidityFlowDetails({
  projection,
  incomeTotal,
}: LiquidityFlowDetailsProps) {
  const lines: DetailLine[] = []

  if (incomeTotal > 0) {
    lines.push({ label: 'Доход за месяц', amount: incomeTotal, sign: '+' })
  }

  lines.push(
    { label: 'Свободный пул', amount: projection.available, sign: '+' },
    { label: 'В планах', amount: projection.plannedTotal, sign: '−' },
    { label: 'Зарезервировано', amount: projection.reservedTotal, sign: '−' },
    {
      label: 'Прогноз свободных',
      amount: projection.projectedFree,
      sign: '=',
    },
  )

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
