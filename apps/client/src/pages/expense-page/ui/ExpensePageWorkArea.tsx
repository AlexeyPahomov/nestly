import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import type { CategoryBudgetItem } from '@/entities/budget/model/types'
import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget'
import { cn } from '@/shared/lib/utils'
import type { ExpenseListItem } from '@/widgets/expense-list'
import { ExpenseList } from '@/widgets/expense-list'

import {
  expensePageCategoriesPaneClassName,
  expensePageExpensesListClassName,
  expensePageExpensesPaneClassName,
  expensePageWorkAreaClassName,
} from '../lib/expensePageLayout'
import { usePageListLayout } from '@/shared/hooks/use-page-list-layout'

import { ExpenseWorkspace } from './ExpenseWorkspace'

export type ExpensePageWorkAreaProps = {
  periodMonth: string
  expenseCategories: Category[]
  budgetSnapshots: CategoryBudgetSnapshot[]
  incomes: Income[]
  allocations: Allocation[]
  budgetItems: CategoryBudgetItem[]
  selectedCategoryId: string | null
  editingExpense: Expense | null
  onCancelEdit: () => void
  stressCategoryId: string | null
  onStressCategoryChange: (categoryId: string | null) => void
  onCategorySelect: (categoryId: string) => void
  isBudgetPending: boolean
  isBudgetError: boolean
  budgetError: unknown
  isBudgetFetching: boolean
  sortedExpenses: ExpenseListItem[]
  expenseCategoryFilter: string
  expensesQuery: {
    isPending: boolean
    isError: boolean
    error: unknown
    isFetching: boolean
  }
  editingExpenseId: string | null
  deletingExpenseId: string | null
  onEditExpense: (item: ExpenseListItem) => void
  onDeleteExpense: (id: string) => void
}

export function ExpensePageWorkArea({
  periodMonth,
  expenseCategories,
  budgetSnapshots,
  incomes,
  allocations,
  budgetItems,
  selectedCategoryId,
  editingExpense,
  onCancelEdit,
  stressCategoryId,
  onStressCategoryChange,
  onCategorySelect,
  isBudgetPending,
  isBudgetError,
  budgetError,
  isBudgetFetching,
  sortedExpenses,
  expenseCategoryFilter,
  expensesQuery,
  editingExpenseId,
  deletingExpenseId,
  onEditExpense,
  onDeleteExpense,
}: ExpensePageWorkAreaProps) {
  const listLayout = usePageListLayout()

  return (
    <div className={expensePageWorkAreaClassName}>
      <div className={expensePageCategoriesPaneClassName}>
        <ExpenseWorkspace
          listLayout={listLayout}
          categories={expenseCategories}
          budgets={budgetSnapshots}
          incomes={incomes}
          allocations={allocations}
          budgetItems={budgetItems}
          selectedCategoryId={selectedCategoryId}
          editingExpense={editingExpense}
          onCancelEdit={onCancelEdit}
          stressCategoryId={stressCategoryId}
          onStressCategoryChange={onStressCategoryChange}
          onCategorySelect={onCategorySelect}
          isBudgetPending={isBudgetPending}
          isBudgetError={isBudgetError}
          budgetError={budgetError}
          isBudgetFetching={isBudgetFetching}
        />
      </div>

      <div className={expensePageExpensesPaneClassName}>
        <ExpenseList
          className={cn(expensePageExpensesListClassName)}
          layout={listLayout}
          monthFilter={periodMonth}
          expenses={sortedExpenses}
          categoryFilter={expenseCategoryFilter}
          isPending={expensesQuery.isPending}
          isError={expensesQuery.isError}
          error={expensesQuery.error}
          isFetching={expensesQuery.isFetching}
          editingExpenseId={editingExpenseId}
          deletingExpenseId={deletingExpenseId}
          onEdit={onEditExpense}
          onDelete={onDeleteExpense}
        />
      </div>
    </div>
  )
}
