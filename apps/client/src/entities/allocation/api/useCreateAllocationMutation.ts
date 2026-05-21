import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: allocationKeys.list(variables.income_id),
      })
    },
  })
}
