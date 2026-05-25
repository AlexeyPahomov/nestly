import { useEffect, useMemo, useState } from 'react'

import { computeOperationalSummary } from '@/entities/budget/lib/computeOperationalSummary'
import { usePeriodBudgetCore } from '@/entities/budget/model/usePeriodBudgetCore'
import { filterExpenseEnvelopeBudgetItems } from '@/entities/budget/lib/filterExpenseEnvelopeBudgetItems'
import { filterExpenseCategories } from '@/entities/category/lib/filterExpenseCategories'
import { usePlannedExpensesQuery } from '@/entities/planned-expense/api/usePlannedExpensesQuery'
import { currentMonthInputValue } from '@/shared/lib/date'

import {
  enrichExpensesWithCategory,
  sortExpensesNewestFirst,
} from '../lib/enrichExpenses'

export function useExpensePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )

  const [periodMonth, setPeriodMonth] = useState(currentMonthInputValue)

  const core = usePeriodBudgetCore(periodMonth)
  const plannedExpensesQuery = usePlannedExpensesQuery(periodMonth)

  const expenseCategories = useMemo(
    () => filterExpenseCategories(core.categories),
    [core.categories],
  )

  const budgetItems = useMemo(
    () => filterExpenseEnvelopeBudgetItems(core.budgetItems),
    [core.budgetItems],
  )

  useEffect(() => {
    if (
      selectedCategoryId != null &&
      !budgetItems.some((item) => item.category.id === selectedCategoryId)
    ) {
      setSelectedCategoryId(null)
    }
  }, [budgetItems, selectedCategoryId])

  const operationalSummary = useMemo(
    () =>
      computeOperationalSummary(
        core.budgetItems,
        core.incomes,
        core.allocations,
        core.expenses,
        periodMonth,
        plannedExpensesQuery.data ?? [],
      ),
    [
      core.budgetItems,
      core.incomes,
      core.allocations,
      core.expenses,
      periodMonth,
      plannedExpensesQuery.data,
    ],
  )

  const sortedExpenses = useMemo(() => {
    const enriched = enrichExpensesWithCategory(core.expenses, core.categories)
    return sortExpensesNewestFirst(enriched)
  }, [core.expenses, core.categories])

  const isBudgetPending =
    core.categoriesQuery.isPending ||
    core.incomesQuery.isPending ||
    core.allocationsQuery.isPending ||
    core.expensesQuery.isPending

  const isBudgetError =
    core.categoriesQuery.isError ||
    core.incomesQuery.isError ||
    core.allocationsQuery.isError ||
    core.expensesQuery.isError

  const budgetError =
    core.categoriesQuery.error ??
    core.incomesQuery.error ??
    core.allocationsQuery.error ??
    core.expensesQuery.error

  const isBudgetFetching =
    core.categoriesQuery.isFetching ||
    core.incomesQuery.isFetching ||
    core.allocationsQuery.isFetching ||
    core.expensesQuery.isFetching ||
    (core.budgetMonthQuery.isFetching &&
      core.budgetMonthQuery.data === undefined)

  return {
    selectedCategoryId,
    setSelectedCategoryId,
    periodMonth,
    setPeriodMonth,
    expenseCategories,
    incomes: core.incomes,
    allocations: core.allocations,
    allBudgetItems: core.budgetItems,
    budgetItems,
    operationalSummary,
    sortedExpenses,
    isBudgetPending,
    isBudgetError,
    budgetError,
    isBudgetFetching,
    budgetMonthStatus: core.budgetMonthQuery.data?.status,
    categoriesQuery: core.categoriesQuery,
    incomesQuery: core.incomesQuery,
    allocationsQuery: core.allocationsQuery,
    expensesQuery: core.expensesQuery,
    budgetMonthQuery: core.budgetMonthQuery,
  }
}
