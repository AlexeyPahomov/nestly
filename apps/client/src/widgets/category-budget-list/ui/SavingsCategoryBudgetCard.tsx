import { ChevronRight, Landmark, Lock } from 'lucide-react';

import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, Progress } from '@/shared/ui';

import { getEnvelopeBudgetTotal } from '@/entities/budget/lib/envelope';

import { getEnvelopeUsage } from '../lib/envelopeUsage';
import type { CategoryBudgetListItem } from '../model/types';

import {
  savingsCategoryBudgetCardAmountClassName,
  savingsCategoryBudgetCardContentClassName,
  savingsCategoryBudgetCardHeaderRowClassName,
  savingsCategoryBudgetCardIconGlyphClassName,
  savingsCategoryBudgetCardIconWrapClassName,
  savingsCategoryBudgetCardNoticeClassName,
  savingsCategoryBudgetCardNoticeIconClassName,
  savingsCategoryBudgetCardTitleClassName,
} from '../lib/categoryBudgetCardLayout';
import { getCategoryBudgetCardDomProps } from '../lib/categoryBudgetCardTarget';

import { CategoryBudgetCarryCaption } from './CategoryBudgetCarryCaption';

type SavingsCategoryBudgetCardProps = {
  item: CategoryBudgetListItem;
  onSelect?: (categoryId: string) => void;
};

export function SavingsCategoryBudgetCard({
  item,
  onSelect,
}: SavingsCategoryBudgetCardProps) {
  const { category, carriedFromPrevious, spent, remaining } = item;
  const envelopeTotal = getEnvelopeBudgetTotal(item);
  const usage = getEnvelopeUsage(envelopeTotal, spent);
  const setAside = remaining > 0 ? remaining : spent;

  return (
    <Card
      size="sm"
      {...getCategoryBudgetCardDomProps()}
      className={cn(
        'h-full w-full min-w-0 gap-0 overflow-hidden bg-white py-0 ring-zinc-200/80',
        onSelect && 'cursor-pointer transition-colors hover:bg-zinc-50/60',
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardContent className={savingsCategoryBudgetCardContentClassName}>
        <div className={savingsCategoryBudgetCardHeaderRowClassName}>
          <span className={savingsCategoryBudgetCardIconWrapClassName}>
            <Landmark
              className={savingsCategoryBudgetCardIconGlyphClassName}
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1 self-start">
            <h3 className={savingsCategoryBudgetCardTitleClassName}>
              {category.name}
            </h3>
            <CategoryBudgetCarryCaption amount={carriedFromPrevious} />
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-zinc-500 md:text-sm">Отложено</p>
            <p className={savingsCategoryBudgetCardAmountClassName}>
              {formatAmount(setAside)}
            </p>
          </div>
        </div>

        <div className={savingsCategoryBudgetCardNoticeClassName}>
          <Lock className={savingsCategoryBudgetCardNoticeIconClassName} aria-hidden />
          <p className="min-w-0 flex-1 leading-snug">
            Резервные средства. Используйте только для целей накопления.
          </p>
          <ChevronRight
            className={cn(
              savingsCategoryBudgetCardNoticeIconClassName,
              'text-green/80',
            )}
            aria-hidden
          />
        </div>

        <Progress
          value={usage.barPercent}
          className="h-1.5 bg-green-muted md:h-2.5"
          indicatorClassName="bg-green"
          aria-label={`Цель накоплений: ${usage.displayPercent}%`}
        />
      </CardContent>
    </Card>
  );
}
