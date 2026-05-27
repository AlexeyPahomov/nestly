import { useCallback } from 'react'

type UseExpensePageCategorySelectionOptions = {
  selectedCategoryId: string | null
  setSelectedCategoryId: (categoryId: string | null) => void
}

export function useExpensePageCategorySelection({
  selectedCategoryId,
  setSelectedCategoryId,
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
    },
    [selectedCategoryId, clearSelectedCategory, setSelectedCategoryId],
  )

  const expenseCategoryFilter =
    selectedCategoryId == null ? 'all' : selectedCategoryId

  return {
    expenseCategoryFilter,
    clearSelectedCategory,
    handleCategorySelect,
  }
}
