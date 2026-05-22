import type { Category } from '../model/types'

export function filterExpenseCategories(
  categories: readonly Category[],
): Category[] {
  return categories.filter((category) => category.type !== 'income')
}
