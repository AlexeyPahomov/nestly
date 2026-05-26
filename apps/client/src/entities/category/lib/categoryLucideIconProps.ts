import type { CategoryType } from '@coffer/shared'

import type { CategoryLucideIconProps } from './categoryIcon'

type CategoryIconSource = {
  name: string
  type: CategoryType
  icon?: string | null
}

export function toCategoryLucideIconProps(
  category: CategoryIconSource,
): CategoryLucideIconProps {
  return {
    categoryName: category.name,
    categoryType: category.type,
    icon: category.icon,
  }
}
