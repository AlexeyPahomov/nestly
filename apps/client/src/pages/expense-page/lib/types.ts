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

/** Сводка «казны» — три разных смысла, не смешивать в одну цифру. */
export type TreasurySummary = {
  /** Доходы минус распределения: ещё не разложено по конвертам. */
  availableToAllocate: number
  /** Сумма остатков по конвертам (allocated − spent по категориям). */
  categoryRemainingTotal: number
  /** Факт расходов по всем категориям. */
  totalSpent: number
}
