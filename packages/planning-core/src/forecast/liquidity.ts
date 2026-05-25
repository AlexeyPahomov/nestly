/** Пул ликвидности до вычета обязательств (plans + reserves). */
export function computeLiquidityAvailable(input: {
  openingBalance: number
  income: number
  carryOver: number
  liquidityAdjustment: number
}): number {
  return (
    input.openingBalance +
    input.income +
    input.carryOver +
    input.liquidityAdjustment
  )
}

export function computeForecastDeficit(projectedFree: number): number {
  return projectedFree < 0 ? -projectedFree : 0
}
