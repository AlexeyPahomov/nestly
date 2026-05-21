import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type UIEventHandler,
} from 'react'

import type { ExpensePagePaneBoost } from '../lib/expensePageLayout'

const OPEN_SCROLL_GRACE_MS = 400

function readListScrollDelta(
  list: HTMLUListElement,
  scrollTopByListRef: MutableRefObject<WeakMap<HTMLUListElement, number>>,
): boolean {
  const previousTop = scrollTopByListRef.current.get(list)
  const nextTop = list.scrollTop

  scrollTopByListRef.current.set(list, nextTop)

  return previousTop !== undefined && previousTop !== nextTop
}

export function useBudgetSummaryOpen() {
  const [open, setOpenState] = useState(false)
  const [paneBoost, setPaneBoost] = useState<ExpensePagePaneBoost>('none')
  const ignoreScrollUntilRef = useRef(0)
  const scrollTopByListRef = useRef(new WeakMap<HTMLUListElement, number>())

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      ignoreScrollUntilRef.current = Date.now() + OPEN_SCROLL_GRACE_MS
      setPaneBoost('none')
    }
    setOpenState(next)
  }, [])

  const handleListScroll = useCallback(
    (boost: Exclude<ExpensePagePaneBoost, 'none'>): UIEventHandler<HTMLUListElement> =>
      (event) => {
        if (Date.now() < ignoreScrollUntilRef.current) {
          return
        }

        if (!readListScrollDelta(event.currentTarget, scrollTopByListRef)) {
          return
        }

        setPaneBoost(boost)
        setOpenState((value) => (value ? false : value))
      },
    [],
  )

  const onCategoryBudgetListScroll = handleListScroll('categories')
  const onExpenseListScroll = handleListScroll('expenses')

  return {
    open,
    setOpen,
    paneBoost,
    onCategoryBudgetListScroll,
    onExpenseListScroll,
  }
}
