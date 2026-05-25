import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { CarouselApi } from '@/shared/ui'

import {
  buildPlanningCarouselMonths,
  getPlanningCarouselCenterIndex,
} from '../lib/buildPlanningCarouselMonths'

type UsePlanningMonthCarouselParams = {
  periodMonth: string
  onSelect: (periodMonth: string) => void
}

export function usePlanningMonthCarousel({
  periodMonth,
  onSelect,
}: UsePlanningMonthCarouselParams) {
  const months = buildPlanningCarouselMonths(periodMonth)
  const centerIndex = getPlanningCarouselCenterIndex(months, periodMonth)
  const monthsKey = months.join('|')

  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const monthsRef = useRef(months)
  const periodMonthRef = useRef(periodMonth)
  const onSelectRef = useRef(onSelect)
  const centerIndexRef = useRef(centerIndex)

  monthsRef.current = months
  periodMonthRef.current = periodMonth
  onSelectRef.current = onSelect
  centerIndexRef.current = centerIndex

  const syncScrollState = useCallback((api: CarouselApi | undefined) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const alignToCenter = useCallback((api: CarouselApi | undefined) => {
    if (!api) {
      return
    }

    const index = centerIndexRef.current
    if (api.selectedScrollSnap() !== index) {
      api.scrollTo(index, false)
    }

    syncScrollState(api)
  }, [syncScrollState])

  useLayoutEffect(() => {
    alignToCenter(carouselApi)
  }, [carouselApi, periodMonth, monthsKey, alignToCenter])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const onSnap = () => syncScrollState(carouselApi)
    const onReInit = () => alignToCenter(carouselApi)

    carouselApi.on('select', onSnap)
    carouselApi.on('reInit', onReInit)
    syncScrollState(carouselApi)

    return () => {
      carouselApi.off('select', onSnap)
      carouselApi.off('reInit', onReInit)
    }
  }, [carouselApi, alignToCenter, syncScrollState])

  const selectMonth = useCallback((month: string) => {
    if (month === periodMonthRef.current) {
      return
    }

    onSelectRef.current(month)
  }, [])

  const goPrev = useCallback(() => {
    carouselApi?.scrollPrev()
  }, [carouselApi])

  const goNext = useCallback(() => {
    carouselApi?.scrollNext()
  }, [carouselApi])

  return {
    months,
    setCarouselApi,
    selectMonth,
    goPrev,
    goNext,
    canGoPrev: canScrollPrev,
    canGoNext: canScrollNext,
  }
}
