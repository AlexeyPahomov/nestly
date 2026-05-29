import { CategoryFormDialog } from '@/features/create-category/ui/CategoryFormDialog'
import { useDesktopPageSectionTitle } from '@/shared/hooks/use-desktop-page-section-title'
import { Fab, PageContentLoader, PageSection } from '@/shared/ui'
import { CategoryList } from '@/widgets/category-list'

import {
  categoryPageListClassName,
  categoryPageListShellClassName,
  categoryPageSectionClassName,
  categoryPageShellClassName,
} from '../lib/categoryPageLayout'
import { useCategoryPage } from '../model/useCategoryPage'

export function CategoryPage() {
  const pageTitle = useDesktopPageSectionTitle('Категории')
  const page = useCategoryPage()
  const { data, isPending, isError, error } = page.categoriesQuery

  return (
    <PageSection title={pageTitle} className={categoryPageSectionClassName}>
      <div className={categoryPageShellClassName}>
        {page.isLoading ? (
          <PageContentLoader />
        ) : (
          <div className={categoryPageListShellClassName}>
            <CategoryList
              className={categoryPageListClassName}
              data={data}
              isPending={isPending}
              isError={isError}
              error={error}
              layout={page.listLayout}
              onEdit={page.onEditCategory}
              onAdd={page.onAddCategory}
            />
          </div>
        )}
      </div>

      {!page.isLoading ? (
        <Fab label={page.fab.label} onClick={page.fab.onClick} />
      ) : null}

      <CategoryFormDialog {...page.formDialog} />
    </PageSection>
  )
}
