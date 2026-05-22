import { ChevronRight, Landmark, Lock } from 'lucide-react';

import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, Progress } from '@/shared/ui';

import { getEnvelopeBudgetTotal } from '@/entities/budget/lib/envelope';

import { getEnvelopeUsage } from '../lib/envelopeUsage';
import type { CategoryBudgetListItem } from '../model/types';

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
      className={cn(
        'h-full w-full min-w-0 gap-0 overflow-hidden bg-white py-0 ring-zinc-200/80',
        onSelect && 'cursor-pointer transition-colors hover:bg-zinc-50/60',
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Landmark className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 self-start">
            <h3 className="truncate text-base font-semibold leading-snug text-zinc-900">
              {category.name}
            </h3>
            <CategoryBudgetCarryCaption amount={carriedFromPrevious} />
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm text-zinc-500">Отложено</p>
            <p className="text-2xl font-bold leading-tight tracking-tight text-emerald-700 tabular-nums sm:text-3xl">
              {formatAmount(setAside)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900">
          <Lock className="size-4 shrink-0 text-emerald-700" aria-hidden />
          <p className="min-w-0 flex-1 leading-snug">
            Резервные средства. Используйте только для целей накопления.
          </p>
          <ChevronRight
            className="size-4 shrink-0 text-emerald-600/80"
            aria-hidden
          />
        </div>

        <Progress
          value={usage.barPercent}
          className="h-2.5 bg-emerald-100"
          indicatorClassName="bg-emerald-600"
          aria-label={`Цель накоплений: ${usage.displayPercent}%`}
        />
      </CardContent>
    </Card>
  );
}
