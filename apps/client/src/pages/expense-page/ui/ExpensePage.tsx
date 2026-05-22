import { useCallback, useMemo, useState } from 'react';

import { useDeleteExpenseMutation } from '@/entities/expense/api/useDeleteExpenseMutation';
import type { Expense } from '@/entities/expense/model/types';
import { cn } from '@/shared/lib/utils';
import { MonthPicker, PageSection } from '@/shared/ui';
import { BudgetSummary } from '@/widgets/budget-summary';
import { ExpenseList } from '@/widgets/expense-list';

import { expensePageMonthPickerClassName } from '../lib/expensePageMonthPicker';
import {
  getExpensePagePaneClassNames,
  getExpensePageShellClassName,
} from '../lib/expensePageLayout';
import { toBudgetSnapshots } from '../lib/toBudgetSnapshots';
import { useExpensePageCategorySelection } from '../model/useExpensePageCategorySelection';
import { useExpensePageOutsideInteraction } from '../model/useExpensePageOutsideInteraction';
import { useExpensePagePaneBoost } from '../model/useExpensePagePaneBoost';
import { useExpensePage } from '../model/useExpensePage';

import { ExpenseWorkspace } from './ExpenseWorkspace';

export function ExpensePage() {
  const [stressCategoryId, setStressCategoryId] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const deleteExpenseMutation = useDeleteExpenseMutation();

  const {
    paneLayout,
    boostPane,
    resetPaneLayout,
    onExpenseHistoryTitleClick,
    onCategoriesTitleClick,
    onCategoryBudgetListScroll,
    onExpenseListScroll,
  } = useExpensePagePaneBoost();

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
    operationalSummary,
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
    boostPane,
  });

  useExpensePageOutsideInteraction({
    layout: paneLayout,
    selectedCategoryId,
    onResetPaneLayout: resetPaneLayout,
    onClearSelectedCategory: clearSelectedCategory,
  });

  const paneClassNames = getExpensePagePaneClassNames(paneLayout);
  const { expensesCollapsed } = paneLayout;

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

  return (
    <PageSection
      title="Расходы"
      className="min-h-0 gap-0"
      headerAction={
        <MonthPicker
          value={periodMonth}
          onChange={setPeriodMonth}
          containerClassName={expensePageMonthPickerClassName}
        />
      }
    >
      <div className={getExpensePageShellClassName()}>
        <div className="shrink-0">
          <BudgetSummary
            available={operationalSummary.available}
            inReserve={operationalSummary.inReserve}
            spentThisMonth={operationalSummary.spentThisMonth}
            carryForwardTotal={operationalSummary.carryForwardTotal}
            previousPeriodLabel={operationalSummary.previousPeriodLabel}
            reserveCategory={operationalSummary.reserveCategory}
          />
        </div>

        <div className={paneClassNames.categories}>
          <ExpenseWorkspace
            onTitleClick={onCategoriesTitleClick}
            categories={expenseCategories}
            budgets={budgetSnapshots}
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
            onBudgetListScroll={onCategoryBudgetListScroll}
          />
        </div>

        <div className={paneClassNames.expenses}>
          <ExpenseList
            className={cn(
              expensesCollapsed ? 'shrink-0' : 'min-h-0 flex-1',
            )}
            bodyCollapsed={expensesCollapsed}
            monthFilter={periodMonth}
            onTitleClick={onExpenseHistoryTitleClick}
            onListScroll={onExpenseListScroll}
            expenses={sortedExpenses}
            categoryFilter={expenseCategoryFilter}
            isPending={expensesQuery.isPending}
            isError={expensesQuery.isError}
            error={expensesQuery.error}
            isFetching={expensesQuery.isFetching}
            editingExpenseId={editingExpense?.id ?? null}
            deletingExpenseId={
              deleteExpenseMutation.isPending
                ? (deleteExpenseMutation.variables ?? null)
                : null
            }
            onEdit={(item) => {
              setEditingExpense(item);
              setSelectedCategoryId(item.category_id);
            }}
            onDelete={(id) => {
              if (editingExpense?.id === id) {
                setEditingExpense(null);
              }
              deleteExpenseMutation.mutate(id);
            }}
          />
        </div>
      </div>
    </PageSection>
  );
}
