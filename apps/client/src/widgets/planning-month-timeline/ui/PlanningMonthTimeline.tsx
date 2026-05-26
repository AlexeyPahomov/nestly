import { formatPeriodMonthLabel } from '@/entities/budget/lib/periodLabels'
import { cn } from '@/shared/lib/utils'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  planningMonthCarouselContentClassName,
  planningMonthCarouselOptions,
  planningMonthCarouselViewportClassName,
  planningMonthCardWidthClassName,
  planningMonthNavButtonClassName,
} from '../lib/planningMonthSwitcherLayout'
import { usePlanningMonthCarousel } from '../model/usePlanningMonthCarousel'

import { PlanningMonthCard } from './PlanningMonthCard'

export type PlanningMonthTimelineProps = {
  periodMonth: string
  periodLabels: Record<string, string>
  itemCounts: Record<string, number>
  onSelect: (periodMonth: string) => void
}

export function PlanningMonthTimeline({
  periodMonth,
  periodLabels,
  itemCounts,
  onSelect,
}: PlanningMonthTimelineProps) {
  const carousel = usePlanningMonthCarousel({ periodMonth, onSelect })

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={planningMonthNavButtonClassName}
        disabled={!carousel.canGoPrev}
        aria-label="Прокрутить карточки назад"
        onClick={carousel.goPrev}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>

      <Carousel
        className={planningMonthCarouselViewportClassName}
        setApi={carousel.setCarouselApi}
        opts={planningMonthCarouselOptions}
      >
        <CarouselContent className={planningMonthCarouselContentClassName}>
          {carousel.months.map((month, index) => (
            <CarouselItem
              key={`planning-month-slot-${index}`}
              className={cn(
                'shrink-0 basis-auto pl-0',
                planningMonthCardWidthClassName,
              )}
            >
              <PlanningMonthCard
                label={periodLabels[month] ?? formatPeriodMonthLabel(month)}
                planCount={itemCounts[month] ?? 0}
                active={month === periodMonth}
                onSelect={() => carousel.selectMonth(month)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <button
        type="button"
        className={planningMonthNavButtonClassName}
        disabled={!carousel.canGoNext}
        aria-label="Прокрутить карточки вперёд"
        onClick={carousel.goNext}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </div>
  )
}
