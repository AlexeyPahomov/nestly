import { buildPlanningTimelineMonths } from '@/entities/planned-expense/lib/buildPlanningTimelineMonths'
import { formatPlannedExpenseCount } from '@/entities/planned-expense/lib/formatPlannedExpenseCount'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

export type PlanningMonthTimelineProps = {
  periodMonth: string
  periodLabels: Record<string, string>
  itemCounts: Record<string, number>
  onSelect: (periodMonth: string) => void
}

export function PlanningMonthTimeline({
  periodMonth,
  periodLabels,
  itemCounts,
  onSelect,
}: PlanningMonthTimelineProps) {
  const months = buildPlanningTimelineMonths(periodMonth)

  return (
    <div className="flex flex-wrap gap-2">
      {months.map((month) => {
        const active = month === periodMonth
        const count = itemCounts[month] ?? 0

        return (
          <Button
            key={month}
            type="button"
            variant={active ? 'default' : 'outline'}
            className={cn(
              'h-auto flex-col items-start gap-0.5 px-4 py-2',
              active && 'ring-2 ring-zinc-900/10',
            )}
            onClick={() => onSelect(month)}
          >
            <span className="text-sm font-semibold">
              {periodLabels[month] ?? month}
            </span>
            <span className="text-xs font-normal text-zinc-500">
              {formatPlannedExpenseCount(count)}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
