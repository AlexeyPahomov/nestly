import { useState } from 'react'

import { CategoryFormDialog } from '@/features/create-category/ui/CategoryFormDialog'
import type { Category } from '@/entities/category/model/types'
import { Button, PageSection, primaryActionButtonClassName } from '@/shared/ui'
import { CategoryList } from '@/widgets/category-list'

import { useCategoryFormDialog } from '../model/useCategoryFormDialog'

export function CategoryPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const dialog = useCategoryFormDialog(editingCategory, () =>
    setEditingCategory(null),
  )

  return (
    <PageSection title="Категории" className="min-h-0 gap-4">
      <div className="flex min-h-0 flex-1 flex-col">
        <CategoryList
          className="min-h-0 flex-1"
          headerEnd={
            <Button
              type="button"
              size="lg"
              className={primaryActionButtonClassName}
              onClick={dialog.openForAdd}
            >
              Добавить категорию
            </Button>
          }
          onEdit={setEditingCategory}
        />
      </div>

      <CategoryFormDialog
        open={dialog.isOpen}
        onOpenChange={dialog.onOpenChange}
        isEditing={dialog.isEditing}
        onClose={dialog.close}
        editingCategory={editingCategory}
      />
    </PageSection>
  )
}
