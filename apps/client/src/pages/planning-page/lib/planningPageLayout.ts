import { cn } from '@/shared/lib/utils'
import {
  pageScrollRingInsetClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

export const planningPageContentClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-4 md:gap-6',
  pageScrollRingInsetClassName,
  scrollAreaClassName,
  'max-md:overflow-hidden max-md:overscroll-none max-md:pe-0 max-md:pb-0',
)

/** Занимает оставшуюся высоту; список скроллится внутри карточки. */
export const planningPagePlansSectionClassName =
  'flex min-h-0 flex-1 flex-col'

export const planningPagePlannedListBodyClassName = cn(
  mobileFabScrollReserveClassName,
  'md:max-h-[min(28rem,50vh)]',
)
