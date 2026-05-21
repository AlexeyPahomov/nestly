import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type UIEventHandler,
} from 'react'

import { isItemsListPointerTarget } from '@/shared/ui/items-list/itemsListLayout'

import type { ExpensePagePaneBoost } from '../lib/expensePageLayout'

export type ExpensePagePaneBoostActive = Exclude<ExpensePagePaneBoost, 'none'>

function readListScrollDelta(
  list: HTMLUListElement,
  scrollTopByListRef: MutableRefObject<WeakMap<HTMLUListElement, number>>,
): boolean {
  const previousTop = scrollTopByListRef.current.get(list)
  const nextTop = list.scrollTop

  scrollTopByListRef.current.set(list, nextTop)

  return previousTop !== undefined && previousTop !== nextTop
}

function usePaneBoostOutsideReset(
  paneBoost: ExpensePagePaneBoost,
  resetPaneBoost: () => void,
) {
  useEffect(() => {
    if (paneBoost === 'none') {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (isItemsListPointerTarget(event.target)) {
        return
      }

      resetPaneBoost()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [paneBoost, resetPaneBoost])
}

/** Скролл и клики расширяют секцию; клик вне ItemsList — сброс к 3:2. */
export function useExpensePagePaneBoost() {
  const [paneBoost, setPaneBoost] = useState<ExpensePagePaneBoost>('none')
  const scrollTopByListRef = useRef(new WeakMap<HTMLUListElement, number>())

  const applyPaneBoost = useCallback((boost: ExpensePagePaneBoost) => {
    setPaneBoost((current) => (current === boost ? current : boost))
  }, [])

  const resetPaneBoost = useCallback(() => {
    applyPaneBoost('none')
  }, [applyPaneBoost])

  const boostPane = useCallback(
    (boost: ExpensePagePaneBoostActive) => {
      applyPaneBoost(boost)
    },
    [applyPaneBoost],
  )

  const handleListScroll = useCallback(
    (boost: ExpensePagePaneBoostActive): UIEventHandler<HTMLUListElement> =>
      (event) => {
        if (!readListScrollDelta(event.currentTarget, scrollTopByListRef)) {
          return
        }

        boostPane(boost)
      },
    [boostPane],
  )

  usePaneBoostOutsideReset(paneBoost, resetPaneBoost)

  return {
    paneBoost,
    boostPane,
    onCategoryBudgetListScroll: handleListScroll('categories'),
    onExpenseListScroll: handleListScroll('expenses'),
  }
}
