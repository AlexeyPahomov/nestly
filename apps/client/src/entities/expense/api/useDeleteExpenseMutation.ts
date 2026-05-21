import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteExpense } from './expenseApi'
import { expenseQueryKeys } from './expenseQueryKeys'

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: expenseQueryKeys.all })
    },
  })
}
