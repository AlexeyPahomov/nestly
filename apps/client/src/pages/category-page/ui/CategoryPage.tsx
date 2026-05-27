import { CategoryFormDialog } from '@/features/create-category/ui/CategoryFormDialog'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { AddButton, Fab, fabDesktopAddButtonClassName, PageSection } from '@/shared/ui'
import { CategoryList } from '@/widgets/category-list'

import {
  categoryPageListShellClassName,
  categoryPageSectionClassName,
  categoryPageShellClassName,
} from '../lib/categoryPageLayout'
import { useCategoryPage } from '../model/useCategoryPage'

export function CategoryPage() {
  const page = useCategoryPage()
  const isMobile = useIsMobile()
  const { data, isPending, isError, error } = page.categoriesQuery

  return (
    <PageSection
      title="Категории"
      titleLoading={page.isLoading}
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
            layout={page.listLayout}
            headerEnd={
              isMobile ? undefined : (
                <AddButton
                  className={fabDesktopAddButtonClassName}
                  onClick={page.dialog.openForAdd}
                >
                  Добавить категорию
                </AddButton>
              )
            }
            onEdit={page.setEditingCategory}
          />
        </div>
      </div>

      <Fab
        label="Добавить категорию"
        onClick={page.dialog.openForAdd}
      />

      <CategoryFormDialog
        open={page.dialog.isOpen}
        onOpenChange={page.dialog.onOpenChange}
        isEditing={page.dialog.isEditing}
        onClose={page.dialog.close}
        editingCategory={page.editingCategory}
      />
    </PageSection>
  )
}
