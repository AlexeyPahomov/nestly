import type { MonthBudgetProjection } from '@/processes/forecasting'

import {
  getLiquidityFlowNodeConfig,
  type LiquidityFlowNodeConfig,
  type LiquidityFlowNodeKind,
} from './liquidityFlowLayout'

export type LiquidityFlowNodeData = LiquidityFlowNodeConfig & {
  amount: number
}

export type LiquidityFlowRailNodeKind = Exclude<LiquidityFlowNodeKind, 'income'>

export type LiquidityFlowRailNodeData = LiquidityFlowNodeConfig & {
  kind: LiquidityFlowRailNodeKind
  amount: number
}

const flowNodeKinds: LiquidityFlowNodeKind[] = [
  'income',
  'pool',
  'planned',
  'reserved',
  'forecast',
]

const railNodeKinds: LiquidityFlowRailNodeKind[] = [
  'pool',
  'planned',
  'reserved',
  'forecast',
]

function liquidityFlowAmounts(
  projection: MonthBudgetProjection,
  incomeTotal: number,
): Record<LiquidityFlowNodeKind, number> {
  return {
    income: incomeTotal,
    pool: projection.available,
    planned: projection.plannedTotal,
    reserved: projection.reservedTotal,
    forecast: projection.projectedFree,
  }
}

function buildNodes<K extends LiquidityFlowNodeKind>(
  kinds: readonly K[],
  amounts: Record<LiquidityFlowNodeKind, number>,
): Array<LiquidityFlowNodeConfig & { kind: K; amount: number }> {
  return kinds.map((kind) => {
    const { kind: _kind, ...config } = getLiquidityFlowNodeConfig(kind)
    return {
      ...config,
      kind,
      amount: amounts[kind],
    }
  })
}

export function buildLiquidityFlowNodes(
  projection: MonthBudgetProjection,
  incomeTotal = 0,
): LiquidityFlowNodeData[] {
  return buildNodes(flowNodeKinds, liquidityFlowAmounts(projection, incomeTotal))
}

export function buildLiquidityFlowRailNodes(
  projection: MonthBudgetProjection,
  incomeTotal = 0,
): LiquidityFlowRailNodeData[] {
  return buildNodes(
    railNodeKinds,
    liquidityFlowAmounts(projection, incomeTotal),
  )
}
