import { useRef, type ReactNode } from 'react'

import { useElementWidthThreshold } from '@/shared/hooks/use-element-width-threshold'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, InfoHint, getInfoHintLabel } from '@/shared/ui'
import { infoHintTitleTextClassName } from '@/shared/ui/info-hint/infoHintLayout'

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

const summaryMetricHeaderRowClassName =
  'flex min-h-8 shrink-0 items-center gap-2'

const summaryMetricIconSlotClassName =
  'flex size-8 shrink-0 items-center justify-center'

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
          'relative flex h-full flex-col gap-0 bg-white py-4 ring-zinc-200/80',
          infoText && infoBottomOnMax240 && isCompactInfoLayout && 'pb-10',
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col px-4">
          <div className={summaryMetricHeaderRowClassName}>
            {labelStart != null ? (
              <div className={summaryMetricIconSlotClassName}>{labelStart}</div>
            ) : null}
            <p
              className={cn(
                'min-w-0 flex-1 text-sm leading-snug text-zinc-500',
                infoHintTitleTextClassName,
              )}
            >
              {label}
            </p>
            <div className="flex shrink-0 items-center self-center">
              {infoText && !isCompactInfoLayout ? (
                <InfoHint label={getInfoHintLabel(label)}>{infoText}</InfoHint>
              ) : null}
            </div>
          </div>
          <p
            className={cn(
              'mt-auto pt-1 text-2xl font-bold leading-none tracking-tight tabular-nums text-zinc-900',
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
