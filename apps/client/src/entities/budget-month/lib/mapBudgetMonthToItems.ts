import type { Category } from '@/entities/category/model/types'
import type { CategoryBudgetItem } from '@/entities/budget/model/types'
import { mapCategoryBudgetRows } from '@/entities/budget/lib/mapCategoryBudgetItems'

import type { BudgetMonthView } from '../model/types'

export function mapBudgetMonthToCategoryItems(
  view: BudgetMonthView,
  categories: readonly Category[],
): CategoryBudgetItem[] {
  return mapCategoryBudgetRows(
    categories,
    view.snapshots.map((snap) => ({
      categoryId: snap.categoryId,
      openingBalance: snap.openingBalance,
      allocated: snap.allocated,
      spent: snap.spent,
      closingBalance: snap.closingBalance,
    })),
  )
}
