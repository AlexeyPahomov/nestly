import { useCallback } from 'react'

import type { ExpensePagePaneBoostActive } from './useExpensePagePaneBoost'

type UseExpensePageCategorySelectionOptions = {
  selectedCategoryId: string | null
  setSelectedCategoryId: (categoryId: string | null) => void
  boostPane: (boost: ExpensePagePaneBoostActive) => void
}

export function useExpensePageCategorySelection({
  selectedCategoryId,
  setSelectedCategoryId,
  boostPane,
}: UseExpensePageCategorySelectionOptions) {
  const clearSelectedCategory = useCallback(() => {
    setSelectedCategoryId(null)
  }, [setSelectedCategoryId])

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      if (selectedCategoryId === categoryId) {
        clearSelectedCategory()
        return
      }

      setSelectedCategoryId(categoryId)
      boostPane('categories')
    },
    [
      selectedCategoryId,
      clearSelectedCategory,
      setSelectedCategoryId,
      boostPane,
    ],
  )

  const expenseCategoryFilter =
    selectedCategoryId == null ? 'all' : selectedCategoryId

  return {
    expenseCategoryFilter,
    clearSelectedCategory,
    handleCategorySelect,
  }
}
