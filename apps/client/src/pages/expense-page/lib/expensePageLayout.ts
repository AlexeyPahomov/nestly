import { cn } from '@/shared/lib/utils'

export type ExpensePagePaneBoost = 'none' | 'categories' | 'expenses'

export type ExpensePagePaneLayoutState = {
  paneBoost: ExpensePagePaneBoost
  expensesCollapsed: boolean
}

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

const expensesPaneCollapsedFlexClassName =
  'shrink-0 flex-grow-0 flex-basis-auto'

const categoriesPaneWhenExpensesCollapsedFlexClassName = 'min-h-0 flex-[1]'

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

function resolveCategoriesPaneFlex({
  paneBoost,
  expensesCollapsed,
}: ExpensePagePaneLayoutState): string {
  if (!expensesCollapsed) {
    return categoriesPaneFlexByBoost[paneBoost]
  }

  return paneBoost === 'categories'
    ? categoriesPaneFlexByBoost.categories
    : categoriesPaneWhenExpensesCollapsedFlexClassName
}

function resolveExpensesPaneFlex({
  paneBoost,
  expensesCollapsed,
}: ExpensePagePaneLayoutState): string {
  if (expensesCollapsed) {
    return expensesPaneCollapsedFlexClassName
  }

  return expensesPaneFlexByBoost[paneBoost]
}

export function getExpensePagePaneClassNames(
  layout: ExpensePagePaneLayoutState,
  classNames?: { categories?: string; expenses?: string },
) {
  return {
    categories: getScrollPaneClassName(
      resolveCategoriesPaneFlex(layout),
      classNames?.categories,
    ),
    expenses: getScrollPaneClassName(
      resolveExpensesPaneFlex(layout),
      classNames?.expenses,
    ),
  }
}
