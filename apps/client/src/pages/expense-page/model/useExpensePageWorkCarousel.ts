import { useCallback, useEffect, useState } from 'react'

import type { CarouselApi } from '@/shared/ui'

import { EXPENSE_PAGE_WORK_SLIDES } from '../lib/expensePageWorkAreaSlides'

export function useExpensePageWorkCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const syncIndex = () => {
      setActiveIndex(carouselApi.selectedScrollSnap())
    }

    carouselApi.on('select', syncIndex)
    carouselApi.on('reInit', syncIndex)
    syncIndex()

    return () => {
      carouselApi.off('select', syncIndex)
      carouselApi.off('reInit', syncIndex)
    }
  }, [carouselApi])

  const selectSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= EXPENSE_PAGE_WORK_SLIDES.length) {
        return
      }

      carouselApi?.scrollTo(index)
    },
    [carouselApi],
  )

  return {
    carouselApi,
    setCarouselApi,
    activeIndex,
    selectSlide,
  }
}
