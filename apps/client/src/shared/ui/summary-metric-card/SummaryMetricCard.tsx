import { useRef, type ReactNode } from 'react'

import { useElementWidthThreshold } from '@/shared/hooks/use-element-width-threshold'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, InfoHint, getInfoHintLabel } from '@/shared/ui'
import {
  infoHintTitleRowClassName,
  infoHintTitleTextClassName,
} from '@/shared/ui/info-hint/infoHintLayout'

export type SummaryMetricCardProps = {
  labelStart?: ReactNode
  label: ReactNode
  value: number
  valueClassName?: string
  /** Текст info-подсказки рядом с заголовком. */
  infoText?: string
  /** До 240px переносит info-иконку в правый нижний угол карточки. */
  infoBottomOnMax240?: boolean
}

export function SummaryMetricCard({
  labelStart,
  label,
  value,
  valueClassName,
  infoText,
  infoBottomOnMax240 = false,
}: SummaryMetricCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isCompactInfoLayout = useElementWidthThreshold(
    rootRef,
    240,
    Boolean(infoText && infoBottomOnMax240),
  )

  return (
    <div ref={rootRef} className="h-full w-full">
      <Card
        className={cn(
          'relative h-full gap-0 bg-white py-4 ring-zinc-200/80',
          infoText && infoBottomOnMax240 && isCompactInfoLayout && 'pb-10',
        )}
      >
        <div className="space-y-1 px-4">
          <div className={infoHintTitleRowClassName}>
            <div className="flex min-w-0 items-center gap-2">
              {labelStart}
              <p className={cn('text-sm text-zinc-500', infoHintTitleTextClassName)}>
                {label}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {infoText && !isCompactInfoLayout ? (
                <InfoHint label={getInfoHintLabel(label)}>{infoText}</InfoHint>
              ) : null}
            </div>
          </div>
          <p
            className={cn(
              'text-2xl font-bold tracking-tight tabular-nums text-zinc-900',
              valueClassName,
            )}
          >
            {formatAmount(value)}
          </p>
        </div>
        {infoText && infoBottomOnMax240 && isCompactInfoLayout ? (
          <InfoHint
            label={getInfoHintLabel(label)}
            className="absolute bottom-4 right-4"
          >
            {infoText}
          </InfoHint>
        ) : null}
      </Card>
    </div>
  )
}
