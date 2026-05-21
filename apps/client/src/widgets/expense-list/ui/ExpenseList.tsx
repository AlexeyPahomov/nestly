import { ExpenseCard } from '@/entities/expense/ui/ExpenseCard';
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
}: ExpenseListProps) {
  return (
    <ItemsList
      className={cn('min-h-0', className)}
      isPending={isPending}
      isError={isError}
      error={error}
      data={expenses}
      isFetching={isFetching}
      title="История расходов"
      emptyMessage="Пока нет расходов. Добавьте первую трату выше."
      errorFallback="Не удалось загрузить расходы"
      listClassName="space-y-2"
    >
      {(items) =>
        items.map((item) => (
          <li key={item.id}>
            <ExpenseCard
              expense={item}
              categoryName={item.categoryName}
              categoryType={item.categoryType}
              isEditing={editingExpenseId === item.id}
              isDeleting={deletingExpenseId === item.id}
              onEdit={onEdit ? () => onEdit(item) : undefined}
              onDelete={onDelete ? () => onDelete(item.id) : undefined}
            />
          </li>
        ))
      }
    </ItemsList>
  );
}
