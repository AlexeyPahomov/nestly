import { useQuery } from '@tanstack/react-query'

import type { Allocation } from '../model/types'
import { getAllAllocations } from './allocationApi'
import { allocationKeys } from './allocationQueryKeys'

export function useAllAllocationsQuery() {
  return useQuery<Allocation[], Error>({
    queryKey: allocationKeys.allList(),
    queryFn: getAllAllocations,
  })
}
