import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import {
  plannedExpenseListBodyClassName,
  plannedExpenseListClassName,
  plannedExpenseListHeaderClassName,
  plannedExpenseListHeaderTitleClassName,
} from '../lib/plannedExpenseCardLayout'

export type PlannedExpensesListProps = {
  title: string
  children: ReactNode
  bodyClassName?: string
}

export function PlannedExpensesList({
  title,
  children,
  bodyClassName,
}: PlannedExpensesListProps) {
  return (
    <section className={plannedExpenseListClassName}>
      <header className={plannedExpenseListHeaderClassName}>
        <h2 className={plannedExpenseListHeaderTitleClassName}>{title}</h2>
      </header>
      <div className={cn(plannedExpenseListBodyClassName, bodyClassName)}>
        {children}
      </div>
    </section>
  )
}
