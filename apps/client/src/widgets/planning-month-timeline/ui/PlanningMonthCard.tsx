import { formatPlannedExpenseCount } from '@/entities/planned-expense/lib/formatPlannedExpenseCount'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import { planningMonthCardClassName } from '../lib/planningMonthSwitcherLayout'

export type PlanningMonthCardProps = {
  label: string
  planCount: number
  swatches: string[]
  active: boolean
  onSelect: () => void
}

export function PlanningMonthCard({
  label,
  planCount,
  swatches,
  active,
  onSelect,
}: PlanningMonthCardProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'h-auto w-full font-normal',
        active
          ? 'hover:bg-zinc-900 hover:text-white'
          : 'hover:bg-transparent',
        planningMonthCardClassName(active),
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'text-sm font-semibold leading-none',
          active ? 'text-white' : 'text-zinc-900',
        )}
      >
        {label}
      </span>
      {planCount === 0 ? (
        <span
          className={cn(
            'text-xs leading-none',
            active ? 'text-zinc-300' : 'text-zinc-500',
          )}
        >
          Нет планов
        </span>
      ) : (
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
      )}
    </Button>
  )
}
