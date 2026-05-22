import type { BudgetMonthView } from '../model/types'

import { ApiError, apiGet, apiPost } from '@/shared/api/client'
import { DEV_USER_ID } from '@/shared/lib/constants'

function budgetMonthPath(periodMonth: string, suffix = ''): string {
  const q = new URLSearchParams({ user_id: DEV_USER_ID })
  return `/budget-months/${encodeURIComponent(periodMonth)}${suffix}?${q}`
}

export function getBudgetMonth(periodMonth: string): Promise<BudgetMonthView> {
  return apiGet<BudgetMonthView>(budgetMonthPath(periodMonth))
}

export function openBudgetMonth(periodMonth: string): Promise<BudgetMonthView> {
  return apiPost<BudgetMonthView>(budgetMonthPath(periodMonth, '/open'), {})
}

/** GET или POST open при 404 (месяц ещё не материализован). */
export async function fetchOrOpenBudgetMonth(
  periodMonth: string,
): Promise<BudgetMonthView> {
  try {
    return await getBudgetMonth(periodMonth)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return openBudgetMonth(periodMonth)
    }
    throw error
  }
}
