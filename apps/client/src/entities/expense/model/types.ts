/** Frontend contract (не Prisma). */
export type Expense = {
  id: string
  user_id: string
  category_id: string
  amount: number
  description: string | null
  date: string
  created_at: string
}

/** Тело POST /expense. */
export type CreateExpensePayload = {
  user_id: string
  category_id: string
  amount: number
  description?: string
  date: string
}

/** Тело PATCH /expense/:id. */
export type UpdateExpensePayload = {
  category_id: string
  amount: number
  description?: string
  date: string
}
