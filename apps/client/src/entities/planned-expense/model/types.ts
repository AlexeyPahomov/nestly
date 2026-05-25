export type PlannedExpenseStatus =
  | 'PLANNED'
  | 'RESERVED'
  | 'COMPLETED'
  | 'CANCELLED'

export type PlannedExpense = {
  id: string
  user_id: string
  title: string
  description: string | null
  amount: number
  planned_date: string
  status: PlannedExpenseStatus
  category_id: string | null
  budget_month_id: string
  /** Якорь планирования — `BudgetMonth` (YYYY-MM). */
  period_month: string
  created_at: string
  updated_at: string
}

export type CreatePlannedExpensePayload = {
  title: string
  description?: string
  amount: number
  planned_date: string
  category_id?: string
}

export type UpdatePlannedExpensePayload = {
  title?: string
  description?: string
  amount?: number
  planned_date?: string
  status?: PlannedExpenseStatus
  category_id?: string | null
}
