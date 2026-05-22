import { useCallback, useMemo, useState } from 'react';

import { useDeleteExpenseMutation } from '@/entities/expense/api/useDeleteExpenseMutation';
import type { Expense } from '@/entities/expense/model/types';
import { PageSection } from '@/shared/ui';
import { BudgetSummary } from '@/widgets/budget-summary';
import { ExpenseList } from '@/widgets/expense-list';

import {
  getCategoriesPaneClassName,
  getExpensePageShellClassName,
  getExpensesPaneClassName,
} from '../lib/expensePageLayout';
import { toBudgetSnapshots } from '../lib/toBudgetSnapshots';
import { useExpensePagePaneBoost } from '../model/useExpensePagePaneBoost';
import { useExpensePage } from '../model/useExpensePage';

import { ExpenseWorkspace } from './ExpenseWorkspace';

export function ExpensePage() {
  const [stressCategoryId, setStressCategoryId] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const deleteExpenseMutation = useDeleteExpenseMutation();
  const { paneBoost, boostPane, onCategoryBudgetListScroll, onExpenseListScroll } =
    useExpensePagePaneBoost();

  const {
    selectedCategoryId,
    setSelectedCategoryId,
    expenseCategories,
    incomes,
    allocations,
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

  const budgetSnapshots = useMemo(
    () => toBudgetSnapshots(budgetItems),
    [budgetItems],
  );

  const handleStressCategoryChange = useCallback(
    (categoryId: string | null) => {
      setStressCategoryId((prev) => (prev === categoryId ? prev : categoryId));
    },
    [],
  );

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      setSelectedCategoryId(categoryId);
      boostPane('categories');
    },
    [setSelectedCategoryId, boostPane],
  );

  return (
    <PageSection title="Расходы" className="min-h-0 gap-4">
      <div className={getExpensePageShellClassName()}>
        <div className="shrink-0">
          <BudgetSummary
            periodMonth={periodMonth}
            onPeriodMonthChange={setPeriodMonth}
            available={operationalSummary.available}
            inReserve={operationalSummary.inReserve}
            spentThisMonth={operationalSummary.spentThisMonth}
            carryForwardTotal={operationalSummary.carryForwardTotal}
            previousPeriodLabel={operationalSummary.previousPeriodLabel}
          />
        </div>

        <div className={getCategoriesPaneClassName(paneBoost)}>
          <ExpenseWorkspace
            onTitleClick={() => boostPane('categories')}
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

        <div className={getExpensesPaneClassName(paneBoost)}>
          <ExpenseList
            className="min-h-0 flex-1"
            monthFilter={periodMonth}
            onTitleClick={() => boostPane('expenses')}
            onListScroll={onExpenseListScroll}
            expenses={sortedExpenses}
            categories={expenseCategories}
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
