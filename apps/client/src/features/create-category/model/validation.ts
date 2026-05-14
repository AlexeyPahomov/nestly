import { isCategoryType } from '@nestly/shared'

import type {
  CreateCategoryFormValues,
  ValidCreateCategoryFormPayload,
} from './types'

export function validateCreateCategoryForm(
  values: CreateCategoryFormValues,
):
  | { ok: true; payload: ValidCreateCategoryFormPayload }
  | { ok: false; error: string } {
  const name = values.name.trim()
  if (!name) {
    return { ok: false as const, error: 'Введите название категории' }
  }

  if (!isCategoryType(values.type)) {
    return { ok: false as const, error: 'Выберите тип категории' }
  }

  return {
    ok: true as const,
    payload: { name, type: values.type },
  }
}
