import { Landmark } from 'lucide-react';

import { isSavingsCategory } from '@/entities/category/lib/categoryKind';
import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

import {
  envelopeBalanceToneClassName,
  envelopeCardToneClassName,
  envelopeHoverToneClassName,
  formatEnvelopeBalance,
  getEnvelopeBalanceTone,
} from '../lib/envelopeBalanceTone';
import type { CategoryBudgetListItem } from '../model/types';

type CategoryBudgetCardProps = {
  item: CategoryBudgetListItem;
  selected?: boolean;
  stressOverBudget?: boolean;
  onSelect?: (categoryId: string) => void;
};

export function CategoryBudgetCard({
  item,
  selected,
  stressOverBudget = false,
  onSelect,
}: CategoryBudgetCardProps) {
  const { category, allocated, spent, remaining } = item;
  const isSavings = isSavingsCategory(category.type);
  const tone = getEnvelopeBalanceTone(
    allocated,
    remaining,
    !isSavings && stressOverBudget,
  );

  const balanceLabel =
    tone === 'over' ? 'Перерасход' : isSavings ? 'В резерве' : 'Свободно';

  return (
    <Card
      size="sm"
      className={cn(
        'transition-colors',
        envelopeCardToneClassName(tone),
        selected && 'ring-2 ring-zinc-900',
        onSelect && 'cursor-pointer',
        onSelect && envelopeHoverToneClassName(tone),
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardHeader className="flex items-center gap-2">
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
      <CardContent className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">
            {isSavings ? 'Зарезервировано' : 'Распределено'}
          </span>
          <span className="tabular-nums font-medium text-zinc-900">
            {formatAmount(allocated)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">
            {isSavings ? 'Изъято из резерва' : 'Потрачено'}
          </span>
          <span className="tabular-nums font-medium text-zinc-900">
            {formatAmount(spent)}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-1">
          <span className="font-medium text-zinc-900">{balanceLabel}</span>
          <span
            className={cn(
              'tabular-nums font-bold',
              envelopeBalanceToneClassName(tone),
            )}
          >
            {formatEnvelopeBalance(remaining, tone)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
