import { cn } from '@/shared/lib/utils'

export type ExpensePagePaneBoost = 'none' | 'categories' | 'expenses'

/** Оболочка страницы: казна + две прокручиваемые секции. */
export const expensePageShellClassName =
  'flex min-h-0 flex-1 flex-col gap-4 px-0.5'

const paneTransitionClassName =
  'transition-[flex-grow] duration-300 ease-in-out motion-reduce:transition-none'

/** Доли высоты (3:2 · 3.6:1.4 · 2:3) через flex-grow — плавнее, чем grid-rows. */
const categoriesPaneFlexByBoost: Record<ExpensePagePaneBoost, string> = {
  none: 'flex-[3]',
  categories: 'flex-[3.6]',
  expenses: 'flex-[2]',
}

const expensesPaneFlexByBoost: Record<ExpensePagePaneBoost, string> = {
  none: 'flex-[2]',
  categories: 'flex-[1.4]',
  expenses: 'flex-[3]',
}

export const expensePageScrollPaneClassName = cn(
  'flex min-h-0 min-w-0 flex-col overflow-hidden',
  paneTransitionClassName,
)

export function getExpensePageShellClassName(className?: string) {
  return cn(expensePageShellClassName, className)
}

function getScrollPaneClassName(
  flexClassName: string,
  className?: string,
) {
  return cn(expensePageScrollPaneClassName, flexClassName, className)
}

export function getCategoriesPaneClassName(
  paneBoost: ExpensePagePaneBoost = 'none',
  className?: string,
) {
  return getScrollPaneClassName(categoriesPaneFlexByBoost[paneBoost], className)
}

export function getExpensesPaneClassName(
  paneBoost: ExpensePagePaneBoost = 'none',
  className?: string,
) {
  return getScrollPaneClassName(expensesPaneFlexByBoost[paneBoost], className)
}
