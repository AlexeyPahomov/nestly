import type { CarouselOptions } from '@/shared/ui/carousel/carousel-context';

/** Ширина одной карточки месяца в карусели. */
export const planningMonthCardWidthClassName = 'w-[7.25rem] sm:w-[9rem]';

/**
 * Viewport: на мобилке — вся доступная ширина; на десктопе ~3 карточки.
 */
export const planningMonthCarouselViewportClassName =
  'min-w-0 flex-1 overflow-hidden sm:w-[29rem] sm:shrink-0';

export const planningMonthTimelineClassName =
  'flex w-full min-w-0 items-center gap-1.5 sm:gap-2';

/** Отступ между слайдами (flex gap на CarouselContent). */
export const planningMonthCarouselContentClassName = 'ml-0 gap-3';

export const planningMonthCarouselOptions: CarouselOptions = {
  align: 'center',
  duration: 32,
  skipSnaps: false,
  containScroll: 'trimSnaps',
  slidesToScroll: 1,
};

/** Как на странице «Расходы»: кнопки outline / toolbar — rounded-lg. */
export const planningMonthNavButtonClassName =
  'flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40';

/** Карточка месяца в переключателе (rounded-lg, как Card / кнопки расходов). */
export function planningMonthCardClassName(active: boolean): string {
  const size =
    'min-w-[7.25rem] flex-col items-center gap-0.5 px-3 py-2 text-center sm:min-w-[9rem] sm:px-4';

  return active
    ? `${size} rounded-lg border border-zinc-900 bg-zinc-900 text-white shadow-sm hover:border-zinc-900 hover:bg-zinc-900`
    : `${size} rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-colors hover:bg-zinc-50`;
}
