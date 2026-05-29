import type { IncomeCardView } from '@/pages/allocation-page/lib/allocationIncomeCard'
import {
  allocationIncomeMonthCardContentClassName,
  allocationIncomeMonthCardMobileClassName,
} from '@/pages/allocation-page/lib/allocationPageLayout'
import {
  getToneAccentClassName,
  getToneGradientClassName,
} from '@/pages/allocation-page/lib/incomeCardTone'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent } from '@/shared/ui'

type IncomeMonthCardProps = {
  cardId: string
  incomeCard: IncomeCardView
  isActive: boolean
  onSelect: (periodMonth: string | null) => void
}

export function IncomeMonthCard({
  cardId,
  incomeCard,
  isActive,
  onSelect,
}: IncomeMonthCardProps) {
  const cardToneClassName = getToneGradientClassName(incomeCard.tone)
  const activeIndicatorClassName = getToneAccentClassName(incomeCard.tone)

  return (
    <button
      type="button"
      data-income-card-id={cardId}
      className={cn(
        'w-full min-w-20 rounded-xl border border-transparent text-left transition-all duration-200 md:w-24 md:border-2',
        allocationIncomeMonthCardMobileClassName,
        isActive
          ? 'border-main-black/20 md:scale-[1.02] md:border-main-black/20'
          : 'hover:-translate-y-0.5',
      )}
      onClick={() => onSelect(incomeCard.id)}
    >
      <Card
        size="sm"
        className={cn(
          'relative h-full gap-0.5! overflow-hidden py-0.5! bg-linear-to-br transition-all duration-200 active:scale-[0.99] md:gap-1! md:py-1!',
          cardToneClassName,
          isActive && 'md:shadow-sm',
        )}
      >
        <span
          className={cn(
            'absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-200',
            activeIndicatorClassName,
            isActive && 'opacity-100',
          )}
          aria-hidden
        />
        <CardContent
          className={cn(
            'space-y-0.5 px-1 py-1 md:space-y-1 md:px-1 md:py-2',
            allocationIncomeMonthCardContentClassName,
          )}
        >
          <p className="truncate text-[7px] font-medium uppercase tracking-wide text-slate-hover md:text-[8px]">
            {incomeCard.periodLabel}
          </p>
          <p className="truncate text-[10px] font-extrabold tabular-nums text-main-black md:text-[11px]">
            {formatAmount(incomeCard.amount)}
          </p>
        </CardContent>
      </Card>
    </button>
  )
}
