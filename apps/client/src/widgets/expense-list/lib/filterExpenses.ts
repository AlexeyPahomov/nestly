import type { ExpenseListItem } from '../model/types'

export function filterExpensesByCategoryAndMonth(
  expenses: readonly ExpenseListItem[],
  categoryFilter: string,
  monthFilter: string,
): ExpenseListItem[] {
  const monthPrefix = monthFilter.trim().slice(0, 7)

  return expenses.filter((expense) => {
    if (categoryFilter !== 'all' && expense.category_id !== categoryFilter) {
      return false
    }

    if (!monthPrefix) {
      return true
    }

    return expense.date.slice(0, 7) === monthPrefix
  })
}
