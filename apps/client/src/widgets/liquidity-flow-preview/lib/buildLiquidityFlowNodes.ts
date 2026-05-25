import type { MonthBudgetProjection } from '@/processes/forecasting'

import {
  getLiquidityFlowNodeConfig,
  type LiquidityFlowNodeConfig,
} from './liquidityFlowLayout'

export type LiquidityFlowNodeData = LiquidityFlowNodeConfig & {
  amount: number
}

export function buildLiquidityFlowNodes(
  projection: MonthBudgetProjection,
  incomeTotal = 0,
): LiquidityFlowNodeData[] {
  return [
    { ...getLiquidityFlowNodeConfig('income', 'Доход'), amount: incomeTotal },
    {
      ...getLiquidityFlowNodeConfig('pool', 'Свободный пул'),
      amount: projection.available,
    },
    {
      ...getLiquidityFlowNodeConfig('planned', 'В планах'),
      amount: projection.plannedTotal,
    },
    {
      ...getLiquidityFlowNodeConfig('reserved', 'Зарезервировано'),
      amount: projection.reservedTotal,
    },
    {
      ...getLiquidityFlowNodeConfig('forecast', 'Прогноз свободных'),
      amount: projection.projectedFree,
    },
  ]
}
