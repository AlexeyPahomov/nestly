import type { ReactNode } from 'react'

import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, InfoHint, getInfoHintLabel } from '@/shared/ui'

export type SummaryMetricCardProps = {
  label: ReactNode
  value: number
  valueClassName?: string
  /** Текст info-подсказки рядом с заголовком. */
  infoText?: string
  headerEnd?: ReactNode
}

export function SummaryMetricCard({
  label,
  value,
  valueClassName,
  infoText,
  headerEnd,
}: SummaryMetricCardProps) {
  return (
    <Card className="relative gap-0 bg-white py-4 ring-zinc-200/80">
      {headerEnd ? (
        <div className="absolute right-4 top-4">{headerEnd}</div>
      ) : null}
      <div className="space-y-1 px-4">
        <div className={cn('flex items-center gap-1.5', headerEnd && 'pr-11')}>
          <p className="text-sm text-zinc-500">{label}</p>
          {infoText ? (
            <InfoHint label={getInfoHintLabel(label)}>{infoText}</InfoHint>
          ) : null}
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
    </Card>
  )
}
