import { useQuery } from '@tanstack/react-query'

import type { Category } from '@/entities/category/model/types'
import { getCategories } from './categoryApi'
import { categoryKeys } from './categoryQueryKeys'

export function useCategoriesQuery() {
  return useQuery<Category[], Error>({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  })
}
