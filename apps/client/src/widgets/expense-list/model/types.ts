import type { Expense } from '@/entities/expense/model/types'
import type { CategoryType } from '@nestly/shared'

/** Строка списка: entity + метаданные категории с orchestration layer. */
export type ExpenseListItem = Expense & {
  categoryName: string
  categoryType: CategoryType
  categoryIcon: string | null
}
