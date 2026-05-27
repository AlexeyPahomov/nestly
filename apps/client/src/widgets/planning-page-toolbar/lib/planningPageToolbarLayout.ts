import { cn } from '@/shared/lib/utils'
import { fabDesktopAddButtonClassName } from '@/shared/ui/fab'

export const planningPageToolbarClassName =
  'flex w-full shrink-0 flex-col gap-3 md:gap-6'

export const planningPageToolbarRowClassName =
  'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4'

export const planningPageAddButtonDesktopClassName = cn(
  fabDesktopAddButtonClassName,
  'w-full md:w-auto',
)
