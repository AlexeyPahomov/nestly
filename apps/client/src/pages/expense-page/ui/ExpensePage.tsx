import type { CSSProperties } from 'react';

import { CreateExpenseForm } from '@/features/create-expense/ui/CreateExpenseForm';
import { useExpensePage } from '@/pages/expense-page/model/useExpensePage';
import { useElementHeight } from '@/shared/lib/useElementHeight';
import { cn } from '@/shared/lib/utils';
import { PageSection } from '@/shared/ui';
import { BudgetSummary } from '@/widgets/budget-summary';
import { CategoryBudgetList } from '@/widgets/category-budget-list';
import { ExpenseList } from '@/widgets/expense-list';

/** 3fr + 2fr ≈ 60/40; gap учитывается grid, без переполнения по ширине */
const workspaceRowClassName =
  'grid shrink-0 grid-cols-1 gap-4 md:grid-cols-[3fr_2fr] md:items-start';

const categoriesColumnClassName =
  'flex min-h-0 min-w-0 flex-col md:overflow-hidden md:max-h-[var(--expense-form-h)]';

const formColumnClassName = 'min-w-0';

export function ExpensePage() {
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    expenseCategories,
    budgetItems,
    budgetTotals,
    sortedExpenses,
    isBudgetPending,
    isBudgetError,
    budgetError,
    isBudgetFetching,
    expensesQuery,
  } = useExpensePage();

  const { ref: expenseFormRef, height: expenseFormHeight } =
    useElementHeight<HTMLDivElement>();

  const categoriesColumnStyle =
    expenseFormHeight != null
      ? ({ '--expense-form-h': `${expenseFormHeight}px` } as CSSProperties)
      : undefined;

  return (
    <PageSection title="Расходы" className="min-h-0 gap-4">
      <div className="grid min-h-0 flex-1 grid-rows-[auto_auto_minmax(0,1fr)] gap-4">
        <div className="shrink-0">
          <BudgetSummary
            allocatedTotal={budgetTotals.allocated}
            spentTotal={budgetTotals.spent}
            remainingTotal={budgetTotals.remaining}
          />
        </div>

        <div className={workspaceRowClassName}>
          <div
            className={cn(categoriesColumnClassName)}
            style={categoriesColumnStyle}
          >
            <CategoryBudgetList
              className="min-h-0 flex-1"
              budgetItems={budgetItems}
              isPending={isBudgetPending}
              isError={isBudgetError}
              error={budgetError}
              isFetching={isBudgetFetching}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={setSelectedCategoryId}
            />
          </div>

          <div ref={expenseFormRef} className={formColumnClassName}>
            <CreateExpenseForm
              categories={expenseCategories}
              selectedCategoryId={selectedCategoryId ?? undefined}
            />
          </div>
        </div>

        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <ExpenseList
            className="min-h-0 flex-1"
            expenses={sortedExpenses}
            isPending={expensesQuery.isPending}
            isError={expensesQuery.isError}
            error={expensesQuery.error}
            isFetching={expensesQuery.isFetching}
          />
        </div>
      </div>
    </PageSection>
  );
}
