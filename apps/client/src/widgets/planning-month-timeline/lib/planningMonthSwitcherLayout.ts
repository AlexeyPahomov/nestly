import type { CarouselOptions } from '@/shared/ui/carousel/carousel-context'

/** Ширина одной карточки месяца в карусели. */
export const planningMonthCardWidthClassName = 'w-[9rem]'

/**
 * Viewport: ~2 карточки + край третьей — достаточно для скролла Embla.
 */
export const planningMonthCarouselViewportClassName =
  'w-[29rem] shrink-0 overflow-hidden'

/** Отступ между слайдами (flex gap на CarouselContent). */
export const planningMonthCarouselContentClassName = 'ml-0 gap-3'

export const planningMonthCarouselOptions: CarouselOptions = {
  align: 'center',
  duration: 32,
  skipSnaps: false,
  containScroll: 'trimSnaps',
  slidesToScroll: 1,
}

/** Как на странице «Расходы»: кнопки outline / toolbar — rounded-lg. */
export const planningMonthNavButtonClassName =
  'flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40'

/** Карточка месяца в переключателе (rounded-lg, как Card / кнопки расходов). */
export function planningMonthCardClassName(active: boolean): string {
  return active
    ? 'min-w-[9rem] flex-col items-center gap-1 rounded-lg border border-zinc-900 bg-zinc-900 px-5 py-3 text-center text-white shadow-sm hover:bg-zinc-900 hover:border-zinc-900'
    : 'min-w-[9rem] flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-center text-zinc-900 transition-colors hover:bg-zinc-50'
}
