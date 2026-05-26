import type { ReactNode } from 'react'

import {
  plannedExpenseListClassName,
  plannedExpenseListHeaderClassName,
  plannedExpenseListHeaderTitleClassName,
} from '../lib/plannedExpenseCardLayout'

export type PlannedExpensesListProps = {
  title: string
  children: ReactNode
}

export function PlannedExpensesList({ title, children }: PlannedExpensesListProps) {
  return (
    <section className={plannedExpenseListClassName}>
      <header className={plannedExpenseListHeaderClassName}>
        <h2 className={plannedExpenseListHeaderTitleClassName}>{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  )
}
