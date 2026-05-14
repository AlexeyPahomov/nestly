import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import { CategoryCard } from '@/entities/category/ui/CategoryCard'
import { ItemsList } from '@/shared/ui'

export function CategoryList() {
  const { data, isPending, isError, error, isFetching } = useCategoriesQuery()

  return (
    <ItemsList
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={isFetching}
      title="Список категорий"
      emptyMessage="Пока нет категорий. Добавьте первую."
      errorFallback="Не удалось загрузить категории"
    >
      {(items) =>
        items.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))
      }
    </ItemsList>
  )
}
