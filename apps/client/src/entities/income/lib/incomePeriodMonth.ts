import { getMonthKeyFromIso } from '@coffer/shared'

import type { Income } from '@/entities/income/model/types'

export function getIncomePeriodMonth(income: Income): string {
  return getMonthKeyFromIso(income.period_month) ?? income.period_month
}
