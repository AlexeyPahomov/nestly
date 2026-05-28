import type { MonthBudgetProjection } from '@/processes/forecasting'

export type LiquidityFlowDataProps = {
  projection: MonthBudgetProjection
  /** Доход за месяц (первая ступень полного потока). */
  incomeTotal?: number
  /** Сумма распределений по категориям за месяц. */
  allocatedTotal?: number
}
