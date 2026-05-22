import { InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { ReserveCategorySummary } from '@/entities/budget/model/types'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

import { BudgetSummaryCarryForward } from './BudgetSummaryCarryForward'
import {
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui'

const RESERVE_TOOLTIP =
  'Резервные средства. Используйте только для целей накопления.'

type BudgetSummaryProps = {
  available: number
  inReserve: number
  spentThisMonth: number
  carryForwardTotal?: number
  previousPeriodLabel?: string
  reserveCategory?: ReserveCategorySummary
}

type SummaryMetricCardProps = {
  label: ReactNode
  value: number
  valueClassName?: string
  trailing?: ReactNode
  headerEnd?: ReactNode
}

function SummaryMetricCard({
  label,
  value,
  valueClassName,
  trailing,
  headerEnd,
}: SummaryMetricCardProps) {
  return (
    <Card className="relative gap-0 bg-white py-4 ring-zinc-200/80">
      {headerEnd ? (
        <div className="absolute right-4 top-4">{headerEnd}</div>
      ) : null}
      <div className="space-y-1 px-4">
        <p className={cn('text-sm text-zinc-500', headerEnd && 'pr-11')}>
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          <p
            className={cn(
              'text-2xl font-bold tracking-tight tabular-nums text-zinc-900',
              valueClassName,
            )}
          >
            {formatAmount(value)}
          </p>
          {trailing}
        </div>
      </div>
    </Card>
  )
}

function ReserveCategoryIcon({
  reserveCategory,
}: {
  reserveCategory: ReserveCategorySummary
}) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
      <CategoryLucideIcon
        {...toCategoryLucideIconProps(reserveCategory)}
        className="size-4"
        aria-hidden
      />
    </span>
  )
}

export function BudgetSummary({
  available,
  inReserve,
  spentThisMonth,
  carryForwardTotal = 0,
  previousPeriodLabel,
  reserveCategory,
}: BudgetSummaryProps) {
  const availableTone =
    available > 0
      ? 'text-emerald-700'
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
            valueClassName={inReserve > 0 ? 'text-emerald-700' : undefined}
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

          <SummaryMetricCard label="Потрачено в месяце" value={spentThisMonth} />
        </div>
      </div>
    </TooltipProvider>
  )
}
