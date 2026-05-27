import {
  mobilePageScrollPaddingClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

export const planningPageSectionClassName = 'gap-4 md:gap-6'

export const planningPageContentClassName = [
  scrollAreaClassName,
  mobilePageScrollPaddingClassName,
  'flex min-h-0 flex-1 flex-col gap-4 md:gap-6',
  mobileFabScrollReserveClassName,
].join(' ')

/** На мобилке — в общем скролле страницы; на десктопе — flex для внутреннего скролла списка. */
export const planningPagePlansSectionClassName =
  'flex shrink-0 flex-col md:min-h-0 md:flex-1'

export const planningPagePlannedListScrollClassName =
  'coffer-scroll-list max-md:max-h-none max-md:overflow-visible md:max-h-[min(28rem,50vh)] md:overflow-y-auto'
