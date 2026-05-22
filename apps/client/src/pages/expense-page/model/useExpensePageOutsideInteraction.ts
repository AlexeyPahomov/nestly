import { useEffect } from 'react'

import { isItemsListPointerTarget } from '@/shared/ui/items-list/itemsListLayout'
import { isCategoryBudgetCardPointerTarget } from '@/widgets/category-budget-list/lib/categoryBudgetCardTarget'

import type { ExpensePagePaneLayoutState } from '../lib/expensePageLayout'

type UseExpensePageOutsideInteractionOptions = {
  layout: ExpensePagePaneLayoutState
  selectedCategoryId: string | null
  onResetPaneLayout: () => void
  onClearSelectedCategory: () => void
}

/**
 * Сброс фильтра категории — клик вне карточки (в т.ч. пустая зона списка «По категориям»).
 * Сброс раскладки панелей — клик вне любого ItemsList.
 */
export function useExpensePageOutsideInteraction({
  layout,
  selectedCategoryId,
  onResetPaneLayout,
  onClearSelectedCategory,
}: UseExpensePageOutsideInteractionOptions) {
  const { paneBoost, expensesCollapsed } = layout
  const shouldResetPaneLayout =
    paneBoost !== 'none' || expensesCollapsed
  const shouldClearCategory = selectedCategoryId != null

  useEffect(() => {
    if (!shouldResetPaneLayout && !shouldClearCategory) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (
        shouldClearCategory &&
        !isCategoryBudgetCardPointerTarget(target)
      ) {
        onClearSelectedCategory()
      }

      if (
        shouldResetPaneLayout &&
        !isItemsListPointerTarget(target)
      ) {
        onResetPaneLayout()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [
    shouldResetPaneLayout,
    shouldClearCategory,
    onResetPaneLayout,
    onClearSelectedCategory,
  ])
}
