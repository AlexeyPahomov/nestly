import { cn } from '@/shared/lib/utils'

import type { Category } from '../model/types'
import { CategoryListIcon } from './CategoryListIcon'

type CategoryNameWithIconProps = {
  category: Pick<Category, 'name' | 'type' | 'icon' | 'icon_color'>
  className?: string
  iconClassName?: string
}

export function CategoryNameWithIcon({
  category,
  className,
  iconClassName,
}: CategoryNameWithIconProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2', className)}>
      <CategoryListIcon
        category={category}
        className="shrink-0"
        iconClassName={iconClassName}
      />
      <span className="truncate">{category.name}</span>
    </span>
  )
}
