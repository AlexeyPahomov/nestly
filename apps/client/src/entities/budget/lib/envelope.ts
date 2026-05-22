import type { CategoryBudgetItem } from '../model/types'

/** Бюджет конверта с учётом opening balance. */
export function getEnvelopeBudgetTotal(item: CategoryBudgetItem): number {
  return item.carriedFromPrevious + item.allocated
}
