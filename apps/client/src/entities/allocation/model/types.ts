import type { AllocationType } from '@coffer/shared'

import type { Category } from '@/entities/category/model/types'
import type { Income } from '@/entities/income/model/types'

/** Ответ GET /allocation (Prisma Decimal → string). */
export type Allocation = {
  id: string
  user_id: string
  income_id: string
  category_id: string
  amount: string
  type: AllocationType
  period_month: string
  created_at: string
  category: Category
  income: Income
}

/** Тело POST /allocation. */
export type CreateAllocationPayload = {
  income_id: string
  category_id: string
  amount: number
}

/** Тело PATCH /allocation/:id. */
export type UpdateAllocationPayload = {
  category_id: string
  amount: number
}
