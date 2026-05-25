import { cn } from '@/shared/lib/utils';

import { categoryBudgetCardHeightRem } from './categoryBudgetCardLayout';

/** `gap-2` между рядами сетки. */
const categoryBudgetGridRowGapRem = 0.5;

export const categoryBudgetListMaxVisibleRows = 2;

/** Два ряда карточек + один межрядный зазор (9.5×2 + 0.5 = 19.5rem). */
export const categoryBudgetListTwoRowMaxHeightRem =
  categoryBudgetListMaxVisibleRows * categoryBudgetCardHeightRem +
  (categoryBudgetListMaxVisibleRows - 1) * categoryBudgetGridRowGapRem;

/** Сетка карточек конвертов в списке «По категориям». */
export const categoryBudgetListGridClassName =
  'grid w-full auto-rows-min grid-cols-1 items-start gap-2 space-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

const categoryBudgetListGridTwoRowScrollClassName = cn(
  'nestly-scroll-list min-h-0 max-h-[19.5rem] overflow-y-auto overscroll-y-contain [overflow-anchor:none]',
);

/** Оболочка списка: шапка + не более двух рядов сетки (история развёрнута). */
export const categoryBudgetListCompactShellClassName =
  'flex w-full max-h-[22.75rem] shrink-0 flex-col overflow-hidden'

export function getCategoryBudgetListGridClassName(limitToTwoRows = false) {
  if (!limitToTwoRows) {
    return categoryBudgetListGridClassName;
  }

  return cn(
    categoryBudgetListGridClassName,
    categoryBudgetListGridTwoRowScrollClassName,
  );
}
