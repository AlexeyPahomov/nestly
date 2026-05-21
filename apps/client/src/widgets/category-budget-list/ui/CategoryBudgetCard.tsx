import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, Progress } from '@/shared/ui'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'

import { categoryIconWrapClassName } from '../lib/categoryVisual'
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

import { MonthlyBurnInsightBlock } from './MonthlyBurnInsight'
import { SavingsCategoryBudgetCard } from './SavingsCategoryBudgetCard'

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

  if (isSavings) {
    return <SavingsCategoryBudgetCard item={item} onSelect={onSelect} />
  }

  const tone = getEnvelopeBalanceTone(
    allocated,
    remaining,
    stressOverBudget,
  )
  const usage = getEnvelopeUsage(allocated, spent)
  const balanceLabel = getEnvelopeBalanceLabel(isSavings)
  const usageCaption = 'использовано бюджета'

  return (
    <Card
      size="sm"
      className={cn(
        'h-full w-full min-w-0 gap-0 overflow-hidden py-0 transition-colors',
        envelopeCardToneClassName(tone),
        onSelect && 'cursor-pointer',
        onSelect && envelopeHoverToneClassName(tone),
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardContent className="flex flex-1 flex-col gap-3 p-4 text-sm">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full',
              categoryIconWrapClassName(tone),
            )}
          >
            <CategoryLucideIcon
              categoryName={category.name}
              categoryType={category.type}
              className="size-5"
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-zinc-900">
              {category.name}
            </h3>
          </div>
          <div className="shrink-0 text-right tabular-nums">
            <p className="font-medium text-zinc-900">
              {formatAmount(spent)}
              <span className="mx-1 font-normal text-zinc-400">/</span>
              {formatAmount(allocated)}
            </p>
            <p
              className={cn(
                'text-xs font-semibold',
                envelopeBalanceToneClassName(tone),
              )}
            >
              {usage.displayPercent}%
            </p>
          </div>
        </div>

        <Progress
          value={usage.barPercent}
          className="h-2.5 bg-zinc-100"
          indicatorClassName={envelopeProgressIndicatorClassName(tone)}
          aria-label={`${usageCaption}: ${usage.displayPercent}%`}
        />

        <MonthlyBurnInsightBlock allocated={allocated} spent={spent} />

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-zinc-100 pt-2">
          <span className="text-zinc-500">{balanceLabel}</span>
          <span
            className={cn(
              'text-base font-bold tabular-nums',
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
