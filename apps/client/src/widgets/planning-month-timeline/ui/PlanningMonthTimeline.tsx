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
  planningMonthTimelineClassName,
} from '../lib/planningMonthSwitcherLayout'
import { usePlanningMonthCarousel } from '../model/usePlanningMonthCarousel'

import { PlanningMonthCard } from './PlanningMonthCard'

export type PlanningMonthTimelineProps = {
  periodMonth: string
  periodLabels: Record<string, string>
  itemCounts?: Record<string, number>
  itemSwatches?: Record<string, string[]>
  onSelect: (periodMonth: string) => void
  showMeta?: boolean
}

export function PlanningMonthTimeline({
  periodMonth,
  periodLabels,
  itemCounts = {},
  itemSwatches = {},
  onSelect,
  showMeta = true,
}: PlanningMonthTimelineProps) {
  const carousel = usePlanningMonthCarousel({ periodMonth, onSelect })

  return (
    <div className={planningMonthTimelineClassName}>
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
                swatches={itemSwatches[month] ?? []}
                active={month === periodMonth}
                onSelect={() => carousel.selectMonth(month)}
                showMeta={showMeta}
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
