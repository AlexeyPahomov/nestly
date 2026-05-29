import { cn } from '@/shared/lib/utils'
import {
  mobilePageScrollPaddingClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

/** Меньший отступ заголовок ↔ контент на мобилке. */
export const incomePageSectionClassName = 'max-md:gap-2'

/** Десктоп: высота ограничена, скролл в `ItemsList`. Мобилка: скролл оболочки страницы. */
export const incomePageShellClassName = cn(
  'flex min-h-0 flex-1 flex-col md:overflow-hidden',
  'max-md:coffer-scroll-list max-md:overflow-y-auto max-md:overscroll-y-auto',
  mobilePageScrollPaddingClassName,
  mobileFabScrollReserveClassName,
)

export const incomePageListShellClassName = cn(
  'flex min-h-0 flex-1 flex-col',
  'max-md:shrink-0 max-md:flex-none',
)

export const incomePageListClassName = 'min-h-0 flex-1 max-md:flex-none'
