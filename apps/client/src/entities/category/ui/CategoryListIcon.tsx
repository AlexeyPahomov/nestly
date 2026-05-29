import { resolveIconColorTone } from '@/shared/lib/iconColorStyles'
import { cn } from '@/shared/lib/utils'

import { CategoryLucideIcon } from '../lib/categoryIcon'
import { toCategoryLucideIconProps } from '../lib/categoryLucideIconProps'
import type { Category } from '../model/types'

type CategoryListIconProps = {
  category: Pick<Category, 'name' | 'type' | 'icon' | 'icon_color'>
  className?: string
  iconClassName?: string
}

/** Небольшая иконка категории в выбранном цвете (без кружка). */
export function CategoryListIcon({
  category,
  className,
  iconClassName,
}: CategoryListIconProps) {
  const tone = resolveIconColorTone(category.icon_color)

  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      aria-hidden
    >
      <CategoryLucideIcon
        {...toCategoryLucideIconProps(category)}
        className={cn('size-4', tone.iconClassName, iconClassName)}
        aria-hidden
      />
    </span>
  )
}
