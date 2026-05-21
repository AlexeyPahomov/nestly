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

/** Сводка «казны»: доходы vs распределения (не путать с остатком в конвертах). */
export type TreasurySummary = {
  totalFunds: number
  allocatedTotal: number
  availableToAllocate: number
}
