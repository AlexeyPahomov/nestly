import { useQuery } from '@tanstack/react-query'

import type { Allocation } from '../model/types'
import { getAllocations } from './allocationApi'
import { allocationKeys } from './allocationQueryKeys'

export function useAllocationsQuery(incomeId: string | null) {
  const enabled = Boolean(incomeId)

  return useQuery<Allocation[], Error>({
    queryKey: enabled
      ? allocationKeys.list(incomeId!)
      : allocationKeys.lists(),
    queryFn: () => {
      if (!incomeId) {
        throw new Error('useAllocationsQuery: incomeId is required')
      }
      return getAllocations(incomeId)
    },
    enabled,
  })
}
