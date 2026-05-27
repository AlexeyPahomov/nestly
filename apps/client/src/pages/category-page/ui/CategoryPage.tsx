import { useState } from 'react'

import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { CategoryFormDialog } from '@/features/create-category/ui/CategoryFormDialog'
import type { Category } from '@/entities/category/model/types'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { AddButton, Fab, PageSection } from '@/shared/ui'
import { CategoryList } from '@/widgets/category-list'

import {
  categoryPageListShellClassName,
  categoryPageSectionClassName,
  categoryPageShellClassName,
} from '../lib/categoryPageLayout'
import { useCategoryFormDialog } from '../model/useCategoryFormDialog'
import { useCategoryPageListLayout } from '../model/useCategoryPageListLayout'

export function CategoryPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const isMobile = useIsMobile()
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
  } = useCategoriesQuery()
  const dialog = useCategoryFormDialog(editingCategory, () =>
    setEditingCategory(null),
  )
  const listLayout = useCategoryPageListLayout()
  const isLoading = isPending || isFetching

  return (
    <PageSection
      title="Категории"
      titleLoading={isLoading}
      className={categoryPageSectionClassName}
    >
      <div className={categoryPageShellClassName}>
        <div className={categoryPageListShellClassName}>
          <CategoryList
            className="min-h-0 flex-1 max-md:flex-none"
            data={data}
            isPending={isPending}
            isError={isError}
            error={error}
            isFetching={false}
            layout={listLayout}
            headerEnd={
              isMobile ? undefined : (
                <AddButton onClick={dialog.openForAdd}>
                  Добавить категорию
                </AddButton>
              )
            }
            onEdit={setEditingCategory}
          />
        </div>
      </div>

      <Fab label="Добавить категорию" onClick={dialog.openForAdd} />

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
