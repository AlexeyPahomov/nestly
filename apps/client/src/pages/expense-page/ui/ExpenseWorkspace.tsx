import type { Allocation } from '@/entities/allocation/model/types';
import type { Category } from '@/entities/category/model/types';
import type { Expense } from '@/entities/expense/model/types';
import type { Income } from '@/entities/income/model/types';
import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget';
import { ExpenseFormDialog } from '@/features/create-expense/ui/ExpenseFormDialog';
import { cn } from '@/shared/lib/utils';
import { AddButton } from '@/shared/ui';
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList';
import type { CategoryBudgetItem } from '@/entities/budget/model/types';
import { categoryBudgetListCompactShellClassName } from '@/widgets/category-budget-list/lib/categoryBudgetListLayout';
import { CategoryBudgetList } from '@/widgets/category-budget-list';

import { useExpenseFormDialog } from '../model/useExpenseFormDialog';

type ExpenseWorkspaceProps = {
  categories: Category[];
  budgets: CategoryBudgetSnapshot[];
  incomes: Income[];
  allocations: Allocation[];
  budgetItems: CategoryBudgetItem[];
  selectedCategoryId: string | null;
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
  stressCategoryId: string | null;
  onStressCategoryChange: (categoryId: string | null) => void;
  onCategorySelect: (categoryId: string) => void;
  isBudgetPending: boolean;
  isBudgetError: boolean;
  budgetError: unknown;
  isBudgetFetching: boolean;
  listLayout?: ItemsListLayout;
};

export function ExpenseWorkspace({
  categories,
  budgets,
  incomes,
  allocations,
  budgetItems,
  selectedCategoryId,
  editingExpense = null,
  onCancelEdit,
  stressCategoryId,
  onStressCategoryChange,
  onCategorySelect,
  isBudgetPending,
  isBudgetError,
  budgetError,
  isBudgetFetching,
  listLayout = 'fill',
}: ExpenseWorkspaceProps) {
  const dialog = useExpenseFormDialog(editingExpense, onCancelEdit);
  const categoriesCompact = listLayout === 'fill';

  return (
    <div
      className={cn(
        'flex w-full flex-col',
        listLayout === 'fill' ? 'min-h-0 overflow-hidden' : 'overflow-visible',
        categoriesCompact
          ? categoryBudgetListCompactShellClassName
          : listLayout === 'fill'
            ? 'min-h-0 flex-1'
            : '',
      )}
    >
      <CategoryBudgetList
        className={cn(
          'w-full',
          listLayout === 'fill' ? 'min-h-0 flex-1 overflow-hidden' : '',
        )}
        layout={listLayout}
        limitToTwoRows={categoriesCompact}
        budgetItems={budgetItems}
        isPending={isBudgetPending}
        isError={isBudgetError}
        error={budgetError}
        isFetching={isBudgetFetching}
        selectedCategoryId={selectedCategoryId}
        stressCategoryId={stressCategoryId}
        onCategorySelect={onCategorySelect}
        headerEnd={
          <AddButton onClick={dialog.openForAdd}>Добавить расход</AddButton>
        }
      />

      <ExpenseFormDialog
        open={dialog.isOpen}
        onOpenChange={dialog.onOpenChange}
        isEditing={dialog.isEditing}
        onClose={dialog.close}
        categories={categories}
        budgets={budgets}
        incomes={incomes}
        allocations={allocations}
        selectedCategoryId={selectedCategoryId ?? undefined}
        editingExpense={editingExpense}
        onStressCategoryChange={onStressCategoryChange}
      />
    </div>
  );
}
