import { formatPeriodMonthLabel } from '@/entities/budget/lib/periodLabels'
import type { IncomeMonthCardView } from '@/entities/income/lib/buildIncomeMonthCards'

export type IncomePageSummary = {
  periodMonth: string
  periodTitle: string
  total: number
  changePercent: number | null
}

export type IncomePageMetrics = {
  summary: IncomePageSummary
  averageIncome: number | null
}

export function buildIncomePageMetrics(
  monthCards: readonly IncomeMonthCardView[],
  selectedPeriodMonth: string,
): IncomePageMetrics {
  const selectedIndex = monthCards.findIndex(
    (card) => card.id === selectedPeriodMonth,
  )
  const total = selectedIndex >= 0 ? monthCards[selectedIndex].amount : 0
  const prevCard = selectedIndex > 0 ? monthCards[selectedIndex - 1] : undefined
  const changePercent =
    prevCard && prevCard.amount > 0
      ? Math.round(((total - prevCard.amount) / prevCard.amount) * 100)
      : null

  const averageIncome =
    monthCards.length === 0
      ? null
      : Math.round(
          monthCards.reduce((sum, card) => sum + card.amount, 0) /
            monthCards.length,
        )

  return {
    summary: {
      periodMonth: selectedPeriodMonth,
      periodTitle: formatPeriodMonthLabel(selectedPeriodMonth, {
        lowercase: true,
        omitYear: true,
      }),
      total,
      changePercent,
    },
    averageIncome,
  }
}
