import type { ReactNode } from 'react';

import { isSavingsCategory } from '@/entities/category/lib/categoryKind';
import {
  listItemHighlightActiveClassName,
  listItemHighlightBaseClassName,
} from '@/shared/config/listHighlight';
import { cn } from '@/shared/lib/utils';
import { ItemsList } from '@/shared/ui';

import type { CategoryBudgetListItem } from '../model/types';

import { CategoryBudgetCard } from './CategoryBudgetCard';

export type CategoryBudgetListProps = {
  budgetItems?: CategoryBudgetListItem[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isFetching?: boolean;
  selectedCategoryId?: string | null;
  stressCategoryId?: string | null;
  onCategorySelect?: (categoryId: string) => void;
  headerEnd?: ReactNode;
  className?: string;
};

export function CategoryBudgetList({
  budgetItems,
  isPending,
  isError,
  error,
  isFetching = false,
  selectedCategoryId,
  stressCategoryId,
  onCategorySelect,
  headerEnd,
  className,
}: CategoryBudgetListProps) {
  return (
    <ItemsList
      className={className}
      listClassName="grid grid-cols-2 gap-3 space-y-0"
      isPending={isPending}
      isError={isError}
      error={error}
      data={budgetItems}
      isFetching={isFetching}
      title="По категориям"
      headerEnd={headerEnd}
      emptyMessage="Нет категорий расходов или накоплений."
      errorFallback="Не удалось загрузить бюджет"
    >
      {(items) =>
        items.map((item) => {
          const isSelected = selectedCategoryId === item.category.id;

          return (
          <li
            key={item.category.id}
            className={cn(
              'min-w-0',
              listItemHighlightBaseClassName,
              isSavingsCategory(item.category.type) && 'md:col-span-2',
              isSelected && listItemHighlightActiveClassName,
            )}
          >
            <CategoryBudgetCard
              item={item}
              stressOverBudget={stressCategoryId === item.category.id}
              onSelect={onCategorySelect}
            />
          </li>
          );
        })
      }
    </ItemsList>
  );
}
