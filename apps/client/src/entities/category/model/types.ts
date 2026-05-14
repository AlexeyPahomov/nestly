import type { CategoryType } from '@nestly/shared'

export type { CategoryType }

export type Category = {
  id: string
  user_id: string
  name: string
  type: CategoryType
  created_at: string
}

export type CreateCategoryPayload = {
  name: string
  type: CategoryType
}
