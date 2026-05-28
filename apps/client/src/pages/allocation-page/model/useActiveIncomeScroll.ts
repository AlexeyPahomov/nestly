import { useEffect, type RefObject } from 'react'

import type { IncomeCardView } from '@/pages/allocation-page/lib/allocationIncomeCard'
import type { CarouselApi } from '@/shared/ui'

export function useActiveIncomeScroll(
  selectedPeriodMonth: string | null,
  incomeCards: IncomeCardView[],
  incomeCarouselApi: CarouselApi | undefined,
  desktopIncomeScrollRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (!selectedPeriodMonth) {
      return
    }

    const activeIndex = incomeCards.findIndex(
      (card) => card.id === selectedPeriodMonth,
    )
    if (activeIndex < 0) {
      return
    }

    incomeCarouselApi?.scrollTo(activeIndex)

    const activeDesktopCard =
      desktopIncomeScrollRef.current?.querySelector<HTMLElement>(
        `[data-income-card-id="${selectedPeriodMonth}"]`,
      )
    activeDesktopCard?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [desktopIncomeScrollRef, incomeCards, incomeCarouselApi, selectedPeriodMonth])
}
