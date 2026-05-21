import type { UIEventHandler } from 'react'

import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Expense } from '@/entities/expense/model/types'
import type { Income } from '@/entities/income/model/types'
import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget'
import { ExpenseFormDialog } from '@/features/create-expense/ui/ExpenseFormDialog'
import { Button } from '@/shared/ui'
import type { CategoryBudgetListItem } from '@/widgets/category-budget-list/model/types'
import { CategoryBudgetList } from '@/widgets/category-budget-list'

import { useExpenseFormDialog } from '../model/useExpenseFormDialog'

type ExpenseWorkspaceProps = {
  categories: Category[]
  budgets: CategoryBudgetSnapshot[]
  incomes: Income[]
  allocations: Allocation[]
  budgetItems: CategoryBudgetListItem[]
  selectedCategoryId: string | null
  editingExpense?: Expense | null
  onCancelEdit?: () => void
  stressCategoryId: string | null
  onStressCategoryChange: (categoryId: string | null) => void
  onCategorySelect: (categoryId: string) => void
  isBudgetPending: boolean
  isBudgetError: boolean
  budgetError: unknown
  isBudgetFetching: boolean
  onBudgetListScroll?: UIEventHandler<HTMLUListElement>
}

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
}: ExpenseWorkspaceProps) {
  const dialog = useExpenseFormDialog(editingExpense, onCancelEdit)

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <CategoryBudgetList
        className="min-h-0 flex-1 overflow-hidden"
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
            className="rounded-xl px-4"
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
  )
}
