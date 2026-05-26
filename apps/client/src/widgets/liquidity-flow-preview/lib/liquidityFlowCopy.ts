export type LiquidityFlowNodeKind =
  | 'income'
  | 'pool'
  | 'planned'
  | 'reserved'
  | 'forecast'

export const liquidityFlowNodeLabels: Record<LiquidityFlowNodeKind, string> = {
  income: 'Доход',
  pool: 'Свободно',
  planned: 'В планах',
  reserved: 'Резерв',
  forecast: 'Прогноз',
}

export const liquidityFlowIncomeDetailLabel = 'Доход за месяц'
