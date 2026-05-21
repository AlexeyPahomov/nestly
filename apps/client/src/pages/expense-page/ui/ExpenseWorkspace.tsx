import type { CSSProperties } from 'react'

import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Income } from '@/entities/income/model/types'
import type { CategoryBudgetSnapshot } from '@/features/create-expense/model/budget'
import { CreateExpenseForm } from '@/features/create-expense/ui/CreateExpenseForm'
import { useElementHeight } from '@/shared/lib/useElementHeight'
import { cn } from '@/shared/lib/utils'
import type { CategoryBudgetListItem } from '@/widgets/category-budget-list/model/types'
import { CategoryBudgetList } from '@/widgets/category-budget-list'

/** 2fr + 3fr — форма слева, категории справа; gap в grid, без переполнения. */
const rowClassName =
  'grid shrink-0 grid-cols-1 gap-4 md:grid-cols-[2fr_3fr] md:items-start'

const categoriesColumnClassName =
  'flex min-h-0 min-w-0 flex-col md:overflow-hidden md:max-h-[var(--expense-form-h)]'

const formColumnClassName = 'min-w-0'

type ExpenseWorkspaceProps = {
  categories: Category[]
  budgets: CategoryBudgetSnapshot[]
  incomes: Income[]
  allocations: Allocation[]
  budgetItems: CategoryBudgetListItem[]
  selectedCategoryId: string | null
  stressCategoryId: string | null
  onStressCategoryChange: (categoryId: string | null) => void
  onCategorySelect: (categoryId: string) => void
  isBudgetPending: boolean
  isBudgetError: boolean
  budgetError: unknown
  isBudgetFetching: boolean
}

export function ExpenseWorkspace({
  categories,
  budgets,
  incomes,
  allocations,
  budgetItems,
  selectedCategoryId,
  stressCategoryId,
  onStressCategoryChange,
  onCategorySelect,
  isBudgetPending,
  isBudgetError,
  budgetError,
  isBudgetFetching,
}: ExpenseWorkspaceProps) {
  const { ref: formRef, height: formHeight } = useElementHeight<HTMLDivElement>()

  const categoriesColumnStyle =
    formHeight != null
      ? ({ '--expense-form-h': `${formHeight}px` } as CSSProperties)
      : undefined

  return (
    <div className={rowClassName}>
      <div ref={formRef} className={formColumnClassName}>
        <CreateExpenseForm
          categories={categories}
          budgets={budgets}
          incomes={incomes}
          allocations={allocations}
          selectedCategoryId={selectedCategoryId ?? undefined}
          onStressCategoryChange={onStressCategoryChange}
        />
      </div>

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
          stressCategoryId={stressCategoryId}
          onCategorySelect={onCategorySelect}
        />
      </div>
    </div>
  )
}
