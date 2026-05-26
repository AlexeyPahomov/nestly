import { Lock, LockOpen, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { cancelMenuItemClassName } from '@/shared/lib/cancelMenuItemLayout'
import { formatAmount } from '@/shared/lib/format'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import {
  plannedExpensePlannedBadgeClassName,
  plannedExpensePlannedBadgeStaticClassName,
  plannedExpenseReserveMenuItemClassName,
  plannedExpenseUnreserveMenuItemClassName,
  plannedExpenseReservedBadgeClassName,
  plannedExpenseReservedBadgeStaticClassName,
} from '../lib/plannedExpenseCardLayout'
import { remainingToReserve } from '../lib/remainingToReserve'
import { PLANNED_EXPENSE_STATUS_LABELS } from '../lib/plannedExpenseStatus'
import type { PlannedExpense } from '../model/types'

const statusBadgeInteractiveClassName =
  'rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200/80 disabled:pointer-events-none disabled:opacity-50'

const statusBadgeStaticClassName =
  'rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600'

export type PlannedExpenseCardProps = {
  item: PlannedExpense
  onReserve?: (id: string) => void
  onCancelPlan?: (id: string) => void
  onUnreserve?: (id: string) => void
  onEdit?: (item: PlannedExpense) => void
  reservePending?: boolean
}

export function PlannedExpenseCard({
  item,
  onReserve,
  onCancelPlan,
  onUnreserve,
  onEdit,
  reservePending,
}: PlannedExpenseCardProps) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const reserveLeft = remainingToReserve(item)
  const showReserve = item.status === 'PLANNED' && onReserve != null
  const showCancelPlan = item.status === 'PLANNED' && onCancelPlan != null
  const showPlannedMenu =
    item.status === 'PLANNED' &&
    (showReserve || onEdit != null || showCancelPlan)
  const showUnreserveMenu = item.reserved_amount > 0 && onUnreserve != null
  const statusLabel = PLANNED_EXPENSE_STATUS_LABELS[item.status]

  const closeStatusMenu = () => setStatusMenuOpen(false)

  const statusBadgeClassName =
    item.status === 'RESERVED' && showUnreserveMenu
      ? plannedExpenseReservedBadgeClassName
      : showPlannedMenu
        ? plannedExpensePlannedBadgeClassName
        : statusBadgeInteractiveClassName

  return (
    <Card className="gap-1 border-zinc-200/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-0">
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {showPlannedMenu || showUnreserveMenu ? (
            <Popover open={statusMenuOpen} onOpenChange={setStatusMenuOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={reservePending}
                  className={statusBadgeClassName}
                  aria-label={`Статус: ${statusLabel}. Действия`}
                >
                  {statusLabel}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-1">
                {showReserve ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={plannedExpenseReserveMenuItemClassName}
                    disabled={reservePending}
                    onClick={() => {
                      closeStatusMenu()
                      onReserve(item.id)
                    }}
                  >
                    <Lock className="size-4 shrink-0" />
                    Зарезервировать
                  </Button>
                ) : null}
                {showPlannedMenu && onEdit ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    disabled={reservePending}
                    onClick={() => {
                      closeStatusMenu()
                      onEdit(item)
                    }}
                  >
                    <Pencil className="size-4" />
                    Изменить
                  </Button>
                ) : null}
                {showPlannedMenu && showCancelPlan ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cancelMenuItemClassName}
                    disabled={reservePending}
                    onClick={() => {
                      closeStatusMenu()
                      onCancelPlan(item.id)
                    }}
                  >
                    <Trash2 className="size-4 shrink-0" />
                    Отменить план
                  </Button>
                ) : null}
                {showUnreserveMenu && !showPlannedMenu ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={plannedExpenseUnreserveMenuItemClassName}
                    disabled={reservePending}
                    onClick={() => {
                      closeStatusMenu()
                      onUnreserve(item.id)
                    }}
                  >
                    <LockOpen className="size-4 shrink-0" />
                    Снять резерв
                  </Button>
                ) : null}
              </PopoverContent>
            </Popover>
          ) : (
            <span
              className={
                item.status === 'RESERVED'
                  ? plannedExpenseReservedBadgeStaticClassName
                  : item.status === 'PLANNED'
                    ? plannedExpensePlannedBadgeStaticClassName
                    : statusBadgeStaticClassName
              }
            >
              {statusLabel}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-0 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-900">{formatAmount(item.amount)}</p>
        {item.reserved_amount > 0 ? (
          <p className="text-xs text-zinc-500">
            В резерве: {formatAmount(item.reserved_amount)}
            {reserveLeft > 0
              ? ` · осталось зарезервировать ${formatAmount(reserveLeft)}`
              : null}
          </p>
        ) : null}
        {item.description ? <p>{item.description}</p> : null}
        <p>
          {new Date(item.planned_date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </CardContent>
    </Card>
  )
}
