import type { Category } from '@/entities/category/model/types'

export type CategoryBudgetItem = {
  category: Category
  allocated: number
  spent: number
  remaining: number
}

export type BudgetTotals = {
  allocated: number
  spent: number
  remaining: number
}
