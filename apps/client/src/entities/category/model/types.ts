import type { CategoryIconKey, CategoryType } from '@nestly/shared'

export type { CategoryType, CategoryIconKey }

export type Category = {
  id: string
  user_id: string
  name: string
  type: CategoryType
  icon: CategoryIconKey
  created_at: string
}

export type CategoryPayload = {
  name: string
  type: CategoryType
  icon: CategoryIconKey
}

/** @deprecated Используйте CategoryPayload */
export type CreateCategoryPayload = CategoryPayload

/** @deprecated Используйте CategoryPayload */
export type UpdateCategoryPayload = CategoryPayload
