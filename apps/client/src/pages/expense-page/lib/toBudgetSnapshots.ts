import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget'

import type { CategoryBudgetItem } from './types'

export function toBudgetSnapshots(
  items: readonly CategoryBudgetItem[],
): CategoryBudgetSnapshot[] {
  return items.map((item) => ({
    categoryId: item.category.id,
    categoryName: item.category.name,
    categoryType: item.category.type,
    allocated: item.allocated,
    spent: item.spent,
    remaining: item.remaining,
  }))
}
