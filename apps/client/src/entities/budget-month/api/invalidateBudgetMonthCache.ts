import type { QueryClient } from '@tanstack/react-query'

import { budgetMonthQueryKeys } from './budgetMonthQueryKeys'

export function invalidateBudgetMonthCache(queryClient: QueryClient): void {
  void queryClient.invalidateQueries({ queryKey: budgetMonthQueryKeys.all })
}
