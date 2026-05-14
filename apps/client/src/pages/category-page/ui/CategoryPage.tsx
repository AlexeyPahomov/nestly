import { CreateCategoryForm } from '@/features/create-category/ui/CreateCategoryForm'
import { PageSection } from '@/shared/ui'
import { CategoryList } from '@/widgets/category-list'

export function CategoryPage() {
  return (
    <PageSection title="Категории">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="shrink-0">
          <CreateCategoryForm />
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <CategoryList />
        </div>
      </div>
    </PageSection>
  )
}
