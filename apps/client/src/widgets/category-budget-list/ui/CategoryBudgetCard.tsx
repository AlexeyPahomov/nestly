import { Landmark } from 'lucide-react';

import { isSavingsCategory } from '@/entities/category/lib/categoryKind';
import type { CategoryBudgetListItem } from '@/widgets/category-budget-list/model/types';
import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

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
  const isOverBudget = !isSavings && (remaining < 0 || stressOverBudget);
  const isReserveLow = isSavings && remaining < 0;

  const balanceLabel = isSavings
    ? 'В резерве'
    : isOverBudget
      ? 'Перерасход'
      : 'Свободно';
  const balanceValue =
    isOverBudget || isReserveLow
      ? formatAmount(Math.abs(remaining))
      : formatAmount(remaining);

  return (
    <Card
      size="sm"
      className={cn(
        'transition-colors',
        isSavings &&
          'border-emerald-200/80 bg-emerald-50/50 ring-1 ring-emerald-100/80',
        selected && 'ring-2 ring-zinc-900',
        isOverBudget && 'border-red-200 bg-red-50/40',
        onSelect && 'cursor-pointer hover:bg-zinc-50',
        isSavings && onSelect && 'hover:bg-emerald-50/80',
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardHeader className="flex items-center gap-2">
        {isSavings ? (
          <Landmark
            className="size-3.5 shrink-0 text-emerald-700"
            aria-hidden
          />
        ) : null}
        <CardTitle
          className={cn(
            'min-w-0 truncate leading-snug',
            isSavings && 'text-emerald-950',
          )}
        >
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
              isOverBudget || isReserveLow
                ? 'text-red-600'
                : isSavings
                  ? 'text-emerald-800'
                  : 'text-zinc-900',
            )}
          >
            {balanceValue}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
