import { useCallback, useMemo, useState } from 'react'

import { PageSection } from '@/shared/ui'
import { BudgetSummary } from '@/widgets/budget-summary'
import { ExpenseList } from '@/widgets/expense-list'

import { toBudgetSnapshots } from '../lib/toBudgetSnapshots'
import { useExpensePage } from '../model/useExpensePage'

import { ExpenseWorkspace } from './ExpenseWorkspace'

export function ExpensePage() {
  const [stressCategoryId, setStressCategoryId] = useState<string | null>(null)

  const {
    selectedCategoryId,
    setSelectedCategoryId,
    expenseCategories,
    incomes,
    allocations,
    budgetItems,
    treasurySummary,
    sortedExpenses,
    isBudgetPending,
    isBudgetError,
    budgetError,
    isBudgetFetching,
    expensesQuery,
  } = useExpensePage()

  const budgetSnapshots = useMemo(
    () => toBudgetSnapshots(budgetItems),
    [budgetItems],
  )

  const handleStressCategoryChange = useCallback(
    (categoryId: string | null) => {
      setStressCategoryId((prev) => (prev === categoryId ? prev : categoryId))
    },
    [],
  )

  return (
    <PageSection title="Расходы" className="min-h-0 gap-4">
      <div className="grid min-h-0 flex-1 grid-rows-[auto_auto_minmax(0,1fr)] gap-4">
        <div className="shrink-0">
          <BudgetSummary
            totalFunds={treasurySummary.totalFunds}
            availableToAllocate={treasurySummary.availableToAllocate}
            allocatedTotal={treasurySummary.allocatedTotal}
          />
        </div>

        <ExpenseWorkspace
          categories={expenseCategories}
          budgets={budgetSnapshots}
          incomes={incomes}
          allocations={allocations}
          budgetItems={budgetItems}
          selectedCategoryId={selectedCategoryId}
          stressCategoryId={stressCategoryId}
          onStressCategoryChange={handleStressCategoryChange}
          onCategorySelect={setSelectedCategoryId}
          isBudgetPending={isBudgetPending}
          isBudgetError={isBudgetError}
          budgetError={budgetError}
          isBudgetFetching={isBudgetFetching}
        />

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
  )
}
