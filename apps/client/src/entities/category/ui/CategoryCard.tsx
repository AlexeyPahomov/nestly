import { Pencil } from 'lucide-react'

import { CATEGORY_TYPE_LABELS } from '@nestly/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { Category } from '@/entities/category/model/types'
import { cn } from '@/shared/lib/utils'
import { Button, Card, IconColorAvatar } from '@/shared/ui'

type CategoryCardProps = {
  category: Category
  onEdit?: (category: Category) => void
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        'group relative h-full gap-0 py-0 transition-colors hover:bg-zinc-50/60',
      )}
    >
      <div className="flex flex-col items-center gap-2.5 px-3 py-4 text-center">
        {onEdit ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1.5 right-1.5 text-zinc-400 opacity-100 transition-opacity group-hover:text-zinc-700 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={`Редактировать «${category.name}»`}
            onClick={() => onEdit(category)}
          >
            <Pencil />
          </Button>
        ) : null}

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
