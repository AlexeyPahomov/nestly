import type { MonthBudgetProjection } from '@/processes/forecasting'

import {
  getLiquidityFlowNodeConfig,
  type LiquidityFlowNodeConfig,
  type LiquidityFlowNodeKind,
} from './liquidityFlowLayout'

export type LiquidityFlowNodeData = LiquidityFlowNodeConfig & {
  amount: number
}

const flowNodeKinds: LiquidityFlowNodeKind[] = [
  'income',
  'pool',
  'planned',
  'reserved',
  'forecast',
]

export function buildLiquidityFlowNodes(
  projection: MonthBudgetProjection,
  incomeTotal = 0,
): LiquidityFlowNodeData[] {
  const amounts: Record<LiquidityFlowNodeKind, number> = {
    income: incomeTotal,
    pool: projection.available,
    planned: projection.plannedTotal,
    reserved: projection.reservedTotal,
    forecast: projection.projectedFree,
  }

  return flowNodeKinds.map((kind) => ({
    ...getLiquidityFlowNodeConfig(kind),
    amount: amounts[kind],
  }))
}
