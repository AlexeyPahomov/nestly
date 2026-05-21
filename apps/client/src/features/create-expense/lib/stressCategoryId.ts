import type { ExpenseBudgetPreview } from '../model/budget'

export function budgetPreviewStressKey(
  preview: ExpenseBudgetPreview | null,
): string {
  return preview?.isOverBudget ? `${preview.categoryId}:over` : 'none'
}
