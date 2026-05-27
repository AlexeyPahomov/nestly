import { cn } from '@/shared/lib/utils'
import {
  mobilePageScrollPaddingClassName,
  scrollAreaClassName,
} from '@/shared/lib/scrollLayout'
import {
  fabDesktopAddButtonClassName,
  mobileFabScrollReserveClassName,
} from '@/shared/ui/fab'

/** Зазор между шапкой страницы и прокручиваемым контентом. */
export const expensePageSectionClassName = 'min-h-0 gap-3 md:gap-4'

export const expensePageAddButtonDesktopClassName = fabDesktopAddButtonClassName

/** MonthPicker в шапке страницы / блока казны. */
export const expensePageMonthPickerClassName =
  'w-auto [&_button]:h-9 [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-2.5 [&_button]:text-base [&_button]:font-semibold [&_button]:shadow-none hover:[&_button]:bg-zinc-100'

export const expensePageMonthPickerPageHeaderClassName = 'hidden md:block'

export const expensePageMonthPickerBudgetHeaderClassName = 'md:hidden'

/** Строка MonthPicker над блоком казны (мобилка). */
export const expensePageBudgetHeaderClassName =
  'flex justify-end md:hidden'

export const expensePageToolbarClassName =
  'flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4'

/** Оболочка страницы: казна + категории по контенту + история на остаток высоты. */
export const expensePageShellClassName = [
  scrollAreaClassName,
  mobilePageScrollPaddingClassName,
  mobileFabScrollReserveClassName,
  'flex min-h-0 flex-1 flex-col gap-4',
].join(' ')

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
