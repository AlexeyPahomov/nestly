import { cn } from '@/shared/lib/utils'
import { mobilePageScrollShellClassName } from '@/shared/lib/mobilePageScrollShell'
import { scrollAreaClassName } from '@/shared/lib/scrollLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

/** MonthPicker в шапке страницы. */
export const expensePageMonthPickerClassName =
  'w-auto [&_[data-slot=select-trigger]]:h-9 [&_[data-slot=select-trigger]]:rounded-lg [&_[data-slot=select-trigger]]:bg-transparent [&_[data-slot=select-trigger]]:px-2.5 [&_[data-slot=select-trigger]]:text-base [&_[data-slot=select-trigger]]:font-semibold hover:[&_[data-slot=select-trigger]]:bg-zinc-100'

export const expensePageMonthPickerIconClassName =
  'size-4 shrink-0 text-zinc-500 opacity-60'

export const expensePageToolbarClassName =
  'max-md:flex-col max-md:items-stretch'

/** Меньше зазор между month picker и контентом страницы на мобилке. */
export const expensePageSectionClassName = 'max-md:gap-2'

/** Сводка метрик: inset под ring; справа pe-2 (у shell на мобилке pe-0). */
export const expensePageBudgetSectionClassName = cn(
  'shrink-0',
  'ps-px pe-px max-md:pe-2 md:ps-0.5 md:pe-0.5 md:pt-0.5',
)

/** Оболочка страницы: на мобилке метрики фиксированы, скролл — только в work-scroll. */
export const expensePageShellClassName = mobilePageScrollShellClassName({
  className: cn(
    'gap-4 max-md:gap-2',
    'max-md:overflow-hidden max-md:overscroll-none max-md:pb-0 max-md:pe-0',
  ),
})

/** Область табов на мобилке без скролла; на десктопе — `contents`. */
export const expensePageShellWorkScrollClassName = cn(
  'flex min-h-0 flex-1 flex-col',
  'max-md:min-h-0 max-md:overflow-hidden',
  'md:contents',
)

/** Скролл только тела активного таба (под шапкой табов). */
export const expensePageTabPanelScrollClassName = cn(
  'flex h-full min-h-0 w-full min-w-0 flex-col',
  scrollAreaClassName,
  mobileFabScrollReserveClassName,
  'overflow-y-auto overscroll-y-auto',
  'max-md:ps-px max-md:pt-px max-md:pe-2 max-md:pb-8',
  'max-md:[&_ul>li]:ring-offset-0',
  'md:pt-0.5 md:ps-px md:pe-0',
)

/** Категории + история — на оставшуюся высоту экрана. */
export const expensePageWorkAreaClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-4 max-md:min-h-0 max-md:gap-0',
)

export const expensePageWorkAreaDesktopClassName =
  'hidden min-h-0 flex-1 flex-col gap-4 md:flex'

/** Список внутри вкладки — меньше зазор между шапкой и телом. */
export const expensePageListInTabClassName = 'gap-1'

/**
 * Отступ от линии табов до списка, если шапки ItemsList нет
 * (на «Категориях» тот же зазор даёт gap-3 между шапкой и телом).
 */
export const expensePageTabListTopInsetClassName = 'max-md:pt-3'

/** Оболочка списка в табе: не задаёт высоту, чтобы скролл был у панели. */
export const expensePageTabListShellClassName =
  'flex w-full flex-col overflow-visible'

export const expensePageTabListShellWithTopInsetClassName = cn(
  expensePageTabListShellClassName,
  expensePageTabListTopInsetClassName,
)

export type ExpensePageWorkPanelSlide = 'categories' | 'history'

export function getExpensePagePanelClassName(
  slide: ExpensePageWorkPanelSlide,
  inTab: boolean,
) {
  if (inTab) {
    return expensePageTabPanelScrollClassName
  }

  return slide === 'categories'
    ? expensePageCategoriesPaneClassName
    : expensePageExpensesPaneClassName
}

export function getExpensePageHistoryListClassName(inTab: boolean) {
  return inTab ? expensePageListInTabClassName : expensePageExpensesListClassName
}

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
