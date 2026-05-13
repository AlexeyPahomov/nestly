import { apiGet, apiPost } from '../../../shared/api/client'
import type { CreateIncomePayload, Income } from '../model/types'

const INCOME_PATH = '/income'

export function getIncomes(): Promise<Income[]> {
  return apiGet<Income[]>(INCOME_PATH)
}

export function createIncome(payload: CreateIncomePayload): Promise<Income> {
  return apiPost<Income>(INCOME_PATH, payload)
}
