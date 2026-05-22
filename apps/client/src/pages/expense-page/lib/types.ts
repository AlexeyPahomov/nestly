import type { Category } from '@/entities/category/model/types'

export type CategoryBudgetItem = {
  category: Category
  allocated: number
  spent: number
  remaining: number
}

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
}
