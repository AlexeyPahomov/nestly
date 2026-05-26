import type { CategoryPayload } from '@/entities/category/model/types'
import type { CategoryIconKey, CategoryType, IconColorKey } from '@nestly/shared'

export type CategoryFormValues = {
  name: string
  type: string
  icon: CategoryIconKey
  icon_color: IconColorKey
}

export type ValidCategoryFormPayload = CategoryPayload & {
  type: CategoryType
}
