import { useState } from 'react'

import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import type { Category } from '@/entities/category/model/types'
import { usePageListLayout } from '@/shared/hooks/use-page-list-layout'
import { isQueryLoading } from '@/shared/lib/queryStatus'

import { useCategoryFormDialog } from './useCategoryFormDialog'

export function useCategoryPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const categoriesQuery = useCategoriesQuery()
  const dialog = useCategoryFormDialog(editingCategory, () =>
    setEditingCategory(null),
  )
  const listLayout = usePageListLayout()

  return {
    categoriesQuery,
    dialog,
    editingCategory,
    setEditingCategory,
    listLayout,
    isLoading: isQueryLoading(
      categoriesQuery.isPending,
      categoriesQuery.isFetching,
    ),
  }
}
