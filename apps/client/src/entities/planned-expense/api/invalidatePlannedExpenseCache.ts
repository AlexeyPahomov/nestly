import type { QueryClient } from '@tanstack/react-query'

import { plannedExpenseQueryKeys } from './plannedExpenseQueryKeys'

export function invalidatePlannedExpenseCache(queryClient: QueryClient): void {
  void queryClient.invalidateQueries({ queryKey: plannedExpenseQueryKeys.all })
}
