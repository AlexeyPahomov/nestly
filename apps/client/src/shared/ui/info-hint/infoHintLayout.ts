import { cn } from '@/shared/lib/utils'

/** Оболочка popover/tooltip — как у «Подробнее» в потоке ликвидности. */
export const infoHintContentShellClassName =
  'w-[min(20rem,calc(100vw-2rem))] sm:w-80 text-sm'

export const infoHintPopoverContentClassName = infoHintContentShellClassName

/** Desktop: карточка popover вместо тёмного tooltip. */
export const infoHintTooltipContentClassName = cn(
  infoHintContentShellClassName,
  'inline-flex max-w-none flex-col items-stretch gap-0 rounded-lg border-0 bg-popover p-2.5 font-normal text-zinc-600 shadow-md ring-1 ring-foreground/10',
)

export const infoHintTextClassName = 'text-zinc-600'

export const infoHintButtonClassName =
  'inline-flex size-5 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 aria-expanded:bg-zinc-100 aria-expanded:text-zinc-600'

export const infoHintIconClassName = 'size-3.5'

/** Строка заголовка: текст слева, info прижат к правому padding контейнера. */
export const infoHintTitleRowClassName =
  'flex w-full items-center justify-between gap-2'

export const infoHintTitleTextClassName = 'min-w-0'
