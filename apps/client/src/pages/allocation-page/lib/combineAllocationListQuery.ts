import type { UseQueryResult } from '@tanstack/react-query'

import type { Allocation } from '@/entities/allocation/model/types'

type QuerySlice = Pick<
  UseQueryResult<unknown, Error>,
  'isPending' | 'isError' | 'error' | 'isFetching' | 'isPlaceholderData'
>

export function combineAllocationListQuery(
  data: Allocation[],
  ...queries: QuerySlice[]
): QuerySlice & { data: Allocation[] } {
  return {
    isPending: queries.some((query) => query.isPending),
    isError: queries.some((query) => query.isError),
    error: queries.find((query) => query.error)?.error ?? null,
    isFetching: queries.some((query) => query.isFetching),
    isPlaceholderData: queries.some((query) => query.isPlaceholderData),
    data,
  }
}
