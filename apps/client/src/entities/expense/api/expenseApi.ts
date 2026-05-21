import { apiGet, apiPost } from '@/shared/api/client'
import { toMoneyNumber } from '@/shared/lib/money'

import type { CreateExpensePayload, Expense } from '../model/types'

const EXPENSE_PATH = '/expense'

/** Ответ API до приведения к frontend contract. */
type ExpenseApiRow = {
  id: string
  user_id: string
  category_id: string
  amount: string | number
  description: string | null
  date: string
  created_at: string
}

function mapExpense(row: ExpenseApiRow): Expense {
  return {
    id: row.id,
    user_id: row.user_id,
    category_id: row.category_id,
    amount: toMoneyNumber(row.amount),
    description: row.description,
    date: row.date,
    created_at: row.created_at,
  }
}

export function getExpenses(): Promise<Expense[]> {
  return apiGet<ExpenseApiRow[]>(EXPENSE_PATH).then((rows) => rows.map(mapExpense))
}

export function createExpense(payload: CreateExpensePayload): Promise<Expense> {
  return apiPost<ExpenseApiRow>(EXPENSE_PATH, payload).then(mapExpense)
}
