import type { Expense } from '@/entities/expense/model/types'

/** Строка списка: entity + имя категории с orchestration layer. */
export type ExpenseListItem = Expense & {
  categoryName: string
}
