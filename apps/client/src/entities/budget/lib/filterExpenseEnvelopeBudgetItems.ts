import { isSavingsCategory } from '@/entities/category/lib/categoryKind'

import type { CategoryBudgetItem } from '../model/types'

/** Конверты расходных категорий (без накоплений — они в сводке «В резерве»). */
export function filterExpenseEnvelopeBudgetItems(
  items: readonly CategoryBudgetItem[],
): CategoryBudgetItem[] {
  return items.filter((item) => !isSavingsCategory(item.category.type))
}
