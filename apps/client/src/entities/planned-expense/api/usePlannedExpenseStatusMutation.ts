import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PlannedExpense, PlannedExpenseStatus } from '../model/types'
import { invalidatePlannedExpenseCache } from './invalidatePlannedExpenseCache'
import { updatePlannedExpense } from './plannedExpenseApi'

type StatusMutationArgs = {
  id: string
  status: PlannedExpenseStatus
}

export function usePlannedExpenseStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation<PlannedExpense, Error, StatusMutationArgs>({
    mutationFn: ({ id, status }) => updatePlannedExpense(id, { status }),
    onSuccess: () => invalidatePlannedExpenseCache(queryClient),
  })
}
