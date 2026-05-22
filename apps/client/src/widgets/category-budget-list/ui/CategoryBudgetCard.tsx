import { isSavingsCategory } from '@/entities/category/lib/categoryKind';
import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, Progress } from '@/shared/ui';

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps';

import { categoryIconWrapClassName } from '../lib/categoryVisual';
import {
  envelopeBalanceToneClassName,
  envelopeCardToneClassName,
  envelopeHoverToneClassName,
  envelopeProgressIndicatorClassName,
  formatEnvelopeBalance,
  getEnvelopeBalanceLabel,
  getEnvelopeBalanceTone,
} from '../lib/envelopeBalanceTone';
import { getEnvelopeBudgetTotal } from '@/entities/budget/lib/envelope';

import { getEnvelopeUsage } from '../lib/envelopeUsage';
import type { CategoryBudgetListItem } from '../model/types';

import { CategoryBudgetCarryCaption } from './CategoryBudgetCarryCaption';
import { MonthlyBurnInsightBlock } from './MonthlyBurnInsight';
import { SavingsCategoryBudgetCard } from './SavingsCategoryBudgetCard';

type CategoryBudgetCardProps = {
  item: CategoryBudgetListItem;
  stressOverBudget?: boolean;
  onSelect?: (categoryId: string) => void;
};

export function CategoryBudgetCard({
  item,
  stressOverBudget = false,
  onSelect,
}: CategoryBudgetCardProps) {
  const { category, carriedFromPrevious, spent, remaining } = item;
  const isSavings = isSavingsCategory(category.type);

  if (isSavings) {
    return <SavingsCategoryBudgetCard item={item} onSelect={onSelect} />;
  }

  const envelopeTotal = getEnvelopeBudgetTotal(item);
  const tone = getEnvelopeBalanceTone(
    envelopeTotal,
    remaining,
    stressOverBudget,
  );
  const usage = getEnvelopeUsage(envelopeTotal, spent);
  const balanceLabel = getEnvelopeBalanceLabel(isSavings);
  const usageCaption = 'использовано бюджета';

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
      <CardContent className="flex flex-1 flex-col gap-3 px-4 py-1 text-sm">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full',
              categoryIconWrapClassName(tone),
            )}
          >
            <CategoryLucideIcon
              {...toCategoryLucideIconProps(category)}
              className="size-5"
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1 self-start">
            <h3 className="truncate text-base font-semibold leading-snug text-zinc-900">
              {category.name}
            </h3>
            <CategoryBudgetCarryCaption amount={carriedFromPrevious} />
          </div>
          <div className="shrink-0 text-right tabular-nums">
            <p className="font-medium text-zinc-900">
              {formatAmount(spent)}
              <span className="mx-1 font-normal text-zinc-400">/</span>
              {formatAmount(envelopeTotal)}
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

        <MonthlyBurnInsightBlock allocated={envelopeTotal} spent={spent} />

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
  );
}
