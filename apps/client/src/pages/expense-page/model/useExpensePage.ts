import { useMemo, useState } from 'react'

import { useAllAllocationsQuery } from '@/entities/allocation/api/useAllAllocationsQuery'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import type { Category } from '@/entities/category/model/types'
import { useExpensesQuery } from '@/entities/expense/api/useExpensesQuery'
import { currentMonthInputValue } from '@/shared/lib/date'

import {
  buildCategoryBudgets,
  sortBudgetItemsForDisplay,
} from '../lib/buildCategoryBudgets'
import { computeOperationalSummary } from '../lib/computeOperationalSummary'
import {
  filterAllocationsByPeriod,
  filterExpensesByPeriod,
} from '../lib/periodMonth'
import {
  enrichExpensesWithCategory,
  sortExpensesNewestFirst,
} from '../lib/enrichExpenses'

function filterExpenseCategories(categories: Category[]): Category[] {
  return categories.filter((category) => category.type !== 'income')
}

export function useExpensePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )

  const [periodMonth, setPeriodMonth] = useState(currentMonthInputValue)

  const categoriesQuery = useCategoriesQuery()
  const incomesQuery = useIncomesQuery()
  const allocationsQuery = useAllAllocationsQuery()
  const expensesQuery = useExpensesQuery()

  const expenseCategories = useMemo(
    () => filterExpenseCategories(categoriesQuery.data ?? []),
    [categoriesQuery.data],
  )

  const budgetItems = useMemo(() => {
    const categories = categoriesQuery.data ?? []
    const incomes = incomesQuery.data ?? []
    const allocations = filterAllocationsByPeriod(
      allocationsQuery.data ?? [],
      incomes,
      periodMonth,
    )
    const expenses = filterExpensesByPeriod(
      expensesQuery.data ?? [],
      periodMonth,
    )
    const items = buildCategoryBudgets(categories, allocations, expenses)

    return sortBudgetItemsForDisplay(items)
  }, [
    categoriesQuery.data,
    incomesQuery.data,
    allocationsQuery.data,
    expensesQuery.data,
    periodMonth,
  ])

  const operationalSummary = useMemo(
    () =>
      computeOperationalSummary(
        incomesQuery.data ?? [],
        allocationsQuery.data ?? [],
        expensesQuery.data ?? [],
        categoriesQuery.data ?? [],
        periodMonth,
      ),
    [
      incomesQuery.data,
      allocationsQuery.data,
      expensesQuery.data,
      categoriesQuery.data,
      periodMonth,
    ],
  )

  const sortedExpenses = useMemo(() => {
    const enriched = enrichExpensesWithCategory(
      expensesQuery.data ?? [],
      categoriesQuery.data ?? [],
    )
    return sortExpensesNewestFirst(enriched)
  }, [expensesQuery.data, categoriesQuery.data])

  const isBudgetPending =
    categoriesQuery.isPending ||
    incomesQuery.isPending ||
    allocationsQuery.isPending ||
    expensesQuery.isPending

  const isBudgetError =
    categoriesQuery.isError ||
    incomesQuery.isError ||
    allocationsQuery.isError ||
    expensesQuery.isError

  const budgetError =
    categoriesQuery.error ??
    incomesQuery.error ??
    allocationsQuery.error ??
    expensesQuery.error

  const isBudgetFetching =
    categoriesQuery.isFetching ||
    incomesQuery.isFetching ||
    allocationsQuery.isFetching ||
    expensesQuery.isFetching

  const incomes = incomesQuery.data ?? []
  const allocations = allocationsQuery.data ?? []

  return {
    selectedCategoryId,
    setSelectedCategoryId,
    periodMonth,
    setPeriodMonth,
    expenseCategories,
    incomes,
    allocations,
    budgetItems,
    operationalSummary,
    sortedExpenses,
    isBudgetPending,
    isBudgetError,
    budgetError,
    isBudgetFetching,
    categoriesQuery,
    incomesQuery,
    allocationsQuery,
    expensesQuery,
  }
}
