export const allocationPageMainClassName =
  'flex min-h-0 flex-1 flex-col gap-6 max-md:gap-2 max-md:overflow-y-auto max-md:pb-2'

export const allocationPageListClassName =
  'flex min-h-0 flex-1 flex-col max-md:flex-none max-md:pb-[calc(4.75rem+env(safe-area-inset-bottom))]'

/** Блок «Осталось»: ниже 460px подпись справа — отдельной строкой на всю ширину. */
export const remainingBalanceCardBodyClassName =
  'grid grid-cols-[1fr_auto] items-center gap-4 max-[460px]:grid-rows-[auto_auto] max-[460px]:gap-3'

export const remainingBalanceCardMetaRowClassName = 'flex items-center gap-3'

export const remainingBalanceCardCaptionInlineClassName =
  'shrink-0 space-y-0.5 text-right max-[460px]:hidden'

export const remainingBalanceCardCaptionStackedClassName =
  'hidden max-[460px]:col-span-2 max-[460px]:flex max-[460px]:flex-wrap gap-x-1 text-sm'
