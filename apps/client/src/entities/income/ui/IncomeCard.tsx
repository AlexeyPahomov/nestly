import { formatAmount, formatMonthLabel } from '../../../shared/lib/format'
import type { Income } from '../model/types'

type IncomeCardProps = {
  income: Income
}

export function IncomeCard({ income }: IncomeCardProps) {
  const title = income.source?.trim() ? income.source : 'Без описания'

  return (
    <article className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
        <span className="text-lg font-bold tabular-nums text-zinc-900">
          {formatAmount(income.amount)}
        </span>
      </div>
      <p className="mt-1 text-sm text-zinc-500">Период: {formatMonthLabel(income.period_month)}</p>
    </article>
  )
}
