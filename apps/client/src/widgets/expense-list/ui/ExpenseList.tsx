import { useMemo, useState, type UIEventHandler } from 'react';

import { ExpenseCard } from '@/entities/expense/ui/ExpenseCard';
import {
  listItemHighlightActiveClassName,
  listItemHighlightBaseClassName,
} from '@/shared/config/listHighlight';
import { cn } from '@/shared/lib/utils';
import { ItemsList } from '@/shared/ui';

import { filterExpensesByCategoryAndMonth } from '../lib/filterExpenses';
import { EXPENSE_LIST_PAGE_SIZE } from '../lib/expenseListPageSize';
import type { ExpenseListItem } from '../model/types';

import {
  ExpenseListToolbar,
  type ExpenseListViewMode,
} from './ExpenseListToolbar';

export interface ExpenseListProps {
  expenses?: ExpenseListItem[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isFetching?: boolean;
  className?: string;
  monthFilter: string;
  editingExpenseId?: string | null;
  deletingExpenseId?: string | null;
  onEdit?: (item: ExpenseListItem) => void;
  onDelete?: (id: string) => void;
  onListScroll?: UIEventHandler<HTMLUListElement>;
  onTitleClick?: () => void;
  bodyCollapsed?: boolean;
  /** `all` или id категории (задаётся снаружи, например кликом по карточке). */
  categoryFilter?: string;
}

export function ExpenseList({
  expenses,
  isPending,
  isError,
  error,
  isFetching = false,
  className,
  monthFilter,
  editingExpenseId = null,
  deletingExpenseId = null,
  onEdit,
  onDelete,
  onListScroll,
  onTitleClick,
  bodyCollapsed = false,
  categoryFilter = 'all',
}: ExpenseListProps) {
  const [viewMode, setViewMode] = useState<ExpenseListViewMode>('list');

  const filteredExpenses = useMemo(
    () =>
      filterExpensesByCategoryAndMonth(
        expenses ?? [],
        categoryFilter,
        monthFilter,
      ),
    [expenses, categoryFilter, monthFilter],
  );

  const visibleExpenses = useMemo(
    () => filteredExpenses.slice(0, EXPENSE_LIST_PAGE_SIZE),
    [filteredExpenses],
  );

  return (
    <ItemsList
      className={cn('min-h-0 overflow-hidden', className)}
      bodyCollapsed={bodyCollapsed}
      onTitleClick={onTitleClick}
      onListScroll={onListScroll}
      isPending={isPending}
      isError={isError}
      error={error}
      data={viewMode === 'list' ? visibleExpenses : []}
      isFetching={isFetching}
      title="История расходов"
      headerEnd={
        <ExpenseListToolbar viewMode={viewMode} onViewModeChange={setViewMode} />
      }
      emptyMessage={
        viewMode === 'chart'
          ? 'График расходов появится в следующих версиях.'
          : 'Пока нет расходов за выбранный период.'
      }
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
                categoryIcon={item.categoryIcon}
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
