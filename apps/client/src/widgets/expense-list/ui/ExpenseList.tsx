import type { UIEventHandler } from 'react';

import { ExpenseCard } from '@/entities/expense/ui/ExpenseCard';
import {
  listItemHighlightActiveClassName,
  listItemHighlightBaseClassName,
} from '@/shared/config/listHighlight';
import { cn } from '@/shared/lib/utils';
import { ItemsList } from '@/shared/ui';

import type { ExpenseListItem } from '../model/types';

export interface ExpenseListProps {
  expenses?: ExpenseListItem[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isFetching?: boolean;
  className?: string;
  editingExpenseId?: string | null;
  deletingExpenseId?: string | null;
  onEdit?: (item: ExpenseListItem) => void;
  onDelete?: (id: string) => void;
  onListScroll?: UIEventHandler<HTMLUListElement>;
}

export function ExpenseList({
  expenses,
  isPending,
  isError,
  error,
  isFetching = false,
  className,
  editingExpenseId = null,
  deletingExpenseId = null,
  onEdit,
  onDelete,
  onListScroll,
}: ExpenseListProps) {
  return (
    <ItemsList
      className={cn('min-h-0', className)}
      onListScroll={onListScroll}
      isPending={isPending}
      isError={isError}
      error={error}
      data={expenses}
      isFetching={isFetching}
      title="История расходов"
      emptyMessage="Пока нет расходов. Добавьте первую трату выше."
      errorFallback="Не удалось загрузить расходы"
      listClassName="!space-y-2"
    >
      {(items) =>
        items.map((item) => {
          const isEditing = editingExpenseId === item.id;

          return (
          <li
            key={item.id}
            className={cn(
              listItemHighlightBaseClassName,
              isEditing && listItemHighlightActiveClassName,
            )}
          >
            <ExpenseCard
              expense={item}
              categoryName={item.categoryName}
              categoryType={item.categoryType}
              isDeleting={deletingExpenseId === item.id}
              onEdit={onEdit ? () => onEdit(item) : undefined}
              onDelete={onDelete ? () => onDelete(item.id) : undefined}
            />
          </li>
          );
        })
      }
    </ItemsList>
  );
}
