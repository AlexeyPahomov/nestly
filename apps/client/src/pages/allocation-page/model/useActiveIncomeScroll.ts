import { useLayoutEffect, type RefObject } from 'react'

import type { IncomeCardView } from '@/pages/allocation-page/lib/allocationIncomeCard'
import { scrollIncomeMonthCardToStart } from '@/pages/allocation-page/lib/scrollIncomeMonthCardToStart'
import type { CarouselApi } from '@/shared/ui'

/** Прокрутка к активному месяцу: он у левого края, более ранние — левее за скроллом. */
export function useActiveIncomeScroll(
  selectedPeriodMonth: string | null,
  incomeCards: IncomeCardView[],
  incomeCarouselApi: CarouselApi | undefined,
  desktopIncomeScrollRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!selectedPeriodMonth) {
      return
    }

    const activeIndex = incomeCards.findIndex(
      (card) => card.id === selectedPeriodMonth,
    )
    if (activeIndex < 0) {
      return
    }

    incomeCarouselApi?.scrollTo(activeIndex, false)

    const desktopScrollContainer = desktopIncomeScrollRef.current
    if (desktopScrollContainer?.offsetParent !== null) {
      const activeDesktopCard =
        desktopScrollContainer.querySelector<HTMLElement>(
          `[data-income-card-id="${selectedPeriodMonth}"]`,
        )
      if (activeDesktopCard) {
        scrollIncomeMonthCardToStart(desktopScrollContainer, activeDesktopCard)
      }
    }
  }, [
    desktopIncomeScrollRef,
    incomeCards,
    incomeCarouselApi,
    selectedPeriodMonth,
  ])
}
