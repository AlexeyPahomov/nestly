import { useCallback, useMemo, useState } from 'react';

import { useDeleteExpenseMutation } from '@/entities/expense/api/useDeleteExpenseMutation';
import type { Expense } from '@/entities/expense/model/types';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { cn } from '@/shared/lib/utils';
import { MonthPicker, PageSection, PageSectionTitleRow } from '@/shared/ui';
import { CurrentBudgetSummary } from '@/widgets/current-budget-summary';
import { ExpenseList } from '@/widgets/expense-list';

import { expensePageMonthPickerClassName } from '../lib/expensePageMonthPicker';
import {
  expensePageWorkAreaClassName,
  getExpensePagePaneClassNames,
  getExpensePageShellClassName,
} from '../lib/expensePageLayout';
import { toBudgetSnapshots } from '../lib/toBudgetSnapshots';
import { useExpensePageCategorySelection } from '../model/useExpensePageCategorySelection';
import { useExpensePageOutsideInteraction } from '../model/useExpensePageOutsideInteraction';
import { useExpensePage } from '../model/useExpensePage';

import { ExpenseWorkspace } from './ExpenseWorkspace';

export function ExpensePage() {
  const isMobile = useIsMobile();
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

  const paneClassNames = getExpensePagePaneClassNames(isMobile);

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
      className="min-h-0 gap-0"
      header={
        <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <PageSectionTitleRow>Расходы</PageSectionTitleRow>
          <MonthPicker
            value={periodMonth}
            onChange={setPeriodMonth}
            containerClassName={expensePageMonthPickerClassName}
          />
        </div>
      }
    >
      <div className={getExpensePageShellClassName()}>
        <div className="shrink-0">
          <CurrentBudgetSummary {...currentBudgetView} />
        </div>

        <div className={expensePageWorkAreaClassName}>
          <div className={paneClassNames.categories}>
            <ExpenseWorkspace
              listLayout={isMobile ? 'fit' : 'fill'}
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
            />
          </div>

          <div
            className={cn(
              paneClassNames.expenses,
              isMobile ? 'overflow-visible' : 'min-h-0 overflow-hidden',
            )}
          >
            <ExpenseList
              className={cn(isMobile ? 'overflow-visible' : 'min-h-0 flex-1')}
              layout={isMobile ? 'fit' : 'fill'}
              monthFilter={periodMonth}
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
      </div>
    </PageSection>
  );
}
