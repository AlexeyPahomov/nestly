import type {
  ForecastChainMetadata,
  ForecastMonth,
  ForecastWarningType,
} from './types.js'

export function collectForecastChainMetadata(
  months: readonly ForecastMonth[],
): ForecastChainMetadata {
  const warningsByType: Partial<Record<ForecastWarningType, number>> = {}
  const propagatedDeficitMonths: string[] = []
  let warningCount = 0
  let firstDeficitMonth: string | null = null
  let hasDeficit = false
  let hasNegativeCarry = false

  for (const month of months) {
    if (month.openingBalance < 0) {
      hasNegativeCarry = true
      propagatedDeficitMonths.push(month.month)
    }

    if (month.deficit > 0) {
      hasDeficit = true
      firstDeficitMonth ??= month.month
    }

    for (const w of month.warnings) {
      warningCount += 1
      warningsByType[w.type] = (warningsByType[w.type] ?? 0) + 1
    }
  }

  return {
    monthCount: months.length,
    hasDeficit,
    firstDeficitMonth,
    hasNegativeCarry,
    propagatedDeficitMonths,
    warningCount,
    warningsByType,
  }
}
