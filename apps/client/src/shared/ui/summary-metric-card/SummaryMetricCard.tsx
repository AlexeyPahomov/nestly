import { useRef, type ReactNode } from 'react'

import { useElementWidthThreshold } from '@/shared/hooks/use-element-width-threshold'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, InfoHint, getInfoHintLabel } from '@/shared/ui'
import { infoHintTitleTextClassName } from '@/shared/ui/info-hint/infoHintLayout'

import {
  summaryMetricCardBodyClassName,
  summaryMetricCardBottomInfoClassName,
  summaryMetricCardClassName,
  summaryMetricCardHeaderClassName,
  summaryMetricCardIconBesideRowClassName,
  summaryMetricCardIconSlotClassName,
  summaryMetricCardInfoSlotClassName,
  summaryMetricCardLabelClassName,
  summaryMetricCardLabelCompactClassName,
  summaryMetricCardTextColumnClassName,
  summaryMetricCardValueClassName,
} from './lib/summaryMetricCardLayout'

export type SummaryMetricCardProps = {
  labelStart?: ReactNode
  label: ReactNode
  value: number
  valueClassName?: string
  /** Текст info-подсказки рядом с заголовком. */
  infoText?: string
  /** До 240px переносит info-иконку в правый нижний угол карточки. */
  infoBottomOnMax240?: boolean
  /** Узкие карточки в ряд на мобилке (меньше отступы, без info; иконка — опционально). */
  responsiveCompact?: boolean
  /** Иконка слева от подписи и суммы на мобилке при `responsiveCompact`. */
  keepLabelStartOnMobile?: boolean
}

export function SummaryMetricCard({
  labelStart,
  label,
  value,
  valueClassName,
  infoText,
  infoBottomOnMax240 = false,
  responsiveCompact = false,
  keepLabelStartOnMobile = false,
}: SummaryMetricCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isCompactInfoLayout = useElementWidthThreshold(
    rootRef,
    240,
    Boolean(infoText && infoBottomOnMax240),
  )
  const compactInfoBottom = Boolean(
    infoText && infoBottomOnMax240 && isCompactInfoLayout,
  )
  const iconBesideContent = Boolean(
    responsiveCompact && keepLabelStartOnMobile && labelStart != null,
  )
  const iconSlotClassName = summaryMetricCardIconSlotClassName({
    responsiveCompact,
    keepLabelStartOnMobile,
    iconBesideContent,
  })

  const showInlineInfo = Boolean(infoText && !isCompactInfoLayout)
  const showBottomInfo = Boolean(infoText && compactInfoBottom)

  const labelRow = (
    <div
      className={summaryMetricCardHeaderClassName({
        responsiveCompact,
        iconBesideContent,
      })}
    >
      {labelStart != null && !iconBesideContent ? (
        <div className={iconSlotClassName}>{labelStart}</div>
      ) : null}
      <p
        className={cn(
          summaryMetricCardLabelClassName,
          infoHintTitleTextClassName,
          summaryMetricCardLabelCompactClassName(responsiveCompact),
        )}
      >
        {label}
      </p>
      <div className={summaryMetricCardInfoSlotClassName(responsiveCompact)}>
        {showInlineInfo ? (
          <InfoHint label={getInfoHintLabel(label)}>{infoText}</InfoHint>
        ) : null}
      </div>
    </div>
  )

  const valueRow = (
    <p
      className={summaryMetricCardValueClassName(
        responsiveCompact,
        valueClassName,
        iconBesideContent,
      )}
    >
      {formatAmount(value)}
    </p>
  )

  const textColumn = (
    <div className={summaryMetricCardTextColumnClassName(iconBesideContent)}>
      {labelRow}
      {valueRow}
    </div>
  )

  return (
    <div ref={rootRef} className="h-full w-full">
      <Card
        className={summaryMetricCardClassName({
          responsiveCompact,
          compactInfoBottom,
        })}
      >
        <div
          className={summaryMetricCardBodyClassName(
            responsiveCompact,
            iconBesideContent,
          )}
        >
          <div className={summaryMetricCardIconBesideRowClassName(iconBesideContent)}>
            {labelStart != null && iconBesideContent ? (
              <div className={iconSlotClassName}>{labelStart}</div>
            ) : null}
            {iconBesideContent ? (
              textColumn
            ) : (
              <>
                {labelRow}
                {valueRow}
              </>
            )}
          </div>
        </div>
        {showBottomInfo ? (
          <InfoHint
            label={getInfoHintLabel(label)}
            className={summaryMetricCardBottomInfoClassName(responsiveCompact)}
          >
            {infoText}
          </InfoHint>
        ) : null}
      </Card>
    </div>
  )
}
