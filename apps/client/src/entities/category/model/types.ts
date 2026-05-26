import type { CategoryIconKey, CategoryType, IconColorKey } from '@coffer/shared'

export type { CategoryType, CategoryIconKey, IconColorKey }

export type Category = {
  id: string
  user_id: string
  name: string
  type: CategoryType
  icon: CategoryIconKey
  icon_color: IconColorKey
  created_at: string
}

export type CategoryPayload = {
  name: string
  type: CategoryType
  icon: CategoryIconKey
  icon_color: IconColorKey
}

/** @deprecated Используйте CategoryPayload */
export type CreateCategoryPayload = CategoryPayload

/** @deprecated Используйте CategoryPayload */
export type UpdateCategoryPayload = CategoryPayload
