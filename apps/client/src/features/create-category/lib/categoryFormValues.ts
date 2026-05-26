import type { Category } from '@/entities/category/model/types'
import { resolveCategoryIconKey } from '@/entities/category/lib/categoryIcons'
import {
  DEFAULT_CATEGORY_ICON_KEY,
  DEFAULT_ICON_COLOR_KEY,
  resolveIconColorKey,
} from '@coffer/shared'

import type { CategoryFormValues } from '../model/types'

export function emptyCategoryFormValues(): CategoryFormValues {
  return {
    name: '',
    type: 'expense',
    icon: DEFAULT_CATEGORY_ICON_KEY,
    icon_color: DEFAULT_ICON_COLOR_KEY,
  }
}

export function resolveCategoryFormValues(
  category: Category | null | undefined,
): CategoryFormValues {
  if (!category) {
    return emptyCategoryFormValues()
  }

  return {
    name: category.name,
    type: category.type,
    icon: resolveCategoryIconKey(
      category.icon,
      category.name,
      category.type,
    ),
    icon_color: resolveIconColorKey(category.icon_color),
  }
}
