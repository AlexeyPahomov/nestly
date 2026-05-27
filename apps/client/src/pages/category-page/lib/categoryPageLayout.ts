import { cn } from '@/shared/lib/utils'
import {
  mobilePageScrollPaddingClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

export const categoryPageSectionClassName = 'min-h-0 gap-3 md:gap-4'

export const categoryPageShellClassName = cn(
  scrollAreaClassName,
  mobilePageScrollPaddingClassName,
  mobileFabScrollReserveClassName,
  'flex min-h-0 flex-1 flex-col',
)

/** Список категорий на мобилке растёт по контенту, скролл — у оболочки страницы. */
export const categoryPageListShellClassName =
  'max-md:shrink-0 max-md:flex-none'
