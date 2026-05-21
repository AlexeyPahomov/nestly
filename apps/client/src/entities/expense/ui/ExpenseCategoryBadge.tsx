import type { CategoryType } from '@nestly/shared'
import {
  Building2,
  Home,
  Landmark,
  LandPlot,
  ShoppingCart,
  Trees,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import { createElement } from 'react'

import { isSavingsCategory } from '@/entities/category/lib/categoryKind'
import { cn } from '@/shared/lib/utils'

type ExpenseCategoryBadgeProps = {
  name: string
  categoryType: CategoryType
  categoryId?: string
}

const EXPENSE_ICONS: LucideIcon[] = [
  Home,
  LandPlot,
  Trees,
  Building2,
  ShoppingCart,
  Wallet,
]

function hashId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function getExpenseCategoryIcon(
  categoryType: CategoryType,
  categoryId?: string,
): LucideIcon {
  if (isSavingsCategory(categoryType)) {
    return Landmark
  }
  if (!categoryId) {
    return ShoppingCart
  }
  return EXPENSE_ICONS[hashId(categoryId) % EXPENSE_ICONS.length]
}

function ExpenseCategoryIcon({
  categoryType,
  categoryId,
  ...props
}: LucideProps & { categoryType: CategoryType; categoryId?: string }) {
  return createElement(
    getExpenseCategoryIcon(categoryType, categoryId),
    props,
  )
}

const savingsStyles =
  'bg-emerald-50 text-emerald-800 ring-emerald-200/80'
const expenseStyles = 'bg-blue-50 text-blue-700 ring-blue-200/80'

export function ExpenseCategoryBadge({
  name,
  categoryType,
  categoryId,
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
        <ExpenseCategoryIcon
          categoryType={categoryType}
          categoryId={categoryId}
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
