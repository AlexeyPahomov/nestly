import { formatPlannedExpenseCount } from '@/entities/planned-expense/lib/formatPlannedExpenseCount'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import { planningMonthCardClassName } from '../lib/planningMonthSwitcherLayout'

export type PlanningMonthCardProps = {
  label: string
  planCount: number
  active: boolean
  onSelect: () => void
}

export function PlanningMonthCard({
  label,
  planCount,
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
          'text-sm font-semibold leading-tight',
          active ? 'text-white' : 'text-zinc-900',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-xs leading-tight',
          active ? 'text-zinc-300' : 'text-zinc-500',
        )}
      >
        {formatPlannedExpenseCount(planCount)}
      </span>
    </Button>
  )
}
