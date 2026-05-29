import { cn } from '@/shared/lib/utils'
import {
  pageScrollRingInsetClassName,
  safariIosFlexFillClassName,
} from '@/shared/lib/scrollLayout'
import { contentTransitionOutletShellClassName } from '@/shared/ui/content-transition/contentTransitionLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

/** Оболочка страницы: на мобилке скролл только у списка планов (как на «Бюджет»). */
export const planningPageShellClassName = cn(
  'flex min-h-0 flex-1 flex-col',
  'max-md:overflow-hidden max-md:overscroll-none',
  safariIosFlexFillClassName,
)

/** Смена месяца: фиксированная высота flex-области под шапкой. */
export const planningPageMonthTransitionClassName = cn(
  contentTransitionOutletShellClassName,
  'min-h-0 flex-1',
  safariIosFlexFillClassName,
)

/** Тело месяца: на md — прокрутка всей области; на мобилке — без внешнего скролла. */
export const planningPageMonthBodyClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-4 max-md:min-h-0 max-md:gap-2',
  'max-md:overflow-hidden max-md:overscroll-none',
  'md:gap-6 md:overflow-y-auto md:overscroll-y-auto',
  'md:coffer-scroll-list md:[overflow-anchor:none]',
  pageScrollRingInsetClassName,
  'max-md:pe-0',
)

/** Занимает оставшуюся высоту; список скроллится внутри карточки. */
export const planningPagePlansSectionClassName = cn(
  'flex min-h-0 flex-1 flex-col overflow-hidden',
  'max-md:min-h-0 max-md:basis-0',
)

export const planningPagePlannedListBodyClassName = cn(
  mobileFabScrollReserveClassName,
  'max-md:min-h-0 max-md:flex-1',
  'md:max-h-[min(28rem,50vh)]',
)
