import { InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui'

import {
  planningMetricCardAccentClassName,
  planningMetricValueClassName,
  type PlanningMetricAccent,
} from '../lib/planningMetricCardLayout'

export type PlanningMetricCardProps = {
  title: ReactNode
  hint: string
  value: number
  accent: PlanningMetricAccent
  tooltip: string
}

export function PlanningMetricCard({
  title,
  hint,
  value,
  accent,
  tooltip,
}: PlanningMetricCardProps) {
  return (
    <article className={planningMetricCardAccentClassName(accent)}>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-zinc-600">{title}</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                aria-label={typeof title === 'string' ? title : 'Подробнее'}
              >
                <InfoIcon className="size-3.5" strokeWidth={2} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-sm">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </div>

        <p
          className={cn(
            'text-2xl font-bold tracking-tight tabular-nums',
            planningMetricValueClassName(accent, value),
          )}
        >
          {formatAmount(value)}
        </p>

        <p className="text-xs text-zinc-500">{hint}</p>
      </div>
    </article>
  )
}
