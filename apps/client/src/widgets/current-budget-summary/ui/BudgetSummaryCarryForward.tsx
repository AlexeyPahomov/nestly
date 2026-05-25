import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

type BudgetSummaryCarryForwardProps = {
  total: number
  previousPeriodLabel: string
}

export function BudgetSummaryCarryForward({
  total,
  previousPeriodLabel,
}: BudgetSummaryCarryForwardProps) {
  return (
    <p className="text-sm text-zinc-500">
      Перенесено с {previousPeriodLabel}:{' '}
      <span
        className={cn(
          'font-semibold tabular-nums',
          total > 0 ? 'text-zinc-900' : 'text-destructive',
        )}
      >
        {formatAmount(total)}
      </span>
    </p>
  )
}
