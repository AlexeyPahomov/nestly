import { isCategoryIconKey, isCategoryType, isIconColorKey } from '@nestly/shared'

import type { CategoryFormValues, ValidCategoryFormPayload } from './types'

export function validateCategoryForm(
  values: CategoryFormValues,
):
  | { ok: true; payload: ValidCategoryFormPayload }
  | { ok: false; error: string } {
  const name = values.name.trim()
  if (!name) {
    return { ok: false as const, error: 'Введите название категории' }
  }

  if (!isCategoryType(values.type)) {
    return { ok: false as const, error: 'Выберите тип категории' }
  }

  if (!isCategoryIconKey(values.icon)) {
    return { ok: false as const, error: 'Выберите иконку категории' }
  }

  if (!isIconColorKey(values.icon_color)) {
    return { ok: false as const, error: 'Выберите цвет категории' }
  }

  return {
    ok: true as const,
    payload: {
      name,
      type: values.type,
      icon: values.icon,
      icon_color: values.icon_color,
    },
  }
}
