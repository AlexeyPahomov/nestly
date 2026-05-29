/** Ответ API (Prisma Decimal в JSON приходит строкой). */
export type Income = {
  id: string
  user_id: string
  amount: string
  source: string | null
  period_month: string
  created_at: string
}

/** Тело POST /income (CreateIncomeDto). */
export type CreateIncomePayload = {
  user_id: string
  amount: number
  source?: string
  period_month: string
}

/** Тело PATCH /income/:id (UpdateIncomeDto). */
export type UpdateIncomePayload = CreateIncomePayload
