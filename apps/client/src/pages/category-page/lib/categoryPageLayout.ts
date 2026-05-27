import { mobilePageScrollShellClassName } from '@/shared/lib/mobilePageScrollShell'

export const categoryPageShellClassName = mobilePageScrollShellClassName()

/** Список категорий на мобилке растёт по контенту, скролл — у оболочки страницы. */
export const categoryPageListShellClassName =
  'max-md:shrink-0 max-md:flex-none'
