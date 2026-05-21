import { ChevronDownIcon } from 'lucide-react';
import { type KeyboardEvent, useId, useState } from 'react';

import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/ui';

type BudgetSummaryProps = {
  availableToAllocate: number;
  categoryRemainingTotal: number;
  totalSpent: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const metricRowClassName = 'flex items-baseline justify-between gap-4';

function MetricValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'shrink-0 font-semibold tabular-nums text-zinc-900',
        className,
      )}
    >
      {formatAmount(value)}
    </span>
  );
}

export function BudgetSummary({
  availableToAllocate,
  categoryRemainingTotal,
  totalSpent,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: BudgetSummaryProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const detailsId = useId();
  const hasUnallocated = availableToAllocate > 0;
  const envelopeOver = categoryRemainingTotal < 0;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  };

  const toggle = () => setOpen(!open);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={detailsId}
      aria-label={open ? 'Свернуть сводку казны' : 'Развернуть сводку казны'}
      className={cn(
        'relative cursor-pointer gap-0 transition-colors hover:bg-zinc-50/50',
        'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        open ? 'py-2' : 'py-2',
      )}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <ChevronDownIcon
        className={cn(
          'pointer-events-none absolute right-3 top-3.5 z-10 size-4 text-muted-foreground transition-transform duration-300',
          open && 'rotate-180',
        )}
        aria-hidden
      />

      <div className={cn('space-y-2 px-4 pr-10 text-sm', !open && 'space-y-0')}>
        <div className={metricRowClassName}>
          <span className="font-medium text-zinc-900">Свободно</span>
          <MetricValue
            value={availableToAllocate}
            className={cn(
              'text-lg font-bold',
              hasUnallocated ? 'text-emerald-700' : undefined,
            )}
          />
        </div>

        <div
          id={detailsId}
          className={cn(
            'nestly-collapse grid space-y-2',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
          aria-hidden={!open}
        >
          <div className="min-h-0 space-y-2 overflow-hidden border-t border-zinc-100 ">
            <div className={metricRowClassName}>
              <span className="text-muted-foreground">
                Остаток по категориям
              </span>
              <MetricValue
                value={categoryRemainingTotal}
                className={cn(
                  envelopeOver && 'text-red-600',
                  !envelopeOver &&
                    categoryRemainingTotal > 0 &&
                    'text-emerald-700',
                )}
              />
            </div>
            <div className={metricRowClassName}>
              <span className="text-muted-foreground">Потрачено</span>
              <MetricValue value={totalSpent} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
