import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import {
  expensePageWorkSwitcherButtonActiveClassName,
  expensePageWorkSwitcherButtonClassName,
  expensePageWorkSwitcherClassName,
  expensePageWorkSwitcherBarClassName,
} from '../lib/expensePageWorkCarouselLayout'
import { getExpensePageWorkSwitcherDomProps } from '../lib/expensePageCategoryFilterTarget'
import {
  EXPENSE_PAGE_WORK_SLIDES,
  type ExpensePageWorkSlideId,
} from '../lib/expensePageWorkAreaSlides'

type ExpensePageWorkAreaSwitcherProps = {
  activeSlideId: ExpensePageWorkSlideId
  onSelect: (slideId: ExpensePageWorkSlideId) => void
}

export function ExpensePageWorkAreaSwitcher({
  activeSlideId,
  onSelect,
}: ExpensePageWorkAreaSwitcherProps) {
  return (
    <div
      className={expensePageWorkSwitcherBarClassName}
      {...getExpensePageWorkSwitcherDomProps()}
    >
      <div
        className={expensePageWorkSwitcherClassName}
        role="tablist"
        aria-label="Разделы расходов"
      >
      {EXPENSE_PAGE_WORK_SLIDES.map((slide) => {
        const isActive = slide.id === activeSlideId

        return (
          <Button
            key={slide.id}
            type="button"
            role="tab"
            variant="ghost"
            size="sm"
            aria-selected={isActive}
            className={cn(
              expensePageWorkSwitcherButtonClassName,
              !isActive && 'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900',
              isActive && expensePageWorkSwitcherButtonActiveClassName,
            )}
            onClick={() => onSelect(slide.id)}
          >
            {slide.label}
          </Button>
        )
      })}
      </div>
    </div>
  )
}
