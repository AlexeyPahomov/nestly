import type { Category } from '../model/types'

/** Категории для формы и списка расходов (без доходов и накоплений). */
export function filterExpenseCategories(
  categories: readonly Category[],
): Category[] {
  return categories.filter((category) => category.type === 'expense')
}
