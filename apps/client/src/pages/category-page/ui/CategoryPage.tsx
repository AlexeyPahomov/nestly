import { CreateCategoryForm } from '@/features/create-category/ui/CreateCategoryForm'
import { PageSection } from '@/shared/ui'

export function CategoryPage() {
  return (
    <PageSection title="Категории">
      <div className="shrink-0">
        <CreateCategoryForm />
      </div>
    </PageSection>
  )
}
