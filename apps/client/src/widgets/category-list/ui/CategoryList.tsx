import type { ReactNode } from 'react'

import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import type { Category } from '@/entities/category/model/types'
import { CategoryCard } from '@/entities/category/ui/CategoryCard'
import { ItemsList } from '@/shared/ui'

import { categoryListGridClassName } from '../lib/categoryListLayout'

export type CategoryListProps = {
  className?: string
  headerEnd?: ReactNode
  onEdit?: (category: Category) => void
}

export function CategoryList({
  className,
  headerEnd,
  onEdit,
}: CategoryListProps) {
  const { data, isPending, isError, error, isFetching } = useCategoriesQuery()

  return (
    <ItemsList
      className={className}
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={isFetching}
      headerEnd={headerEnd}
      emptyMessage="Пока нет категорий. Добавьте первую."
      errorFallback="Не удалось загрузить категории"
      listAnimateEnter={false}
      listClassName={categoryListGridClassName}
    >
      {(items) =>
        items.map((category) => (
          <li key={category.id} className="min-w-0">
            <CategoryCard category={category} onEdit={onEdit} />
          </li>
        ))
      }
    </ItemsList>
  )
}
