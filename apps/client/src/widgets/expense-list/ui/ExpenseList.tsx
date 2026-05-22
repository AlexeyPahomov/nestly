import { useEffect, useMemo, useState, type UIEventHandler } from 'react';

import type { Category } from '@/entities/category/model/types';
import { ExpenseCard } from '@/entities/expense/ui/ExpenseCard';
import {
  listItemHighlightActiveClassName,
  listItemHighlightBaseClassName,
} from '@/shared/config/listHighlight';
import { cn } from '@/shared/lib/utils';
import { ItemsList } from '@/shared/ui';

import { filterExpensesByCategoryAndMonth } from '../lib/filterExpenses';
import type { ExpenseListItem } from '../model/types';

import {
  ExpenseListToolbar,
  type ExpenseListViewMode,
} from './ExpenseListToolbar';

const PAGE_SIZE = 8;

export interface ExpenseListProps {
  expenses?: ExpenseListItem[];
  categories?: Category[];
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
}

export function ExpenseList({
  expenses,
  categories = [],
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
}: ExpenseListProps) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ExpenseListViewMode>('list');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [monthFilter]);

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
    () => filteredExpenses.slice(0, visibleCount),
    [filteredExpenses, visibleCount],
  );

  const headerAddon = (
    <ExpenseListToolbar
      categories={categories}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={(value) => {
        setCategoryFilter(value);
        setVisibleCount(PAGE_SIZE);
      }}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    />
  );

  return (
    <ItemsList
      className={cn('min-h-0', className)}
      onTitleClick={onTitleClick}
      onListScroll={onListScroll}
      isPending={isPending}
      isError={isError}
      error={error}
      data={viewMode === 'list' ? visibleExpenses : []}
      isFetching={isFetching}
      title="История расходов"
      headerAddon={headerAddon}
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
