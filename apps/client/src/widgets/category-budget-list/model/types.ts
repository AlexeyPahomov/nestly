import type { Category } from '@/entities/category/model/types'

export type CategoryBudgetListItem = {
  category: Category
  allocated: number
  spent: number
  remaining: number
}
