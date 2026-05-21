import type { CategoryType } from '@nestly/shared'

import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { cn } from '@/shared/lib/utils'

type ExpenseCategoryBadgeProps = {
  name: string
  categoryType: CategoryType
}

export function ExpenseCategoryBadge({
  name,
  categoryType,
}: ExpenseCategoryBadgeProps) {
  const isSavings = isSavingsCategory(categoryType)

  return (
    <span
      className={cn(
        'inline-flex max-w-[10rem] shrink-0 items-center truncate rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        isSavings
          ? 'bg-emerald-50 text-emerald-800 ring-emerald-200/80'
          : 'bg-zinc-100 text-zinc-700 ring-zinc-200/80',
      )}
    >
      {name}
    </span>
  )
}
