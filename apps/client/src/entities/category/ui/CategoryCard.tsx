import { useCallback } from 'react'

import { CATEGORY_TYPE_LABELS } from '@coffer/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import {
  categoryCardPressableClassName,
  categoryCardPressingClassName,
} from '@/entities/category/lib/categoryCardLayout'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { Category } from '@/entities/category/model/types'
import { useLongPress } from '@/shared/hooks/use-long-press'
import { cn } from '@/shared/lib/utils'
import { Card, IconColorAvatar } from '@/shared/ui'

type CategoryCardProps = {
  category: Category
  onEdit?: (category: Category) => void
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const handleEdit = useCallback(() => {
    onEdit?.(category)
  }, [category, onEdit])

  const { isPressing, longPressHandlers } = useLongPress({
    onLongPress: handleEdit,
    disabled: !onEdit,
  })

  const isEditable = onEdit != null

  return (
    <Card
      size="sm"
      className={cn(
        'relative h-full gap-0 py-0 transition-[transform,background-color,box-shadow] duration-150',
        isEditable && categoryCardPressableClassName,
        isPressing && categoryCardPressingClassName,
      )}
      tabIndex={isEditable ? 0 : undefined}
      role={isEditable ? 'button' : undefined}
      aria-label={
        isEditable
          ? `${category.name}, ${CATEGORY_TYPE_LABELS[category.type]}. Удерживайте для редактирования.`
          : undefined
      }
      onContextMenu={
        isEditable
          ? (event) => {
              event.preventDefault()
              handleEdit()
            }
          : undefined
      }
      onKeyDown={
        isEditable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleEdit()
              }
            }
          : undefined
      }
      {...longPressHandlers}
    >
      <div className="flex flex-col items-center gap-2.5 px-3 py-4 text-center">
        <IconColorAvatar iconColor={category.icon_color} className="size-12">
          {(iconClassName) => (
            <CategoryLucideIcon
              {...toCategoryLucideIconProps(category)}
              className={cn('size-6', iconClassName)}
              aria-hidden
            />
          )}
        </IconColorAvatar>

        <div className="flex w-full min-w-0 flex-col gap-0.5">
          <p className="truncate text-sm font-semibold leading-snug text-zinc-900">
            {category.name}
          </p>
          <p className="truncate text-xs leading-snug text-zinc-500">
            {CATEGORY_TYPE_LABELS[category.type]}
          </p>
        </div>
      </div>
    </Card>
  )
}
