import {
  remainingBalanceCardBodyClassName,
  remainingBalanceCardCaptionInlineClassName,
  remainingBalanceCardCaptionStackedClassName,
  remainingBalanceCardMetaRowClassName,
} from '@/pages/allocation-page/lib/allocationPageLayout'
import type { IncomeCardTone } from '@/pages/allocation-page/model/useAllocationPage'
import {
  getToneSurfaceClassName,
  getToneTextClassName,
} from '@/pages/allocation-page/lib/incomeCardTone'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardTitle } from '@/shared/ui'

type RemainingBalanceCardProps = {
  tone: IncomeCardTone
  remainingBalance: number
  incomeAmount: number | null
  progressValue: number
}

export function RemainingBalanceCard({
  tone,
  remainingBalance,
  incomeAmount,
  progressValue,
}: RemainingBalanceCardProps) {
  const toneTextClassName = getToneTextClassName(tone)
  const toneSurfaceClassName = getToneSurfaceClassName(tone)

  return (
    <Card
      className={cn(
        'relative isolate min-w-0 overflow-hidden text-main-black shadow-[0_10px_28px_-16px_rgba(20,24,36,0.32)] ring-1 ring-white/40 supports-backdrop-filter:backdrop-blur-[2px] md:flex-[1.25]',
        toneSurfaceClassName,
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-10 bg-linear-to-b from-white/50 to-transparent"
        aria-hidden
      />
      <CardContent className="relative z-10 space-y-4">
        <div className={remainingBalanceCardBodyClassName}>
          <div className="min-w-0 space-y-1.5">
            <p className="text-sm font-medium text-slate-hover">Осталось</p>
            <CardTitle
              className={cn(
                'flex items-baseline gap-1 text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl',
                toneTextClassName,
              )}
            >
              {incomeAmount !== null ? (
                <>
                  {formatAmount(remainingBalance)}
                  <span
                    className="text-lg font-semibold text-current/45 sm:text-xl"
                    aria-hidden
                  >
                    ₽
                  </span>
                </>
              ) : (
                '—'
              )}
            </CardTitle>
          </div>
          <div className={remainingBalanceCardMetaRowClassName}>
            <div
              className={cn(
                'relative flex size-16 shrink-0 items-center justify-center rounded-full bg-white/75 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]',
                toneTextClassName,
              )}
              style={{
                background: `conic-gradient(currentColor ${progressValue}%, rgba(255,255,255,0.7) 0)`,
              }}
              aria-label={`Распределено ${progressValue}%`}
            >
              <span className="absolute inset-1.5 rounded-full bg-white/95" />
              <span className="relative text-sm font-bold text-main-black">
                {progressValue}%
              </span>
            </div>
            <div className={remainingBalanceCardCaptionInlineClassName}>
              <p className="text-xs font-medium text-slate">Распределено</p>
              <p className="text-sm font-semibold text-slate-hover">от дохода</p>
            </div>
          </div>
          <div className={remainingBalanceCardCaptionStackedClassName}>
            <span className="font-medium text-slate">Распределено</span>
            <span className="font-semibold text-slate-hover">от дохода</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
