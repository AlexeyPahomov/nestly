import { useState } from 'react'

import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import type { Category } from '@/entities/category/model/types'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { usePageListLayout } from '@/shared/hooks/use-page-list-layout'
import { useCategoryFormDialog } from './useCategoryFormDialog'

export function useCategoryPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const isMobile = useIsMobile()
  const categoriesQuery = useCategoriesQuery()
  const dialog = useCategoryFormDialog(editingCategory, () =>
    setEditingCategory(null),
  )
  const listLayout = usePageListLayout()

  return {
    categoriesQuery,
    listLayout,
    onEditCategory: setEditingCategory,
    onAddCategory: isMobile ? undefined : dialog.openForAdd,
    formDialog: {
      open: dialog.isOpen,
      onOpenChange: dialog.onOpenChange,
      isEditing: dialog.isEditing,
      onClose: dialog.close,
      editingCategory,
    },
    fab: {
      label: 'Добавить категорию',
      onClick: dialog.openForAdd,
    },
  }
}
