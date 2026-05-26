import type { CategoryType } from '@nestly/shared'

import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { cn } from '@/shared/lib/utils'

type ExpenseCategoryBadgeProps = {
  name: string
  categoryType: CategoryType
  icon?: string | null
}

const expenseIconWrapClassName = 'bg-blue-subtle ring-blue-muted'
const expenseIconClassName = 'text-blue'
const savingsIconWrapClassName = 'bg-green-subtle ring-green-muted'
const savingsIconClassName = 'text-green'

export function ExpenseCategoryBadge({
  name,
  categoryType,
  icon,
}: ExpenseCategoryBadgeProps) {
  const isSavings = isSavingsCategory(categoryType)

  return (
    <span className="inline-flex min-w-0 max-w-full items-center gap-2.5">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
          isSavings ? savingsIconWrapClassName : expenseIconWrapClassName,
        )}
      >
        <CategoryLucideIcon
          categoryName={name}
          categoryType={categoryType}
          icon={icon}
          className={cn(
            'size-4',
            isSavings ? savingsIconClassName : expenseIconClassName,
          )}
          aria-hidden
        />
      </span>
      <span
        className={cn(
          'truncate text-sm font-semibold',
          isSavings ? 'text-green' : 'text-slate',
        )}
      >
        {name}
      </span>
    </span>
  )
}
