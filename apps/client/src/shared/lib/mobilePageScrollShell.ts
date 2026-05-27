import { cn } from '@/shared/lib/utils'
import {
  mobilePageScrollPaddingClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

type MobilePageScrollShellOptions = {
  className?: string
}

/** Прокручиваемая оболочка страницы с FAB на мобилке. */
export function mobilePageScrollShellClassName({
  className,
}: MobilePageScrollShellOptions = {}) {
  return cn(
    scrollAreaClassName,
    mobilePageScrollPaddingClassName,
    mobileFabScrollReserveClassName,
    'flex min-h-0 flex-1 flex-col',
    className,
  )
}
