import { ItemsList } from '@/shared/ui'

import type { CategoryBudgetListItem } from '../model/types'

import { CategoryBudgetCard } from './CategoryBudgetCard'

export type CategoryBudgetListProps = {
  budgetItems?: CategoryBudgetListItem[]
  isPending: boolean
  isError: boolean
  error: unknown
  isFetching?: boolean
  selectedCategoryId?: string | null
  onCategorySelect?: (categoryId: string) => void
  className?: string
}

export function CategoryBudgetList({
  budgetItems,
  isPending,
  isError,
  error,
  isFetching = false,
  selectedCategoryId,
  onCategorySelect,
  className,
}: CategoryBudgetListProps) {
  return (
    <ItemsList
      className={className}
      isPending={isPending}
      isError={isError}
      error={error}
      data={budgetItems}
      isFetching={isFetching}
      title="По категориям"
      emptyMessage="Нет категорий расходов или накоплений."
      errorFallback="Не удалось загрузить бюджет"
    >
      {(items) =>
        items.map((item) => (
          <li key={item.category.id}>
            <CategoryBudgetCard
              item={item}
              selected={selectedCategoryId === item.category.id}
              onSelect={onCategorySelect}
            />
          </li>
        ))
      }
    </ItemsList>
  )
}
