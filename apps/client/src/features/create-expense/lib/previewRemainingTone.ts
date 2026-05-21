import { formatAmount } from '@/shared/lib/format'

import type { ExpenseBudgetPreview } from '../model/budget'

const LOW_REMAINING_RATIO = 0.2

export function formatPreviewRemaining(preview: ExpenseBudgetPreview): string {
  return formatAmount(preview.remainingAfter)
}

export function previewRemainingClassName(
  preview: ExpenseBudgetPreview,
): string {
  if (preview.isOverBudget) {
    return 'text-red-600'
  }

  if (
    preview.allocated > 0 &&
    preview.remainingAfter / preview.allocated < LOW_REMAINING_RATIO
  ) {
    return 'text-amber-700'
  }

  return 'text-emerald-700'
}
