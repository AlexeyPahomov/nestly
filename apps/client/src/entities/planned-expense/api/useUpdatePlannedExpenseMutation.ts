import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PlannedExpense, UpdatePlannedExpensePayload } from '../model/types'
import { invalidatePlannedExpenseCache } from './invalidatePlannedExpenseCache'
import { updatePlannedExpense } from './plannedExpenseApi'

type UpdateArgs = {
  id: string
  payload: UpdatePlannedExpensePayload
}

export function useUpdatePlannedExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation<PlannedExpense, Error, UpdateArgs>({
    mutationFn: ({ id, payload }) => updatePlannedExpense(id, payload),
    onSuccess: () => invalidatePlannedExpenseCache(queryClient),
  })
}
