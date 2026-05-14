import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DEV_USER_ID } from '@/shared/lib/constants'

import { deleteIncome } from './incomeApi'
import { incomeKeys } from './incomeQueryKeys'

export function useDeleteIncomeMutation() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteIncome(id, DEV_USER_ID),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: incomeKeys.lists() })
    },
  })
}
