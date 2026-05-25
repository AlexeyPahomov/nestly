import type { ReserveCategorySummary } from './types'

/** Операционная сводка за выбранный месяц (dashboard truth). */
export type OperationalSummary = {
  periodMonth: string
  periodLabel: string
  /** Не распределено по конвертам (минус перерасход расходных категорий). */
  available: number
  /** Остаток по категориям накоплений (sinking / savings). */
  inReserve: number
  /** Категория накоплений для блока «В резерве». */
  reserveCategory?: ReserveCategorySummary
  /** Сумма расходов с датой в этом месяце. */
  spentThisMonth: number
  /** Сумма opening balance по всем конвертам. */
  carryForwardTotal: number
  /** Подпись предыдущего месяца для UX переноса. */
  previousPeriodLabel?: string
  /** Сумма планов со статусом PLANNED. */
  plannedTotal: number
  /** Сумма планов со статусом RESERVED. */
  reservedTotal: number
  /** Прогноз свободного пула после планов и резерва. */
  projectedFree: number
}
