import { cn } from '@/shared/lib/utils'
import { scrollAreaClassName } from '@/shared/lib/scrollLayout'

/** Отступы скролла страницы расходов (ps сохранён на md — ring карточек не обрезается). */
const expensePageScrollPaddingClassName =
  'pb-8 pe-2 ps-0.5 md:pb-0 md:pe-0 md:ps-0.5'

/** Оболочка страницы: казна + категории по контенту + история на остаток высоты. */
export const expensePageShellClassName = [
  scrollAreaClassName,
  expensePageScrollPaddingClassName,
  'flex min-h-0 flex-1 flex-col gap-4',
].join(' ')

/** Категории + история — на оставшуюся высоту экрана. */
export const expensePageWorkAreaClassName =
  'flex min-h-0 flex-1 flex-col gap-4 max-md:shrink-0 max-md:flex-none'

const expensePagePaneClassName = 'flex min-h-0 min-w-0 flex-col'

/** Категории: высота по сетке карточек (до двух рядов), при переполнении — скролл внутри списка. */
const expensePageCategoriesPaneDesktopClassName =
  'max-h-full shrink-0 grow-0 basis-auto overflow-hidden'

/** История расходов занимает оставшуюся высоту рабочей области. */
const expensePageExpensesPaneDesktopClassName = 'min-h-0 flex-1 overflow-hidden'

const expensePagePaneMobileClassName = 'shrink-0 grow-0 basis-auto'

export function getExpensePageShellClassName(className?: string) {
  return cn(expensePageShellClassName, className)
}

export function getExpensePagePaneClassNames(isMobile: boolean) {
  if (isMobile) {
    return {
      categories: cn(expensePagePaneClassName, expensePagePaneMobileClassName),
      expenses: cn(expensePagePaneClassName, expensePagePaneMobileClassName),
    }
  }

  return {
    categories: cn(
      expensePagePaneClassName,
      expensePageCategoriesPaneDesktopClassName,
    ),
    expenses: cn(
      expensePagePaneClassName,
      expensePageExpensesPaneDesktopClassName,
    ),
  }
}
