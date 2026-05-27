import { useRef, type ReactNode } from 'react'

import { useElementWidthThreshold } from '@/shared/hooks/use-element-width-threshold'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { InfoHint, getInfoHintLabel } from '@/shared/ui'
import {
  infoHintTitleRowClassName,
  infoHintTitleTextClassName,
} from '@/shared/ui/info-hint/infoHintLayout'

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
  /** До 240px переносит info-иконку в правый нижний угол карточки. */
  infoBottomOnMax240?: boolean
}

export function PlanningMetricCard({
  title,
  caption,
  value,
  accent,
  infoText,
  infoBottomOnMax240 = false,
}: PlanningMetricCardProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const isCompactInfoLayout = useElementWidthThreshold(
    rootRef,
    240,
    infoBottomOnMax240,
  )

  return (
    <article
      ref={rootRef}
      className={cn(
        planningMetricCardAccentClassName(accent),
        infoBottomOnMax240 && isCompactInfoLayout && 'pb-10',
      )}
    >
      <div className="space-y-1">
        <div className={infoHintTitleRowClassName}>
          <p
            className={cn(
              'text-xs font-medium text-zinc-600 sm:text-sm',
              infoHintTitleTextClassName,
            )}
          >
            {title}
          </p>
          {!isCompactInfoLayout ? (
            <InfoHint label={getInfoHintLabel(title)} className="shrink-0">
              {infoText}
            </InfoHint>
          ) : null}
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
      {infoBottomOnMax240 && isCompactInfoLayout ? (
        <InfoHint
          label={getInfoHintLabel(title)}
          className="absolute bottom-2.5 right-2.5"
        >
          {infoText}
        </InfoHint>
      ) : null}
    </article>
  )
}
