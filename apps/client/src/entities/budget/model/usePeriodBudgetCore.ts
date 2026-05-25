import { useMemo } from 'react'

import { useAllAllocationsQuery } from '@/entities/allocation/api/useAllAllocationsQuery'
import { useBudgetMonthQuery } from '@/entities/budget-month/api/useBudgetMonthQuery'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { useExpensesQuery } from '@/entities/expense/api/useExpensesQuery'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import { resolveExpensePageBudgetItems } from '../lib/resolveBudgetItems'

import type { CategoryBudgetItem } from './types'

export function usePeriodBudgetCore(periodMonth: string) {
  const categoriesQuery = useCategoriesQuery()
  const incomesQuery = useIncomesQuery()
  const allocationsQuery = useAllAllocationsQuery()
  const expensesQuery = useExpensesQuery()
  const budgetMonthQuery = useBudgetMonthQuery(periodMonth)

  const categories = categoriesQuery.data ?? []
  const incomes = incomesQuery.data ?? []
  const allocations = allocationsQuery.data ?? []
  const expenses = expensesQuery.data ?? []

  const budgetItems = useMemo(
    (): CategoryBudgetItem[] =>
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

  const isCoreLoading =
    categoriesQuery.isLoading ||
    incomesQuery.isLoading ||
    allocationsQuery.isLoading ||
    expensesQuery.isLoading

  return {
    categories,
    incomes,
    allocations,
    expenses,
    budgetItems,
    categoriesQuery,
    incomesQuery,
    allocationsQuery,
    expensesQuery,
    budgetMonthQuery,
    isCoreLoading,
  }
}
