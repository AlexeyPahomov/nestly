import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { ExpenseListItem } from '@/widgets/expense-list/model/types'

export function enrichExpensesWithCategory(
  expenses: readonly Expense[],
  categories: readonly Category[],
): ExpenseListItem[] {
  const nameById = new Map(categories.map((c) => [c.id, c.name]))

  return expenses.map((expense) => ({
    ...expense,
    categoryName: nameById.get(expense.category_id) ?? 'Без категории',
  }))
}

export function sortExpensesNewestFirst(
  expenses: readonly ExpenseListItem[],
): ExpenseListItem[] {
  return [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}
