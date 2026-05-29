import type { CurrentBudgetSummaryView } from '@/entities/budget/model/currentBudgetSummaryView'

import { buildCurrentBudgetSummaryCards } from '../lib/buildCurrentBudgetSummaryCards'
import { currentBudgetSummaryGridClassName } from '../lib/currentBudgetSummaryLayout'

import { CurrentBudgetMetricCard } from './CurrentBudgetMetricCard'

/** Reporting: что произошло / текущее состояние пула (факт). */
export type CurrentBudgetSummaryProps = CurrentBudgetSummaryView

export function CurrentBudgetSummary(props: CurrentBudgetSummaryProps) {
  const cards = buildCurrentBudgetSummaryCards(props)

  return (
    <div className={currentBudgetSummaryGridClassName}>
      {cards.map((card) => (
        <CurrentBudgetMetricCard key={card.accent} {...card} />
      ))}
    </div>
  )
}
