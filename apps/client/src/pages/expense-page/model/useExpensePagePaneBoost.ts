import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type UIEventHandler,
} from 'react'

import type { ExpensePagePaneBoost } from '../lib/expensePageLayout'

export type ExpensePagePaneBoostActive = Exclude<ExpensePagePaneBoost, 'none'>

function readScrollContainerDelta(
  element: HTMLElement,
  scrollTopByElementRef: MutableRefObject<WeakMap<HTMLElement, number>>,
): boolean {
  const previousTop = scrollTopByElementRef.current.get(element)
  const nextTop = element.scrollTop

  scrollTopByElementRef.current.set(element, nextTop)

  return previousTop !== undefined && previousTop !== nextTop
}

/** Скролл и клики по заголовкам меняют доли панелей; сброс — в `useExpensePageOutsideInteraction`. */
export function useExpensePagePaneBoost() {
  const [paneBoost, setPaneBoost] = useState<ExpensePagePaneBoost>('none')
  const [expensesCollapsed, setExpensesCollapsed] = useState(false)
  const scrollTopByElementRef = useRef(new WeakMap<HTMLElement, number>())

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

  const handleScrollBoost = useCallback(
    (boost: ExpensePagePaneBoostActive): UIEventHandler<HTMLElement> =>
      (event) => {
        if (!readScrollContainerDelta(event.currentTarget, scrollTopByElementRef)) {
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
    onCategoryBudgetListScroll: handleScrollBoost('categories'),
    onExpenseListScroll: handleScrollBoost('expenses'),
  }
}
