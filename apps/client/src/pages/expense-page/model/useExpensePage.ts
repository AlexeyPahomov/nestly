import { useMemo, useState } from 'react'

import { useAllAllocationsQuery } from '@/entities/allocation/api/useAllAllocationsQuery'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import type { Category } from '@/entities/category/model/types'
import { useExpensesQuery } from '@/entities/expense/api/useExpensesQuery'

import {
  buildCategoryBudgets,
  sortBudgetItemsByRemainingAsc,
  sumBudgetTotals,
} from '../lib/buildCategoryBudgets'
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

  const categoriesQuery = useCategoriesQuery()
  const incomesQuery = useIncomesQuery()
  const allocationsQuery = useAllAllocationsQuery()
  const expensesQuery = useExpensesQuery()

  const expenseCategories = useMemo(
    () => filterExpenseCategories(categoriesQuery.data ?? []),
    [categoriesQuery.data],
  )

  const budgetItems = useMemo(() => {
    const items = buildCategoryBudgets(
      categoriesQuery.data ?? [],
      allocationsQuery.data ?? [],
      expensesQuery.data ?? [],
    )
    return sortBudgetItemsByRemainingAsc(items)
  }, [categoriesQuery.data, allocationsQuery.data, expensesQuery.data])

  const budgetTotals = useMemo(() => sumBudgetTotals(budgetItems), [budgetItems])

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
    expenseCategories,
    incomes,
    allocations,
    budgetItems,
    budgetTotals,
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
