import { cn } from '@/shared/lib/utils'
import { pageScrollRingInsetClassName } from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

/** Оболочка страницы: на мобилке шапка фиксирована, скролл — только у списка. */
export const allocationPageShellClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-6 max-md:gap-2',
  'max-md:overflow-hidden max-md:overscroll-none',
)

export const allocationPageHeaderClassName = 'shrink-0 space-y-4'

/** Область списка: скролл внутри ItemsList, не у оболочки (иначе обрезка карточек). */
export const allocationPageListScrollClassName =
  'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'

/** Отступы и резерв под FAB у прокручиваемого `<ul>`. */
export const allocationPageListUlClassName = cn(
  pageScrollRingInsetClassName,
  'max-md:pe-2 max-md:pb-8',
  mobileFabScrollReserveClassName,
)

/** Блок «Осталось»: ниже 460px подпись справа — отдельной строкой на всю ширину. */
export const remainingBalanceCardBodyClassName =
  'grid grid-cols-[1fr_auto] items-center gap-4 max-[460px]:grid-rows-[auto_auto] max-[460px]:gap-3'

export const remainingBalanceCardMetaRowClassName = 'flex items-center gap-3'

export const remainingBalanceCardCaptionInlineClassName =
  'shrink-0 space-y-0.5 text-right max-[460px]:hidden'

export const remainingBalanceCardCaptionStackedClassName =
  'hidden max-[460px]:col-span-2 max-[460px]:flex max-[460px]:flex-wrap gap-x-1 text-sm'

/** Карточка месяца в блоке «Доход по месяцам» (мобилка). */
export const allocationIncomeMonthCardMobileClassName =
  'max-md:h-11 max-md:min-h-11'

export const allocationIncomeMonthCardContentClassName =
  'max-md:flex max-md:h-full max-md:min-h-0 max-md:flex-col max-md:justify-center'
