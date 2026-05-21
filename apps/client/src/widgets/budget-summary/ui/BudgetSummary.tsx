import { InfoIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import {
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';

type BudgetSummaryProps = {
  totalFunds: number;
  availableToAllocate: number;
  totalSpent: number;
};

type SummaryMetricCardProps = {
  label: string;
  value: number;
  valueClassName?: string;
  trailing?: ReactNode;
};

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
  );
}

export function BudgetSummary({
  totalFunds,
  availableToAllocate,
  totalSpent,
}: BudgetSummaryProps) {
  const hasUnallocated = availableToAllocate > 0;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryMetricCard label="Всего средств" value={totalFunds} />

        <SummaryMetricCard
          label="Свободно к распределению"
          value={availableToAllocate}
          valueClassName={hasUnallocated ? 'text-emerald-700' : undefined}
          trailing={
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                  aria-label="Что такое свободные средства"
                >
                  <InfoIcon className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-sm">
                Доходы за вычетом сумм, уже распределённых по категориям.
              </TooltipContent>
            </Tooltip>
          }
        />

        <SummaryMetricCard label="Потрачено" value={totalSpent} />
      </div>
    </TooltipProvider>
  );
}
