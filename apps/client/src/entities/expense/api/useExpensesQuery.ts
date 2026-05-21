import { useQuery } from '@tanstack/react-query'

import type { Expense } from '../model/types'
import { getExpenses } from './expenseApi'
import { expenseQueryKeys } from './expenseQueryKeys'

export function useExpensesQuery() {
  return useQuery<Expense[], Error>({
    queryKey: expenseQueryKeys.list(),
    queryFn: getExpenses,
  })
}
