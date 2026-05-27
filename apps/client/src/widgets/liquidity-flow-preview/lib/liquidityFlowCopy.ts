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

/** Короткие подписи для компактного mobile rail. */
export const liquidityFlowRailLabels: Record<
  Exclude<LiquidityFlowNodeKind, 'income'>,
  string
> = {
  pool: liquidityFlowNodeLabels.pool,
  planned: 'План',
  reserved: liquidityFlowNodeLabels.reserved,
  forecast: liquidityFlowNodeLabels.forecast,
}

export const liquidityFlowIncomeDetailLabel = 'Доход за месяц'
