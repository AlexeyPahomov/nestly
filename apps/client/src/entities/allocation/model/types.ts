import type { Category } from '@/entities/category/model/types'
import type { Income } from '@/entities/income/model/types'

/** Ответ GET /allocation (Prisma Decimal → string). */
export type Allocation = {
  id: string
  user_id: string
  income_id: string
  category_id: string
  amount: string
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
