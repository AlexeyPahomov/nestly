import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Category, CreateCategoryPayload } from '@/entities/category/model/types'
import { createCategory } from './categoryApi'
import { categoryKeys } from './categoryQueryKeys'

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation<Category, Error, CreateCategoryPayload>({
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
}
