import { useEffect } from 'react'

export function useSyncSelectedCategory(
  selectedCategoryId: string | undefined,
  currentCategoryId: string,
  onCategoryChange: (categoryId: string) => void,
) {
  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== currentCategoryId) {
      onCategoryChange(selectedCategoryId)
    }
  }, [selectedCategoryId, currentCategoryId, onCategoryChange])
}
