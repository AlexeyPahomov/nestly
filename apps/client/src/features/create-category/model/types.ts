import type { CategoryPayload } from '@/entities/category/model/types'
import type { CategoryIconKey, CategoryType } from '@nestly/shared'

export type CategoryFormValues = {
  name: string
  type: string
  icon: CategoryIconKey
}

export type ValidCategoryFormPayload = CategoryPayload & {
  type: CategoryType
}
