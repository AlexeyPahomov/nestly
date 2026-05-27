import { useEffect } from 'react'

import { isCategoryBudgetCardPointerTarget } from '@/widgets/category-budget-list/lib/categoryBudgetCardTarget'

type UseExpensePageOutsideInteractionOptions = {
  selectedCategoryId: string | null
  onClearSelectedCategory: () => void
}

/** Сброс фильтра категории — клик вне карточки (в т.ч. пустая зона списка «По категориям»). */
export function useExpensePageOutsideInteraction({
  selectedCategoryId,
  onClearSelectedCategory,
}: UseExpensePageOutsideInteractionOptions) {
  const shouldClearCategory = selectedCategoryId != null

  useEffect(() => {
    if (!shouldClearCategory) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isCategoryBudgetCardPointerTarget(event.target)) {
        onClearSelectedCategory()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [shouldClearCategory, onClearSelectedCategory])
}
