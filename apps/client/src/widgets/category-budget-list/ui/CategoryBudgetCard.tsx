import { Landmark } from 'lucide-react'

import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/shared/ui'

import {
  envelopeBalanceToneClassName,
  envelopeCardToneClassName,
  envelopeHoverToneClassName,
  envelopeProgressIndicatorClassName,
  formatEnvelopeBalance,
  getEnvelopeBalanceLabel,
  getEnvelopeBalanceTone,
} from '../lib/envelopeBalanceTone'
import { getEnvelopeUsage } from '../lib/envelopeUsage'
import type { CategoryBudgetListItem } from '../model/types'

type CategoryBudgetCardProps = {
  item: CategoryBudgetListItem
  stressOverBudget?: boolean
  onSelect?: (categoryId: string) => void
}

export function CategoryBudgetCard({
  item,
  stressOverBudget = false,
  onSelect,
}: CategoryBudgetCardProps) {
  const { category, allocated, spent, remaining } = item
  const isSavings = isSavingsCategory(category.type)
  const tone = getEnvelopeBalanceTone(
    allocated,
    remaining,
    !isSavings && stressOverBudget,
  )
  const usage = getEnvelopeUsage(allocated, spent)

  const balanceLabel = getEnvelopeBalanceLabel(isSavings)

  const usageCaption = isSavings ? 'использовано резерва' : 'использовано'

  return (
    <Card
      size="sm"
      className={cn(
        'transition-colors',
        envelopeCardToneClassName(tone),
        onSelect && 'cursor-pointer',
        onSelect && envelopeHoverToneClassName(tone),
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardHeader className="flex items-center gap-2 pb-2">
        {isSavings ? (
          <Landmark
            className={cn(
              'size-3.5 shrink-0',
              tone === 'over'
                ? 'text-red-600'
                : tone === 'low'
                  ? 'text-amber-700'
                  : 'text-emerald-700',
            )}
            aria-hidden
          />
        ) : null}
        <CardTitle className="min-w-0 truncate leading-snug">
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 text-sm">
        <div className="flex items-baseline justify-between gap-2 tabular-nums">
          <span className="font-medium text-zinc-900">
            {formatAmount(spent)}
            <span className="mx-1 font-normal text-muted-foreground">/</span>
            {formatAmount(allocated)}
          </span>
          <span
            className={cn(
              'text-xs font-semibold',
              envelopeBalanceToneClassName(tone),
            )}
          >
            {usage.displayPercent}%
          </span>
        </div>

        <Progress
          value={usage.barPercent}
          className="h-1.5 bg-zinc-200/80"
          indicatorClassName={envelopeProgressIndicatorClassName(tone)}
          aria-label={`${usageCaption}: ${usage.displayPercent}%`}
        />

        <div className="flex justify-between gap-4 border-t border-zinc-100/90 pt-1.5">
          <span className="text-muted-foreground">{balanceLabel}</span>
          <span
            className={cn(
              'tabular-nums font-bold',
              envelopeBalanceToneClassName(tone),
            )}
          >
            {formatEnvelopeBalance(remaining)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
