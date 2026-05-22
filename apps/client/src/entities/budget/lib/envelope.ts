import { computeClosing } from '@nestly/shared'

import type { CategoryBudgetItem } from '../model/types'

/** Бюджет конверта с учётом opening balance (лимит до трат). */
export function getEnvelopeBudgetTotal(item: CategoryBudgetItem): number {
  return computeClosing(item.carriedFromPrevious, item.allocated, 0)
}
