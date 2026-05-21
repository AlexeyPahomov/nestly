import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type UIEventHandler,
} from 'react'

import type { ExpensePagePaneBoost } from '../lib/expensePageLayout'

function readListScrollDelta(
  list: HTMLUListElement,
  scrollTopByListRef: MutableRefObject<WeakMap<HTMLUListElement, number>>,
): boolean {
  const previousTop = scrollTopByListRef.current.get(list)
  const nextTop = list.scrollTop

  scrollTopByListRef.current.set(list, nextTop)

  return previousTop !== undefined && previousTop !== nextTop
}

export function useExpensePagePaneBoost() {
  const [paneBoost, setPaneBoost] = useState<ExpensePagePaneBoost>('none')
  const scrollTopByListRef = useRef(new WeakMap<HTMLUListElement, number>())

  const handleListScroll = useCallback(
    (boost: Exclude<ExpensePagePaneBoost, 'none'>): UIEventHandler<HTMLUListElement> =>
      (event) => {
        if (!readListScrollDelta(event.currentTarget, scrollTopByListRef)) {
          return
        }

        setPaneBoost(boost)
      },
    [],
  )

  const onCategoryBudgetListScroll = handleListScroll('categories')
  const onExpenseListScroll = handleListScroll('expenses')

  return {
    paneBoost,
    onCategoryBudgetListScroll,
    onExpenseListScroll,
  }
}
