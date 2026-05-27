import { useCallback, useMemo, useState } from 'react';

import { useDeleteExpenseMutation } from '@/entities/expense/api/useDeleteExpenseMutation';
import type { Expense } from '@/entities/expense/model/types';
import type { ExpenseListItem } from '@/widgets/expense-list';
import { PageSection } from '@/shared/ui';

import { getExpensePageShellClassName } from '../lib/expensePageLayout';
import { toBudgetSnapshots } from '../lib/toBudgetSnapshots';
import { useExpensePageCategorySelection } from '../model/useExpensePageCategorySelection';
import { useExpensePageOutsideInteraction } from '../model/useExpensePageOutsideInteraction';
import { useExpensePage } from '../model/useExpensePage';

import { ExpensePageBudgetSection } from './ExpensePageBudgetSection';
import { ExpensePageToolbar } from './ExpensePageToolbar';
import { ExpensePageWorkArea } from './ExpensePageWorkArea';

export function ExpensePage() {
  const [stressCategoryId, setStressCategoryId] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const deleteExpenseMutation = useDeleteExpenseMutation();

  const {
    selectedCategoryId,
    setSelectedCategoryId,
    expenseCategories,
    incomes,
    allocations,
    allBudgetItems,
    budgetItems,
    periodMonth,
    setPeriodMonth,
    currentBudgetView,
    sortedExpenses,
    isBudgetPending,
    isBudgetError,
    budgetError,
    isBudgetFetching,
    expensesQuery,
  } = useExpensePage();

  const {
    expenseCategoryFilter,
    clearSelectedCategory,
    handleCategorySelect,
  } = useExpensePageCategorySelection({
    selectedCategoryId,
    setSelectedCategoryId,
  });

  useExpensePageOutsideInteraction({
    selectedCategoryId,
    onClearSelectedCategory: clearSelectedCategory,
  });

  const budgetSnapshots = useMemo(
    () => toBudgetSnapshots(allBudgetItems),
    [allBudgetItems],
  );

  const handleStressCategoryChange = useCallback(
    (categoryId: string | null) => {
      setStressCategoryId((prev) => (prev === categoryId ? prev : categoryId));
    },
    [],
  );

  const handleEditExpense = useCallback(
    (item: ExpenseListItem) => {
      setEditingExpense(item);
      setSelectedCategoryId(item.category_id);
    },
    [setSelectedCategoryId],
  );

  const handleDeleteExpense = useCallback(
    (id: string) => {
      if (editingExpense?.id === id) {
        setEditingExpense(null);
      }
      deleteExpenseMutation.mutate(id);
    },
    [deleteExpenseMutation, editingExpense?.id],
  );

  return (
    <PageSection
      header={
        <ExpensePageToolbar
          periodMonth={periodMonth}
          onPeriodMonthChange={setPeriodMonth}
        />
      }
    >
      <div className={getExpensePageShellClassName()}>
        <ExpensePageBudgetSection summary={currentBudgetView} />

        <ExpensePageWorkArea
          periodMonth={periodMonth}
          expenseCategories={expenseCategories}
          budgetSnapshots={budgetSnapshots}
          incomes={incomes}
          allocations={allocations}
          budgetItems={budgetItems}
          selectedCategoryId={selectedCategoryId}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
          stressCategoryId={stressCategoryId}
          onStressCategoryChange={handleStressCategoryChange}
          onCategorySelect={handleCategorySelect}
          isBudgetPending={isBudgetPending}
          isBudgetError={isBudgetError}
          budgetError={budgetError}
          isBudgetFetching={isBudgetFetching}
          sortedExpenses={sortedExpenses}
          expenseCategoryFilter={expenseCategoryFilter}
          expensesQuery={expensesQuery}
          editingExpenseId={editingExpense?.id ?? null}
          deletingExpenseId={
            deleteExpenseMutation.isPending
              ? (deleteExpenseMutation.variables ?? null)
              : null
          }
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </PageSection>
  );
}
