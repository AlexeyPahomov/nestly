import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type UIEventHandler,
} from 'react'

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

/** Скролл и клики по заголовкам меняют доли панелей; сброс — в `useExpensePageOutsideInteraction`. */
export function useExpensePagePaneBoost() {
  const [paneBoost, setPaneBoost] = useState<ExpensePagePaneBoost>('none')
  const [expensesCollapsed, setExpensesCollapsed] = useState(false)
  const scrollTopByListRef = useRef(new WeakMap<HTMLUListElement, number>())

  const resetPaneLayout = useCallback(() => {
    setPaneBoost('none')
    setExpensesCollapsed(false)
  }, [])

  const boostPane = useCallback((boost: ExpensePagePaneBoostActive) => {
    setPaneBoost((current) => (current === boost ? current : boost))
  }, [])

  const onExpenseHistoryTitleClick = useCallback(() => {
    if (paneBoost === 'categories' && !expensesCollapsed) {
      boostPane('expenses')
      return
    }

    if (expensesCollapsed) {
      resetPaneLayout()
      return
    }

    setExpensesCollapsed(true)
    setPaneBoost('none')
  }, [paneBoost, expensesCollapsed, boostPane, resetPaneLayout])

  const onCategoriesTitleClick = useCallback(() => {
    if (expensesCollapsed) {
      setExpensesCollapsed(false)
    }

    boostPane('categories')
  }, [expensesCollapsed, boostPane])

  const handleListScroll = useCallback(
    (boost: ExpensePagePaneBoostActive): UIEventHandler<HTMLUListElement> =>
      (event) => {
        if (!readListScrollDelta(event.currentTarget, scrollTopByListRef)) {
          return
        }

        if (boost === 'expenses' && expensesCollapsed) {
          setExpensesCollapsed(false)
        }

        boostPane(boost)
      },
    [boostPane, expensesCollapsed],
  )

  return {
    paneLayout: { paneBoost, expensesCollapsed },
    boostPane,
    resetPaneLayout,
    onExpenseHistoryTitleClick,
    onCategoriesTitleClick,
    onCategoryBudgetListScroll: handleListScroll('categories'),
    onExpenseListScroll: handleListScroll('expenses'),
  }
}
