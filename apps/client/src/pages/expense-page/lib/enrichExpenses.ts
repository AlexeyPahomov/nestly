import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { ExpenseListItem } from '@/widgets/expense-list/model/types'

export function enrichExpensesWithCategory(
  expenses: readonly Expense[],
  categories: readonly Category[],
): ExpenseListItem[] {
  const categoryById = new Map(categories.map((c) => [c.id, c]))

  return expenses.map((expense) => {
    const category = categoryById.get(expense.category_id)
    return {
      ...expense,
      categoryName: category?.name ?? 'Без категории',
      categoryType: category?.type ?? 'expense',
      categoryIcon: category?.icon ?? null,
    }
  })
}

export function sortExpensesNewestFirst(
  expenses: readonly ExpenseListItem[],
): ExpenseListItem[] {
  return [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}
