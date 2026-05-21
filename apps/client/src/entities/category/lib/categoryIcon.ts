import type { CategoryType } from '@nestly/shared'
import {
  Building2,
  Home,
  Landmark,
  ShoppingCart,
  Utensils,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import { createElement } from 'react'

import { isSavingsCategory } from './categoryKind'

/** Иконки расходных категорий по отображаемому названию. */
const ICON_BY_CATEGORY_NAME: Record<string, LucideIcon> = {
  карманные: Wallet,
  дача: Home,
  продукты: Utensils,
  квартира: Building2,
}

const DEFAULT_EXPENSE_ICON = ShoppingCart

function normalizeCategoryName(name: string): string {
  return name.trim().toLowerCase()
}

export function getCategoryLucideIcon(
  name: string,
  categoryType: CategoryType,
): LucideIcon {
  if (isSavingsCategory(categoryType)) {
    return Landmark
  }

  return ICON_BY_CATEGORY_NAME[normalizeCategoryName(name)] ?? DEFAULT_EXPENSE_ICON
}

export type CategoryLucideIconProps = LucideProps & {
  categoryName: string
  categoryType: CategoryType
}

export function CategoryLucideIcon({
  categoryName,
  categoryType,
  ...props
}: CategoryLucideIconProps) {
  return createElement(
    getCategoryLucideIcon(categoryName, categoryType),
    props,
  )
}
