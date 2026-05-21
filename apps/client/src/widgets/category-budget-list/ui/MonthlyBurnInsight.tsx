import { cn } from '@/shared/lib/utils';

import {
  getMonthlyBurnInsight,
  monthlyBurnInsightSlotClassName,
  monthlyBurnPaceClassName,
} from '../lib/monthlyBurnInsight';

type MonthlyBurnInsightProps = {
  allocated: number;
  spent: number;
  className?: string;
};

export function MonthlyBurnInsightBlock({
  allocated,
  spent,
  className,
}: MonthlyBurnInsightProps) {
  const insight = getMonthlyBurnInsight(allocated, spent);

  return (
    <div className={cn(monthlyBurnInsightSlotClassName, className)}>
      {/* 
      // TODO нужно ли? на каждой карточке отображается
      <p className="text-muted-foreground">
        До конца месяца:{' '}
        <span className="font-medium tabular-nums text-zinc-800">
          {insight.daysRemainingLabel}
        </span>
      </p> */}
      <p
        className={cn(
          'min-h-4.5',
          monthlyBurnPaceClassName(insight.paceDirection),
        )}
      >
        {insight.paceMessage}
      </p>
    </div>
  );
}
