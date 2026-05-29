import { useRef, type ReactNode } from 'react'

import { useElementWidthThreshold } from '@/shared/hooks/use-element-width-threshold'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { getInfoHintLabel } from '@/shared/ui'
import {
  infoHintTitleRowClassName,
  infoHintTitleTextClassName,
} from '@/shared/ui/info-hint/infoHintLayout'

import {
  planningMetricCardAccentClassName,
  planningMetricValueClassName,
  type PlanningMetricAccent,
} from '../lib/planningMetricCardLayout'
import {
  planningMetricCardMobileCompactLayout,
  whenMobileCompact,
} from '../lib/planningMetricCardMobileCompactLayout'

import { PlanningMetricCardInfo } from './PlanningMetricCardInfo'

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
  /** Компактный вид на мобилке (три колонки): контент внизу, info сверху справа. */
  mobileCompact?: boolean
}

export function PlanningMetricCard({
  title,
  caption,
  value,
  accent,
  infoText,
  infoBottomOnMax240 = false,
  mobileCompact = false,
}: PlanningMetricCardProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const isNarrowCard = useElementWidthThreshold(
    rootRef,
    240,
    infoBottomOnMax240 && !mobileCompact,
  )
  const useBottomInfo = infoBottomOnMax240 && isNarrowCard && !mobileCompact
  const infoLabel = getInfoHintLabel(title)
  const infoProps = { label: infoLabel, infoText }
  const compact = planningMetricCardMobileCompactLayout

  return (
    <article
      ref={rootRef}
      className={cn(
        planningMetricCardAccentClassName(accent),
        whenMobileCompact(mobileCompact, compact.shell),
        useBottomInfo && 'pb-10',
      )}
    >
      {mobileCompact ? (
        <PlanningMetricCardInfo placement="mobileCompactTop" {...infoProps} />
      ) : null}

      <div
        className={cn('space-y-1', whenMobileCompact(mobileCompact, compact.body))}
      >
        <div
          className={cn(
            infoHintTitleRowClassName,
            whenMobileCompact(mobileCompact, compact.titleRow),
          )}
        >
          <p
            className={cn(
              'text-xs font-medium text-zinc-600 sm:text-sm',
              infoHintTitleTextClassName,
              whenMobileCompact(mobileCompact, compact.title),
            )}
          >
            {title}
          </p>
          {!mobileCompact && !isNarrowCard ? (
            <PlanningMetricCardInfo placement="inline" {...infoProps} />
          ) : null}
          {mobileCompact ? (
            <PlanningMetricCardInfo
              placement="mobileCompactDesktopInline"
              {...infoProps}
            />
          ) : null}
        </div>

        <p
          className={cn(
            'text-lg font-bold tracking-tight tabular-nums sm:text-2xl',
            planningMetricValueClassName(accent, value),
            whenMobileCompact(mobileCompact, compact.value),
          )}
        >
          {formatAmount(value)}
        </p>

        <p className="hidden text-xs text-zinc-500 sm:block">{caption}</p>
      </div>

      {useBottomInfo ? (
        <PlanningMetricCardInfo placement="narrowBottom" {...infoProps} />
      ) : null}
    </article>
  )
}
