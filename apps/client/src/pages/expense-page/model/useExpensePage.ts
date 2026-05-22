import { useMemo, useState } from 'react'

import { useAllAllocationsQuery } from '@/entities/allocation/api/useAllAllocationsQuery'
import { useBudgetMonthQuery } from '@/entities/budget-month/api/useBudgetMonthQuery'
import { filterExpenseCategories } from '@/entities/category/lib/filterExpenseCategories'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import { useExpensesQuery } from '@/entities/expense/api/useExpensesQuery'
import { currentMonthInputValue } from '@/shared/lib/date'

import { computeOperationalSummary } from '../lib/computeOperationalSummary'
import {
  enrichExpensesWithCategory,
  sortExpensesNewestFirst,
} from '../lib/enrichExpenses'
import { resolveExpensePageBudgetItems } from '../lib/resolveBudgetItems'

export function useExpensePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )

  const [periodMonth, setPeriodMonth] = useState(currentMonthInputValue)

  const categoriesQuery = useCategoriesQuery()
  const incomesQuery = useIncomesQuery()
  const allocationsQuery = useAllAllocationsQuery()
  const expensesQuery = useExpensesQuery()
  const budgetMonthQuery = useBudgetMonthQuery(periodMonth)

  const categories = categoriesQuery.data ?? []
  const incomes = incomesQuery.data ?? []
  const allocations = allocationsQuery.data ?? []
  const expenses = expensesQuery.data ?? []

  const expenseCategories = useMemo(
    () => filterExpenseCategories(categories),
    [categories],
  )

  const budgetItems = useMemo(
    () =>
      resolveExpensePageBudgetItems(
        categories,
        allocations,
        expenses,
        incomes,
        periodMonth,
        budgetMonthQuery.data,
      ),
    [
      categories,
      allocations,
      expenses,
      incomes,
      periodMonth,
      budgetMonthQuery.data,
    ],
  )

  const operationalSummary = useMemo(
    () =>
      computeOperationalSummary(
        budgetItems,
        incomes,
        allocations,
        expenses,
        periodMonth,
      ),
    [budgetItems, incomes, allocations, expenses, periodMonth],
  )

  const sortedExpenses = useMemo(() => {
    const enriched = enrichExpensesWithCategory(expenses, categories)
    return sortExpensesNewestFirst(enriched)
  }, [expenses, categories])

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
    expensesQuery.isFetching ||
    (budgetMonthQuery.isFetching && budgetMonthQuery.data === undefined)

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
    budgetMonthStatus: budgetMonthQuery.data?.status,
    categoriesQuery,
    incomesQuery,
    allocationsQuery,
    expensesQuery,
    budgetMonthQuery,
  }
}
