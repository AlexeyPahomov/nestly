import { useMutation, useQueryClient } from '@tanstack/react-query'

import { invalidateBudgetMonthCache } from '@/entities/budget-month/api/invalidateBudgetMonthCache'

import type { Allocation, UpdateAllocationPayload } from '../model/types'
import { updateAllocation } from './allocationApi'
import { allocationKeys } from './allocationQueryKeys'

type UpdateAllocationVariables = {
  id: string
  payload: UpdateAllocationPayload
}

export function useUpdateAllocationMutation() {
  const queryClient = useQueryClient()

  return useMutation<Allocation, Error, UpdateAllocationVariables>({
    mutationFn: ({ id, payload }) => updateAllocation(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allocationKeys.all })
      invalidateBudgetMonthCache(queryClient)
    },
  })
}
