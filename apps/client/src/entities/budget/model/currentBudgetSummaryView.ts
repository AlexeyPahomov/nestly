import type { ReserveCategorySummary } from './types'

/** Поля фактической сводки для UI (без прогнозных метрик). */
export type CurrentBudgetSummaryView = {
  available: number
  inReserve: number
  spentThisMonth: number
  carryForwardTotal: number
  previousPeriodLabel?: string
  reserveCategory?: ReserveCategorySummary
}
