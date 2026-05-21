import type { CategoryType } from '@nestly/shared'
import type { LucideProps } from 'lucide-react'
import { createElement } from 'react'

import {
  resolveCategoryIconKey,
  resolveCategoryLucideIcon,
} from './categoryIcons'

export type CategoryLucideIconProps = LucideProps & {
  categoryName: string
  categoryType: CategoryType
  icon?: string | null
}

export function CategoryLucideIcon({
  categoryName,
  categoryType,
  icon,
  ...props
}: CategoryLucideIconProps) {
  return createElement(
    resolveCategoryLucideIcon(icon, categoryName, categoryType),
    props,
  )
}

export { resolveCategoryIconKey, resolveCategoryLucideIcon }
