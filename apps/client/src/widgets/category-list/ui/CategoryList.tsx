import type { ReactNode } from 'react'

import type { Category } from '@/entities/category/model/types'
import { CategoryCard } from '@/entities/category/ui/CategoryCard'
import { ItemsList } from '@/shared/ui'
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'

import { categoryListGridClassName } from '../lib/categoryListLayout'

export type CategoryListProps = {
  className?: string
  data: Category[] | undefined
  isPending: boolean
  isError: boolean
  error: unknown
  headerEnd?: ReactNode
  layout?: ItemsListLayout
  onEdit?: (category: Category) => void
}

export function CategoryList({
  className,
  data,
  isPending,
  isError,
  error,
  headerEnd,
  layout = 'fill',
  onEdit,
}: CategoryListProps) {
  return (
    <ItemsList
      className={className}
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={false}
      showPendingLoader={false}
      headerEnd={headerEnd}
      emptyMessage="Пока нет категорий. Добавьте первую."
      errorFallback="Не удалось загрузить категории"
      layout={layout}
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
