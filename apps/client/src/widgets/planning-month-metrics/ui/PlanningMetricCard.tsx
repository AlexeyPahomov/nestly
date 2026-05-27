import type { ReactNode } from 'react'

import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { InfoHint, getInfoHintLabel } from '@/shared/ui'

import {
  planningMetricCardAccentClassName,
  planningMetricValueClassName,
  type PlanningMetricAccent,
} from '../lib/planningMetricCardLayout'

export type PlanningMetricCardProps = {
  title: ReactNode
  /** Краткое описание под суммой (desktop). */
  caption: string
  value: number
  accent: PlanningMetricAccent
  /** Текст info-подсказки. */
  infoText: string
}

export function PlanningMetricCard({
  title,
  caption,
  value,
  accent,
  infoText,
}: PlanningMetricCardProps) {
  return (
    <article className={planningMetricCardAccentClassName(accent)}>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-medium text-zinc-600 sm:text-sm">{title}</p>
          <InfoHint label={getInfoHintLabel(title)}>{infoText}</InfoHint>
        </div>

        <p
          className={cn(
            'text-lg font-bold tracking-tight tabular-nums sm:text-2xl',
            planningMetricValueClassName(accent, value),
          )}
        >
          {formatAmount(value)}
        </p>

        <p className="hidden text-xs text-zinc-500 sm:block">{caption}</p>
      </div>
    </article>
  )
}
