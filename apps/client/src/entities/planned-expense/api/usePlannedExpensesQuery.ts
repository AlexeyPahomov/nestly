import { useQuery } from '@tanstack/react-query'

import { getPlannedExpenses } from './plannedExpenseApi'
import { plannedExpenseQueryKeys } from './plannedExpenseQueryKeys'

export function usePlannedExpensesQuery(periodMonth?: string) {
  return useQuery({
    queryKey: periodMonth
      ? plannedExpenseQueryKeys.byPeriod(periodMonth)
      : plannedExpenseQueryKeys.all,
    queryFn: () => getPlannedExpenses(periodMonth),
  })
}
