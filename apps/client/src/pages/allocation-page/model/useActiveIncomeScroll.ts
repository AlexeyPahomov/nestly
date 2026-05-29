import { useLayoutEffect, type RefObject } from 'react'

import type { IncomeCardView } from '@/pages/allocation-page/lib/allocationIncomeCard'
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

    const activeDesktopCard =
      desktopIncomeScrollRef.current?.querySelector<HTMLElement>(
        `[data-income-card-id="${selectedPeriodMonth}"]`,
      )
    activeDesktopCard?.scrollIntoView({
      behavior: 'auto',
      inline: 'start',
      block: 'nearest',
    })
  }, [
    desktopIncomeScrollRef,
    incomeCards,
    incomeCarouselApi,
    selectedPeriodMonth,
  ])
}
