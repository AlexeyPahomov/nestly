import type { ReactNode } from 'react'

import {
  categoryTileContentClassName,
  categoryTileMetaClassName,
  categoryTileSubtitleClassName,
  categoryTileTitleClassName,
} from '@/entities/category/lib/categoryTileLayout'
import { cn } from '@/shared/lib/utils'

type CategoryTileShellProps = {
  icon: ReactNode
  title: string
  subtitle: string
  titleClassName?: string
  subtitleClassName?: string
  className?: string
}

export function CategoryTileShell({
  icon,
  title,
  subtitle,
  titleClassName = categoryTileTitleClassName,
  subtitleClassName = categoryTileSubtitleClassName,
  className,
}: CategoryTileShellProps) {
  return (
    <div className={cn(categoryTileContentClassName, className)}>
      {icon}
      <div className={categoryTileMetaClassName}>
        <p className={titleClassName}>{title}</p>
        <p className={subtitleClassName}>{subtitle}</p>
      </div>
    </div>
  )
}
