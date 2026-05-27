import { cn } from '@/shared/lib/utils'
import { mobilePageScrollShellClassName } from '@/shared/lib/mobilePageScrollShell'

/** MonthPicker в шапке страницы. */
export const expensePageMonthPickerClassName =
  'w-auto [&_[data-slot=select-trigger]]:h-9 [&_[data-slot=select-trigger]]:rounded-lg [&_[data-slot=select-trigger]]:bg-transparent [&_[data-slot=select-trigger]]:px-2.5 [&_[data-slot=select-trigger]]:text-base [&_[data-slot=select-trigger]]:font-semibold hover:[&_[data-slot=select-trigger]]:bg-zinc-100'

export const expensePageToolbarTitleEndClassName =
  'flex shrink-0 items-center gap-2'

/** Оболочка страницы: казна + категории по контенту + история на остаток высоты. */
export const expensePageShellClassName = mobilePageScrollShellClassName({
  className: 'gap-4',
})

/** Категории + история — на оставшуюся высоту экрана. */
export const expensePageWorkAreaClassName =
  'flex min-h-0 flex-1 flex-col gap-4 max-md:shrink-0 max-md:flex-none'

const expensePagePaneClassName = 'flex min-h-0 min-w-0 flex-col'

export const expensePageCategoriesPaneClassName = cn(
  expensePagePaneClassName,
  'max-md:shrink-0 max-md:grow-0 max-md:basis-auto',
  'md:max-h-full md:shrink-0 md:grow-0 md:basis-auto md:overflow-hidden',
)

export const expensePageExpensesPaneClassName = cn(
  expensePagePaneClassName,
  'max-md:shrink-0 max-md:grow-0 max-md:basis-auto max-md:overflow-visible',
  'md:min-h-0 md:flex-1 md:overflow-hidden',
)

export const expensePageExpensesListClassName =
  'max-md:overflow-visible md:min-h-0 md:flex-1'

export function getExpensePageShellClassName(className?: string) {
  return cn(expensePageShellClassName, className)
}
