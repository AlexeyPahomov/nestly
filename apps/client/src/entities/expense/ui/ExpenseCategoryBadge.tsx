import type { CategoryType } from '@nestly/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { cn } from '@/shared/lib/utils'

type ExpenseCategoryBadgeProps = {
  name: string
  categoryType: CategoryType
  categoryId?: string
}

const savingsStyles =
  'bg-emerald-50 text-emerald-800 ring-emerald-200/80'
const expenseStyles = 'bg-blue-50 text-blue-700 ring-blue-200/80'

export function ExpenseCategoryBadge({
  name,
  categoryType,
}: ExpenseCategoryBadgeProps) {
  const isSavings = isSavingsCategory(categoryType)

  return (
    <span className="inline-flex min-w-0 max-w-full items-center gap-2.5">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
          isSavings ? savingsStyles : expenseStyles,
        )}
      >
        <CategoryLucideIcon
          categoryName={name}
          categoryType={categoryType}
          className="size-4"
          aria-hidden
        />
      </span>
      <span
        className={cn(
          'truncate text-sm font-semibold',
          isSavings ? 'text-emerald-800' : 'text-zinc-900',
        )}
      >
        {name}
      </span>
    </span>
  )
}
