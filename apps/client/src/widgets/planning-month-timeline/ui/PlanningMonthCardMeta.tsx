import { formatPlannedExpenseCount } from '@/entities/planned-expense/lib/formatPlannedExpenseCount'
import { cn } from '@/shared/lib/utils'

type PlanningMonthCardMetaProps = {
  planCount: number
  swatches: string[]
  active: boolean
}

export function PlanningMonthCardMeta({
  planCount,
  swatches,
  active,
}: PlanningMonthCardMetaProps) {
  if (planCount === 0) {
    return (
      <span
        className={cn(
          'text-xs leading-none',
          active ? 'text-zinc-300' : 'text-zinc-500',
        )}
      >
        Нет планов
      </span>
    )
  }

  return (
    <span className="mt-1 flex items-center gap-1">
      {swatches.map((swatchClassName, index) => (
        <span
          key={`month-plan-swatch-${index}`}
          className={cn(
            'inline-block size-2 rounded-full',
            swatchClassName,
            active ? 'ring-1 ring-zinc-100/80' : 'ring-1 ring-zinc-200',
          )}
          aria-hidden
        />
      ))}
      <span className="sr-only">{formatPlannedExpenseCount(planCount)}</span>
    </span>
  )
}
