export const CATEGORY_TYPES = ['income', 'expense', 'savings'] as const

export type CategoryType = (typeof CATEGORY_TYPES)[number]

export function isCategoryType(value: string): value is CategoryType {
  return (CATEGORY_TYPES as readonly string[]).includes(value)
}
