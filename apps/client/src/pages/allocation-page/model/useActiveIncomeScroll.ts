import { useEffect, type RefObject } from 'react'

import type { IncomeCardView } from '@/pages/allocation-page/model/useAllocationPage'
import type { CarouselApi } from '@/shared/ui'

export function useActiveIncomeScroll(
  selectedIncomeId: string | null,
  incomeCards: IncomeCardView[],
  incomeCarouselApi: CarouselApi | undefined,
  desktopIncomeScrollRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (!selectedIncomeId) {
      return
    }

    const activeIndex = incomeCards.findIndex(
      (card) => card.id === selectedIncomeId,
    )
    if (activeIndex < 0) {
      return
    }

    incomeCarouselApi?.scrollTo(activeIndex)

    const activeDesktopCard =
      desktopIncomeScrollRef.current?.querySelector<HTMLElement>(
        `[data-income-card-id="${selectedIncomeId}"]`,
      )
    activeDesktopCard?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [desktopIncomeScrollRef, incomeCards, incomeCarouselApi, selectedIncomeId])
}
