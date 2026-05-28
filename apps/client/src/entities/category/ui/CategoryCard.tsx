import { useCallback } from 'react'
import { Pencil } from 'lucide-react'

import { CATEGORY_TYPE_LABELS } from '@coffer/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import {
  categoryCardPressableClassName,
  categoryCardPressingClassName,
  categoryTileCardClassName,
} from '@/entities/category/lib/categoryTileLayout'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { Category } from '@/entities/category/model/types'
import { CategoryTileShell } from '@/entities/category/ui/CategoryTileShell'
import { useCardActivate } from '@/shared/hooks/use-card-activate'
import { useLongPress } from '@/shared/hooks/use-long-press'
import { cn } from '@/shared/lib/utils'
import { Card, IconColorAvatar } from '@/shared/ui'

const editPencilClassName =
  'absolute top-2 right-2 hidden cursor-pointer items-center justify-center rounded-md bg-white/90 p-1 text-zinc-500 opacity-0 shadow-sm ring-1 ring-zinc-200/80 transition-opacity duration-150 md:flex md:group-hover/category-card:opacity-100'

type CategoryCardProps = {
  category: Category
  onEdit?: (category: Category) => void
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const handleEdit = useCallback(() => {
    onEdit?.(category)
  }, [category, onEdit])

  const isEditable = onEdit != null

  const { isPressing, longPressHandlers } = useLongPress({
    onLongPress: handleEdit,
    disabled: !isEditable,
  })

  const activateProps = useCardActivate(handleEdit, {
    contextMenu: isEditable,
    ariaLabel: isEditable
      ? `${category.name}, ${CATEGORY_TYPE_LABELS[category.type]}. Удерживайте для редактирования.`
      : undefined,
  })

  return (
    <Card
      size="sm"
      className={cn(
        categoryTileCardClassName,
        isEditable && 'group/category-card',
        isEditable && categoryCardPressableClassName,
        isPressing && categoryCardPressingClassName,
      )}
      {...(isEditable ? activateProps : {})}
      {...(isEditable ? longPressHandlers : {})}
    >
      {isEditable ? (
        <span className={editPencilClassName} aria-hidden>
          <Pencil className="size-3.5" />
        </span>
      ) : null}
      <CategoryTileShell
        icon={
          <IconColorAvatar iconColor={category.icon_color} className="size-12">
            {(iconClassName) => (
              <CategoryLucideIcon
                {...toCategoryLucideIconProps(category)}
                className={cn('size-6', iconClassName)}
                aria-hidden
              />
            )}
          </IconColorAvatar>
        }
        title={category.name}
        subtitle={CATEGORY_TYPE_LABELS[category.type]}
      />
    </Card>
  )
}
