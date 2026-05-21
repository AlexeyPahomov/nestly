import { cn } from '@/shared/lib/utils'

const expensePageGridBaseClassName =
  'grid min-h-0 flex-1 gap-4 px-0.5 transition-[grid-template-rows] duration-150 ease-out motion-reduce:transition-none'

export type ExpensePagePaneBoost = 'none' | 'categories' | 'expenses'

const expensePageGridRowsByBoost: Record<ExpensePagePaneBoost, string> = {
  none: 'grid-rows-[auto_minmax(0,3fr)_minmax(0,2fr)]',
  categories: 'grid-rows-[auto_minmax(0,3.6fr)_minmax(0,1.4fr)]',
  expenses: 'grid-rows-[auto_minmax(0,2fr)_minmax(0,3fr)]',
}

/** Сетка страницы расходов: казна · категории · история. */
export function expensePageGridClassName(paneBoost: ExpensePagePaneBoost) {
  return cn(expensePageGridBaseClassName, expensePageGridRowsByBoost[paneBoost])
}

export const expensePageScrollPaneClassName =
  'flex min-h-0 flex-col overflow-hidden'
