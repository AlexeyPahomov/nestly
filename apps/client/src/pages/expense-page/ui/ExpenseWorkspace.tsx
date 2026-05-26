import type { UIEventHandler } from 'react';

import type { Allocation } from '@/entities/allocation/model/types';
import type { Category } from '@/entities/category/model/types';
import type { Expense } from '@/entities/expense/model/types';
import type { Income } from '@/entities/income/model/types';
import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget';
import { ExpenseFormDialog } from '@/features/create-expense/ui/ExpenseFormDialog';
import { cn } from '@/shared/lib/utils';
import { Button, primaryActionButtonClassName } from '@/shared/ui';
import type { CategoryBudgetItem } from '@/entities/budget/model/types';
import { categoryBudgetListCompactShellClassName } from '@/widgets/category-budget-list/lib/categoryBudgetListLayout';
import { CategoryBudgetList } from '@/widgets/category-budget-list';

import type { ExpensePagePaneBoost } from '../lib/expensePageLayout';
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
  onBudgetListScroll?: UIEventHandler<HTMLUListElement>;
  onTitleClick?: () => void;
  expensesHistoryCollapsed?: boolean;
  paneBoost?: ExpensePagePaneBoost;
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
  onBudgetListScroll,
  onTitleClick,
  expensesHistoryCollapsed = false,
  paneBoost = 'none',
}: ExpenseWorkspaceProps) {
  const dialog = useExpenseFormDialog(editingExpense, onCancelEdit);
  const categoriesCompact = !expensesHistoryCollapsed && paneBoost === 'none';

  return (
    <div
      className={cn(
        'flex min-h-0 w-full flex-col overflow-hidden',
        categoriesCompact
          ? categoryBudgetListCompactShellClassName
          : 'min-h-0 flex-1',
      )}
    >
      <CategoryBudgetList
        className="min-h-0 w-full flex-1 overflow-hidden"
        limitToTwoRows={categoriesCompact || paneBoost === 'expenses'}
        onTitleClick={onTitleClick}
        onListScroll={onBudgetListScroll}
        budgetItems={budgetItems}
        isPending={isBudgetPending}
        isError={isBudgetError}
        error={budgetError}
        isFetching={isBudgetFetching}
        selectedCategoryId={selectedCategoryId}
        stressCategoryId={stressCategoryId}
        onCategorySelect={onCategorySelect}
        headerEnd={
          <Button
            type="button"
            size="lg"
            className={primaryActionButtonClassName}
            onClick={dialog.openForAdd}
          >
            Добавить расход
          </Button>
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
