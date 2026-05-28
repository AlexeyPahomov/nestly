import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import type { ReserveCategorySummary } from '@/entities/budget/model/types'
import { ResponsiveLabel } from '@/shared/ui/responsive-label/ResponsiveLabel'
import { SummaryMetricCard } from '@/shared/ui/summary-metric-card'

import {
  buildCurrentBudgetAvailableInfo,
  CURRENT_BUDGET_RESERVE_INFO,
  CURRENT_BUDGET_RESERVE_LABEL,
  CURRENT_BUDGET_RESERVE_MOBILE_LABEL,
} from '../lib/currentBudgetSummaryCopy'
import {
  currentBudgetSummaryGridClassName,
  currentBudgetSummaryMetricCompact,
  reserveCategoryIconClassName,
  reserveCategoryIconGlyphClassName,
} from '../lib/currentBudgetSummaryLayout'

/** Reporting: что произошло / текущее состояние пула (факт). */
export type CurrentBudgetSummaryProps = CurrentBudgetSummaryView

function ReserveCategoryIcon({
  reserveCategory,
}: {
  reserveCategory: ReserveCategorySummary
}) {
  return (
    <span className={reserveCategoryIconClassName}>
      <CategoryLucideIcon
        {...toCategoryLucideIconProps(reserveCategory)}
        className={reserveCategoryIconGlyphClassName}
        aria-hidden
      />
    </span>
  )
}

export function CurrentBudgetSummary({
  available,
  inReserve,
  spentThisMonth,
  carryForwardTotal = 0,
  previousPeriodLabel,
  reserveCategory,
}: CurrentBudgetSummaryProps) {
  const availableTone =
    available > 0
      ? 'text-teal'
      : available < 0
        ? 'text-destructive'
        : undefined

  const reserveLabel = reserveCategory?.name ?? CURRENT_BUDGET_RESERVE_LABEL
  const availableInfoText = buildCurrentBudgetAvailableInfo(
    carryForwardTotal,
    previousPeriodLabel,
  )
  const metricCompact = currentBudgetSummaryMetricCompact

  return (
    <div className={currentBudgetSummaryGridClassName}>
      <SummaryMetricCard
        responsiveCompact={metricCompact}
        label="Доступно"
        infoText={availableInfoText}
        value={available}
        valueClassName={availableTone}
      />

      <SummaryMetricCard
        responsiveCompact={metricCompact}
        label={
          <ResponsiveLabel
            mobile={CURRENT_BUDGET_RESERVE_MOBILE_LABEL}
            desktop={reserveLabel}
          />
        }
        labelStart={
          reserveCategory ? (
            <ReserveCategoryIcon reserveCategory={reserveCategory} />
          ) : undefined
        }
        infoText={CURRENT_BUDGET_RESERVE_INFO}
        infoBottomOnMax240
        value={inReserve}
        valueClassName={inReserve > 0 ? 'text-green' : undefined}
      />

      <SummaryMetricCard
        responsiveCompact={metricCompact}
        label={
          <ResponsiveLabel mobile="Потрачено" desktop="Потрачено в месяце" />
        }
        value={spentThisMonth}
        valueClassName="text-slate"
      />
    </div>
  )
}
