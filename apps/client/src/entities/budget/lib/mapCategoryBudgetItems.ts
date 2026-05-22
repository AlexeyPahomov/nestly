import type { Category } from '@/entities/category/model/types'
import type { CategoryBudgetItem } from '@/entities/budget/model/types'

export type CategoryBudgetRow = {
  categoryId: string
  openingBalance: number
  allocated: number
  spent: number
  closingBalance: number
}

export function mapCategoryBudgetRows(
  categories: readonly Category[],
  rows: readonly CategoryBudgetRow[],
): CategoryBudgetItem[] {
  const categoryById = new Map(categories.map((c) => [c.id, c]))

  return rows
    .map((row) => {
      const category = categoryById.get(row.categoryId)
      if (!category) {
        return null
      }

      return {
        category,
        carriedFromPrevious: row.openingBalance,
        allocated: row.allocated,
        spent: row.spent,
        remaining: row.closingBalance,
      }
    })
    .filter((item): item is CategoryBudgetItem => item != null)
}
