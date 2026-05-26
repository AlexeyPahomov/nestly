import { InfoIcon } from 'lucide-react'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'
import type { ReserveCategorySummary } from '@/entities/budget/model/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui'

import { BudgetSummaryCarryForward } from './BudgetSummaryCarryForward'
import { SummaryMetricCard } from '@/shared/ui/summary-metric-card'

const RESERVE_TOOLTIP =
  'Резервные средства. Используйте только для целей накопления.'

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

  return (
    <TooltipProvider delayDuration={300}>
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
            value={available}
            valueClassName={availableTone}
            trailing={
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                    aria-label="Что значит «Доступно»"
                  >
                    <InfoIcon className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-sm">
                  Доходы за месяц за вычетом уже распределённых по категориям
                  сумм. При перерасходе конверта свободный остаток уменьшается.
                </TooltipContent>
              </Tooltip>
            }
          />

          <SummaryMetricCard
            label={reserveCategory?.name ?? 'В резерве'}
            headerEnd={
              reserveCategory ? (
                <ReserveCategoryIcon reserveCategory={reserveCategory} />
              ) : undefined
            }
            value={inReserve}
            valueClassName={inReserve > 0 ? 'text-green' : undefined}
            trailing={
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                    aria-label={RESERVE_TOOLTIP}
                  >
                    <InfoIcon className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-sm">
                  {RESERVE_TOOLTIP}
                </TooltipContent>
              </Tooltip>
            }
          />

          <SummaryMetricCard
            label="Потрачено в месяце"
            value={spentThisMonth}
            valueClassName="text-slate"
          />
        </div>
      </div>
    </TooltipProvider>
  )
}
