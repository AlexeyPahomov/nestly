import type { CategoryType } from '@nestly/shared'

export type CreateCategoryFormValues = {
  name: string
  type: string
}

export type ValidCreateCategoryFormPayload = {
  name: string
  type: CategoryType
}
