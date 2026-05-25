import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreatePlannedExpensePayload, PlannedExpense } from '../model/types'
import { invalidatePlannedExpenseCache } from './invalidatePlannedExpenseCache'
import { createPlannedExpense } from './plannedExpenseApi'

export function useCreatePlannedExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation<PlannedExpense, Error, CreatePlannedExpensePayload>({
    mutationFn: createPlannedExpense,
    onSuccess: () => invalidatePlannedExpenseCache(queryClient),
  })
}
