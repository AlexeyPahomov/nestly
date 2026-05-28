import { categoryBudgetCardSelector } from '@/widgets/category-budget-list/lib/categoryBudgetCardTarget'

export const expensePageWorkSwitcherDataAttr = 'data-expense-page-work-switcher'

export const expensePageWorkPanelDataAttr = 'data-expense-page-work-panel'

export function getExpensePageWorkSwitcherDomProps() {
  return { [expensePageWorkSwitcherDataAttr]: '' } as const
}

export function getExpensePageWorkPanelDomProps(
  panel: 'categories' | 'history',
) {
  return { [expensePageWorkPanelDataAttr]: panel } as const
}

const preserveCategoryFilterSelector = [
  categoryBudgetCardSelector,
  `[${expensePageWorkSwitcherDataAttr}]`,
  `[${expensePageWorkPanelDataAttr}="history"]`,
].join(',')

/** Не сбрасывать фильтр категории (карточка, табы, панель истории). */
export function shouldPreserveExpensePageCategoryFilter(
  target: EventTarget | null,
): boolean {
  if (!(target instanceof Element)) {
    return false
  }

  return target.closest(preserveCategoryFilterSelector) != null
}
