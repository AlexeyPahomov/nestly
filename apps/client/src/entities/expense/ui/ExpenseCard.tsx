import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import type { Expense } from '@/entities/expense/model/types'
import { cancelMenuItemClassName } from '@/shared/lib/cancelMenuItemLayout'
import type { CategoryType } from '@nestly/shared'
import { formatExpenseDate, formatMoneyWithRub } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover/Popover'

import { ExpenseCategoryBadge } from './ExpenseCategoryBadge'

type ExpenseCardProps = {
  expense: Expense
  categoryName: string
  categoryType: CategoryType
  categoryIcon?: string | null
  onEdit?: () => void
  onDelete?: () => void
  isDeleting?: boolean
}

export function ExpenseCard({
  expense,
  categoryName,
  categoryType,
  categoryIcon,
  onEdit,
  onDelete,
  isDeleting = false,
}: ExpenseCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const description = expense.description?.trim()
  const hasActions = onEdit != null || onDelete != null

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl bg-white px-3 py-3 ring-1 ring-zinc-200/80',
        'transition-colors hover:bg-zinc-50/60',
      )}
    >
      <ExpenseCategoryBadge
        name={categoryName}
        categoryType={categoryType}
        icon={categoryIcon}
      />

      {description ? (
        <span className="hidden min-w-0 flex-1 truncate text-sm text-zinc-500 sm:block">
          {description}
        </span>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}

      <span className="shrink-0 text-base font-bold tabular-nums text-slate">
        {formatMoneyWithRub(expense.amount)}
      </span>

      <span className="hidden shrink-0 text-sm tabular-nums text-zinc-500 md:inline">
        {formatExpenseDate(expense.date)}
      </span>

      {hasActions ? (
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-zinc-400 hover:text-zinc-700"
              aria-label="Действия с расходом"
              disabled={isDeleting}
            >
              <MoreVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 p-1">
            {onEdit ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                disabled={isDeleting}
                onClick={() => {
                  setMenuOpen(false)
                  onEdit()
                }}
              >
                <Pencil className="size-4" />
                Изменить
              </Button>
            ) : null}
            {onDelete ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cancelMenuItemClassName}
                disabled={isDeleting}
                isLoading={isDeleting}
                onClick={() => {
                  setMenuOpen(false)
                  onDelete()
                }}
              >
                <Trash2 className="size-4 shrink-0" />
                Удалить
              </Button>
            ) : null}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )
}
