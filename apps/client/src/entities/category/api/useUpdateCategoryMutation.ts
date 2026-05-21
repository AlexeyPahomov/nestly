import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Category, CategoryPayload } from '@/entities/category/model/types'
import { updateCategory } from './categoryApi'
import { categoryKeys } from './categoryQueryKeys'

type UpdateCategoryVariables = {
  id: string
  payload: CategoryPayload
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation<Category, Error, UpdateCategoryVariables>({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
}
