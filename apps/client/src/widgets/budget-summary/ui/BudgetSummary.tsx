import { InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'

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

type BudgetSummaryProps = {
  available: number
  inReserve: number
  spentThisMonth: number
  carryForwardTotal?: number
  previousPeriodLabel?: string
}

type SummaryMetricCardProps = {
  label: string
  value: number
  valueClassName?: string
  trailing?: ReactNode
}

function SummaryMetricCard({
  label,
  value,
  valueClassName,
  trailing,
}: SummaryMetricCardProps) {
  return (
    <Card className="gap-0 bg-white py-4 ring-zinc-200/80">
      <div className="space-y-1 px-4">
        <p className="text-sm text-zinc-500">{label}</p>
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

export function BudgetSummary({
  available,
  inReserve,
  spentThisMonth,
  carryForwardTotal = 0,
  previousPeriodLabel,
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
            label="В резерве"
            value={inReserve}
            valueClassName={inReserve > 0 ? 'text-emerald-700' : undefined}
            trailing={
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                    aria-label="Что значит «В резерве»"
                  >
                    <InfoIcon className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-sm">
                  Остаток по категориям накоплений за этот месяц (не для
                  повседневных трат).
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
