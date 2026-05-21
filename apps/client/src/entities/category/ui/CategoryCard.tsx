import { Pencil } from 'lucide-react'

import { CATEGORY_TYPE_LABELS } from '@nestly/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import type { Category } from '@/entities/category/model/types'
import { Button, Card } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

type CategoryCardProps = {
  category: Category
  onEdit?: (category: Category) => void
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        'group gap-0 py-0 transition-colors hover:bg-zinc-50/60',
      )}
    >
      <div className="flex items-center gap-3 px-3 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80">
          <CategoryLucideIcon
            {...toCategoryLucideIconProps(category)}
            className="size-5"
            aria-hidden
          />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="truncate text-sm font-semibold leading-snug text-zinc-900">
            {category.name}
          </p>
          <p className="text-xs leading-snug text-zinc-500">
            {CATEGORY_TYPE_LABELS[category.type]}
          </p>
        </div>

        {onEdit ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-zinc-400 opacity-100 transition-opacity group-hover:text-zinc-700 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={`Редактировать «${category.name}»`}
            onClick={() => onEdit(category)}
          >
            <Pencil />
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
