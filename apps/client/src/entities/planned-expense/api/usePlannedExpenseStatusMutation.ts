import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PlannedExpense } from '../model/types'
import { invalidatePlannedExpenseCache } from './invalidatePlannedExpenseCache'
import type { PlannedExpenseStatusMutationArgs } from '../lib/fullReserveMutationArgs'
import { updatePlannedExpense } from './plannedExpenseApi'

export function usePlannedExpenseStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation<PlannedExpense, Error, PlannedExpenseStatusMutationArgs>({
    mutationFn: ({ id, status, reserveAmount }) =>
      updatePlannedExpense(id, {
        status,
        ...(reserveAmount !== undefined
          ? { reserved_amount: reserveAmount }
          : {}),
      }),
    onSuccess: () => invalidatePlannedExpenseCache(queryClient),
  })
}
