import { Pencil, Trash2 } from 'lucide-react'

import type { Expense } from '@/entities/expense/model/types'
import type { CategoryType } from '@nestly/shared'
import { formatAmount, formatExpenseDate } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Button, Card, CardContent } from '@/shared/ui'

import { ExpenseCategoryBadge } from './ExpenseCategoryBadge'

type ExpenseCardProps = {
  expense: Expense
  categoryName: string
  categoryType: CategoryType
  onEdit?: () => void
  onDelete?: () => void
  isDeleting?: boolean
  isEditing?: boolean
}

export function ExpenseCard({
  expense,
  categoryName,
  categoryType,
  onEdit,
  onDelete,
  isDeleting = false,
  isEditing = false,
}: ExpenseCardProps) {
  const description = expense.description?.trim()
  const hasActions = onEdit != null || onDelete != null

  return (
    <Card
      size="sm"
      className={cn(
        'group transition-colors hover:bg-zinc-50/90 hover:ring-zinc-300/80',
        isEditing && 'ring-2 ring-zinc-900',
      )}
    >
      <CardContent className="flex flex-nowrap items-center gap-2 py-2.5 sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <ExpenseCategoryBadge
            name={categoryName}
            categoryType={categoryType}
          />
          {description ? (
            <span className="min-w-0 truncate text-sm text-muted-foreground">
              {description}
            </span>
          ) : null}
        </div>

        <span className="shrink-0 text-right text-lg font-bold tabular-nums text-zinc-900">
          {formatAmount(expense.amount)}
        </span>

        {hasActions ? (
          <div
            className={cn(
              'flex shrink-0 items-center gap-0.5 transition-opacity',
              'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
            )}
          >
            {onEdit ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-zinc-500 hover:text-zinc-900"
                aria-label="Изменить расход"
                disabled={isDeleting}
                onClick={(event) => {
                  event.stopPropagation()
                  onEdit()
                }}
              >
                <Pencil />
              </Button>
            ) : null}
            {onDelete ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-zinc-500 hover:text-destructive"
                aria-label="Удалить расход"
                disabled={isDeleting}
                isLoading={isDeleting}
                onClick={(event) => {
                  event.stopPropagation()
                  onDelete()
                }}
              >
                <Trash2 />
              </Button>
            ) : null}
          </div>
        ) : null}

        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {formatExpenseDate(expense.date)}
        </span>
      </CardContent>
    </Card>
  )
}
