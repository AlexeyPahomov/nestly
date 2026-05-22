import { useMutation, useQueryClient } from '@tanstack/react-query'

import { invalidateBudgetMonthCache } from '@/entities/budget-month/api/invalidateBudgetMonthCache'

import type {
  Allocation,
  CreateAllocationPayload,
} from '../model/types'
import { createAllocation } from './allocationApi'
import { allocationKeys } from './allocationQueryKeys'

export function useCreateAllocationMutation() {
  const queryClient = useQueryClient()

  return useMutation<Allocation, Error, CreateAllocationPayload>({
    mutationFn: createAllocation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allocationKeys.all })
      invalidateBudgetMonthCache(queryClient)
    },
  })
}
