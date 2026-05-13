import { useQuery } from '@tanstack/react-query'

import type { Income } from '../model/types'
import { getIncomes } from './incomeApi'
import { incomeKeys } from './incomeQueryKeys'

export function useIncomesQuery() {
  return useQuery<Income[], Error>({
    queryKey: incomeKeys.lists(),
    queryFn: getIncomes,
  })
}
