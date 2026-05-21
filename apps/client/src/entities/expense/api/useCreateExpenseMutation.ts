import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateExpensePayload, Expense } from '../model/types'
import { createExpense } from './expenseApi'
import { expenseQueryKeys } from './expenseQueryKeys'

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation<Expense, Error, CreateExpensePayload>({
    mutationFn: createExpense,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: expenseQueryKeys.all })
    },
  })
}
