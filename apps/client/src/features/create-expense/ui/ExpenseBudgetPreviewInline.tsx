import { cn } from '@/shared/lib/utils';

import {
  formatPreviewRemaining,
  previewRemainingClassName,
} from '../lib/previewRemainingTone';
import type { ExpenseBudgetPreview } from '../model/budget';

type ExpenseBudgetPreviewInlineProps = {
  preview: ExpenseBudgetPreview;
};

export function ExpenseBudgetPreviewInline({
  preview,
}: ExpenseBudgetPreviewInlineProps) {
  const isOver = preview.isOverBudget;

  return (
    <div
      role="status"
      className={cn(
        'rounded-lg border px-3 py-2.5 text-sm transition-colors',
        isOver
          ? 'border-amber-200/90 bg-amber-50/70'
          : 'border-zinc-200/90 bg-zinc-50/80',
      )}
    >
      <p className="text-muted-foreground">После операции:</p>
      <p className="mt-0.5 font-medium text-zinc-900">
        Остаток категории:{' '}
        <span
          className={cn(
            'tabular-nums font-bold',
            previewRemainingClassName(preview),
          )}
        >
          {formatPreviewRemaining(preview)}
        </span>
      </p>
    </div>
  );
}
