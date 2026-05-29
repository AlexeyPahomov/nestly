import { useCallback, useState } from 'react'

import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  MobileFixedStartCorner,
} from '@/shared/ui'
import {
  ExpenseListToolbar,
  type ExpenseListViewMode,
} from '@/widgets/expense-list'

import {
  expensePageWorkCarouselContentClassName,
  expensePageWorkCarouselItemClassName,
  expensePageWorkCarouselOptions,
  expensePageWorkCarouselRootClassName,
  expensePageWorkCarouselViewportClassName,
} from '../lib/expensePageWorkCarouselLayout'
import {
  EXPENSE_PAGE_WORK_SLIDE,
  EXPENSE_PAGE_WORK_SLIDES,
  getExpensePageWorkSlideIndex,
  type ExpensePageWorkSlideId,
} from '../lib/expensePageWorkAreaSlides'
import { useExpensePageWorkCarousel } from '../model/useExpensePageWorkCarousel'

import type { ExpensePageWorkAreaPanelsProps } from './expensePageWorkAreaPanels'
import {
  ExpensePageCategoriesPanel,
  ExpensePageHistoryPanel,
} from './expensePageWorkAreaPanels'
import { ExpensePageWorkAreaSwitcher } from './ExpensePageWorkAreaSwitcher'

type ExpensePageWorkAreaMobileCarouselProps = ExpensePageWorkAreaPanelsProps & {
  listLayout: ItemsListLayout
}

export function ExpensePageWorkAreaMobileCarousel({
  listLayout,
  ...panels
}: ExpensePageWorkAreaMobileCarouselProps) {
  const { setCarouselApi, activeIndex, selectSlide } = useExpensePageWorkCarousel()
  const activeSlideId = EXPENSE_PAGE_WORK_SLIDES[activeIndex]?.id ?? EXPENSE_PAGE_WORK_SLIDE.categories
  const [historyViewMode, setHistoryViewMode] = useState<ExpenseListViewMode>('list')
  const isHistorySlide = activeSlideId === EXPENSE_PAGE_WORK_SLIDE.history

  function handleSwitcherSelect(slideId: ExpensePageWorkSlideId) {
    selectSlide(getExpensePageWorkSlideIndex(slideId))
  }

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      const togglingOff = panels.selectedCategoryId === categoryId
      panels.onCategorySelect(categoryId)

      if (!togglingOff) {
        selectSlide(getExpensePageWorkSlideIndex(EXPENSE_PAGE_WORK_SLIDE.history))
      }
    },
    [panels, selectSlide],
  )

  const mobilePanels = { ...panels, onCategorySelect: handleCategorySelect }

  return (
    <div className={expensePageWorkCarouselRootClassName}>
      <ExpensePageWorkAreaSwitcher
        activeSlideId={activeSlideId}
        onSelect={handleSwitcherSelect}
      />

      <Carousel
        className={expensePageWorkCarouselViewportClassName}
        opts={expensePageWorkCarouselOptions}
        setApi={setCarouselApi}
      >
        <CarouselContent className={expensePageWorkCarouselContentClassName}>
          <CarouselItem className={expensePageWorkCarouselItemClassName}>
            <ExpensePageCategoriesPanel
              listLayout={listLayout}
              hideListTitle
              {...mobilePanels}
            />
          </CarouselItem>

          <CarouselItem className={expensePageWorkCarouselItemClassName}>
            <ExpensePageHistoryPanel
              listLayout={listLayout}
              hideListTitle
              hideHeaderViewSwitcher
              historyViewMode={historyViewMode}
              onHistoryViewModeChange={setHistoryViewMode}
              {...mobilePanels}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {isHistorySlide ? (
        <MobileFixedStartCorner>
          <ExpenseListToolbar
            className="pointer-events-auto"
            viewMode={historyViewMode}
            onViewModeChange={setHistoryViewMode}
          />
        </MobileFixedStartCorner>
      ) : null}
    </div>
  )
}
