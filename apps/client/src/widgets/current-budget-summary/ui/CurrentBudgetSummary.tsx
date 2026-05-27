import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import type { ReserveCategorySummary } from '@/entities/budget/model/types'
import { SummaryMetricCard } from '@/shared/ui/summary-metric-card'

import {
  CURRENT_BUDGET_AVAILABLE_INFO,
  CURRENT_BUDGET_RESERVE_INFO,
  CURRENT_BUDGET_RESERVE_LABEL,
} from '../lib/currentBudgetSummaryCopy'

import { BudgetSummaryCarryForward } from './BudgetSummaryCarryForward'

/** Reporting: что произошло / текущее состояние пула (факт). */
export type CurrentBudgetSummaryProps = CurrentBudgetSummaryView

function ReserveCategoryIcon({
  reserveCategory,
}: {
  reserveCategory: ReserveCategorySummary
}) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-subtle text-green">
      <CategoryLucideIcon
        {...toCategoryLucideIconProps(reserveCategory)}
        className="size-4"
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
      ? 'text-green'
      : available < 0
        ? 'text-destructive'
        : undefined

  const reserveLabel = reserveCategory?.name ?? CURRENT_BUDGET_RESERVE_LABEL

  return (
    <div className="space-y-3">
      {carryForwardTotal !== 0 && previousPeriodLabel ? (
        <div className="flex justify-end">
          <BudgetSummaryCarryForward
            total={carryForwardTotal}
            previousPeriodLabel={previousPeriodLabel}
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryMetricCard
          label="Доступно"
          infoText={CURRENT_BUDGET_AVAILABLE_INFO}
          value={available}
          valueClassName={availableTone}
        />

        <SummaryMetricCard
          label={reserveLabel}
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
          label="Потрачено в месяце"
          value={spentThisMonth}
          valueClassName="text-slate"
        />
      </div>
    </div>
  )
}
