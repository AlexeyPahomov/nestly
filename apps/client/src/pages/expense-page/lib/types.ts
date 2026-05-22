export type { CategoryBudgetItem } from '@/entities/budget/model/types'

export type BudgetTotals = {
  allocated: number
  spent: number
  remaining: number
}

/** Операционная сводка за выбранный месяц (dashboard truth). */
export type OperationalSummary = {
  periodMonth: string
  periodLabel: string
  /** Не распределено по конвертам (минус перерасход расходных категорий). */
  available: number
  /** Остаток по категориям накоплений (sinking / savings). */
  inReserve: number
  /** Сумма расходов с датой в этом месяце. */
  spentThisMonth: number
  /** Сумма opening balance по всем конвертам. */
  carryForwardTotal: number
  /** Подпись предыдущего месяца для UX переноса. */
  previousPeriodLabel?: string
}
