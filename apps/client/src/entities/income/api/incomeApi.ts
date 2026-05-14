import { apiDelete, apiGet, apiPost } from '@/shared/api/client'
import type { CreateIncomePayload, Income } from '@/entities/income/model/types'

const INCOME_PATH = '/income'

export function getIncomes(): Promise<Income[]> {
  return apiGet<Income[]>(INCOME_PATH)
}

export function createIncome(payload: CreateIncomePayload): Promise<Income> {
  return apiPost<Income>(INCOME_PATH, payload)
}

export function deleteIncome(id: string, userId: string): Promise<void> {
  const q = new URLSearchParams({ user_id: userId })
  return apiDelete<void>(`${INCOME_PATH}/${encodeURIComponent(id)}?${q}`)
}
