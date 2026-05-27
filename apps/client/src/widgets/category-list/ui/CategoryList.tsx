import type { Category } from '@/entities/category/model/types'
import { AddCategoryCard } from '@/entities/category/ui/AddCategoryCard'
import { CategoryCard } from '@/entities/category/ui/CategoryCard'
import { ItemsList } from '@/shared/ui'
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'

import {
  CATEGORY_LIST_EMPTY_MESSAGE,
  CATEGORY_LIST_ERROR_FALLBACK,
} from '../lib/categoryListCopy'
import {
  categoryListGridClassName,
  categoryListItemClassName,
} from '../lib/categoryListLayout'

export type CategoryListProps = {
  className?: string
  data: Category[] | undefined
  isPending: boolean
  isError: boolean
  error: unknown
  layout?: ItemsListLayout
  onEdit?: (category: Category) => void
  /** Плитка «Новая категория» в конце сетки (десктоп). */
  onAdd?: () => void
}

export function CategoryList({
  className,
  data,
  isPending,
  isError,
  error,
  layout = 'fill',
  onEdit,
  onAdd,
}: CategoryListProps) {
  const showAddTile = onAdd != null

  return (
    <ItemsList
      className={className}
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={false}
      showPendingLoader={false}
      forceShowList={showAddTile}
      emptyMessage={showAddTile ? undefined : CATEGORY_LIST_EMPTY_MESSAGE}
      errorFallback={CATEGORY_LIST_ERROR_FALLBACK}
      layout={layout}
      listAnimateEnter={false}
      listClassName={categoryListGridClassName}
    >
      {(items) => (
        <>
          {items.map((category) => (
            <li key={category.id} className={categoryListItemClassName}>
              <CategoryCard category={category} onEdit={onEdit} />
            </li>
          ))}
          {showAddTile ? (
            <li className={categoryListItemClassName}>
              <AddCategoryCard onClick={onAdd} />
            </li>
          ) : null}
        </>
      )}
    </ItemsList>
  )
}
