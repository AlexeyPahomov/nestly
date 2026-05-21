import type { ReactNode, UIEventHandler } from 'react';

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
  onListScroll?: UIEventHandler<HTMLUListElement>;
  onTitleClick?: () => void;
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
  onListScroll,
  onTitleClick,
}: CategoryBudgetListProps) {
  return (
    <ItemsList
      className={className}
      onTitleClick={onTitleClick}
      onListScroll={onListScroll}
      listClassName="grid w-full grid-cols-1 items-stretch gap-3 space-y-0 sm:grid-cols-2 lg:grid-cols-3"
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
              'flex h-full w-full min-w-0 flex-col',
              listItemHighlightBaseClassName,
              isSavingsCategory(item.category.type) &&
                'sm:col-span-2 lg:col-span-3',
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
