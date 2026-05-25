import { cn } from '@/shared/lib/utils'

export type ExpensePagePaneBoost = 'none' | 'categories' | 'expenses'

export type ExpensePagePaneLayoutState = {
  paneBoost: ExpensePagePaneBoost
  expensesCollapsed: boolean
}

/** Оболочка страницы: казна + категории по контенту + история на остаток высоты. */
export const expensePageShellClassName =
  'flex min-h-0 flex-1 flex-col gap-4 px-0.5'

const paneTransitionClassName =
  'transition-[flex-grow] duration-300 ease-in-out motion-reduce:transition-none'

/** Категории: высота по сетке карточек, при переполнении — скролл внутри панели. */
const categoriesPaneContentSizedClassName =
  'max-h-full shrink-0 grow-0 basis-auto overflow-hidden'

/** Категории на всю высоту, когда история свёрнута. */
const categoriesPaneExpandedClassName = 'min-h-0 flex-1'

/** Доли высоты (3:2 · 3.6:1.4 · 2:3) при скролле или клике по заголовку. */
const categoriesPaneFlexByBoost: Record<ExpensePagePaneBoost, string> = {
  none: categoriesPaneContentSizedClassName,
  categories: 'min-h-0 flex-[3.6] overflow-hidden',
  expenses: 'min-h-0 flex-[2] overflow-hidden',
}

const expensesPaneDefaultClassName = 'min-h-0 flex-1'

const expensesPaneFlexByBoost: Record<ExpensePagePaneBoost, string> = {
  none: expensesPaneDefaultClassName,
  categories: 'min-h-0 flex-[1.4] overflow-hidden',
  expenses: 'min-h-0 flex-[3] overflow-hidden',
}

const expensesPaneCollapsedClassName =
  'shrink-0 grow-0 basis-auto'

export const expensePagePaneClassName =
  'flex min-h-0 min-w-0 flex-col'

export const expensePageScrollPaneClassName = cn(
  expensePagePaneClassName,
  paneTransitionClassName,
)

export function getExpensePageShellClassName(className?: string) {
  return cn(expensePageShellClassName, className)
}

function getPaneClassName(flexClassName: string, className?: string) {
  return cn(expensePagePaneClassName, flexClassName, className)
}

function resolveCategoriesPaneFlex({
  paneBoost,
  expensesCollapsed,
}: ExpensePagePaneLayoutState): string {
  if (expensesCollapsed) {
    return categoriesPaneExpandedClassName
  }

  return categoriesPaneFlexByBoost[paneBoost]
}

function resolveExpensesPaneFlex({
  paneBoost,
  expensesCollapsed,
}: ExpensePagePaneLayoutState): string {
  if (expensesCollapsed) {
    return expensesPaneCollapsedClassName
  }

  return expensesPaneFlexByBoost[paneBoost]
}

function shouldAnimatePaneFlex(): boolean {
  return true
}

export function getExpensePagePaneClassNames(
  layout: ExpensePagePaneLayoutState,
  classNames?: { categories?: string; expenses?: string },
) {
  const animatePaneFlex = shouldAnimatePaneFlex()

  return {
    categories: cn(
      getPaneClassName(
        resolveCategoriesPaneFlex(layout),
        classNames?.categories,
      ),
      animatePaneFlex && paneTransitionClassName,
    ),
    expenses: cn(
      getPaneClassName(resolveExpensesPaneFlex(layout), classNames?.expenses),
      animatePaneFlex && paneTransitionClassName,
    ),
  }
}
