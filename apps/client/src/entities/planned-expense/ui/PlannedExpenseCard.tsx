import { Lock, LockOpen, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { cancelMenuItemClassName } from '@/shared/lib/cancelMenuItemLayout'
import { formatAmount } from '@/shared/lib/format'
import {
  Badge,
  Button,
  Card,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import {
  plannedExpenseAmountClassName,
  plannedExpenseCardBodyClassName,
  plannedExpenseCardClassName,
  plannedExpenseCardContextClassName,
  plannedExpenseCardStatusBadgeClassName,
  plannedExpenseCardTitleClassName,
  plannedExpensePlannedBadgeClassName,
  plannedExpensePlannedBadgeStaticClassName,
  plannedExpenseReserveMenuItemClassName,
  plannedExpenseUnreserveMenuItemClassName,
  plannedExpenseReservedBadgeClassName,
  plannedExpenseReservedBadgeStaticClassName,
} from '../lib/plannedExpenseCardLayout'
import { PLANNED_EXPENSE_STATUS_LABELS } from '../lib/plannedExpenseStatus'
import type { PlannedExpenseStatusMutationArgs } from '../lib/fullReserveMutationArgs'
import type { PlannedExpense } from '../model/types'

const statusBadgeInteractiveClassName =
  'rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 disabled:pointer-events-none disabled:opacity-50'

const statusBadgeStaticClassName = 'rounded-md bg-zinc-100 text-zinc-600'

export type PlannedExpenseCardProps = {
  item: PlannedExpense
  onReserve?: (id: string) => void
  onCancelPlan?: (id: string) => void
  onUnreserve?: (id: string) => void
  onEdit?: (item: PlannedExpense) => void
  pendingStatusMutation?: PlannedExpenseStatusMutationArgs
}

export function PlannedExpenseCard({
  item,
  onReserve,
  onCancelPlan,
  onUnreserve,
  onEdit,
  pendingStatusMutation,
}: PlannedExpenseCardProps) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusMutationPending = pendingStatusMutation != null
  const isPendingForItem = pendingStatusMutation?.id === item.id
  const isReserveLoading =
    isPendingForItem && pendingStatusMutation?.status === 'RESERVED'
  const isUnreserveLoading =
    isPendingForItem &&
    pendingStatusMutation?.status === 'PLANNED' &&
    pendingStatusMutation.reserveAmount === 0
  const isCancelPlanLoading =
    isPendingForItem && pendingStatusMutation?.status === 'CANCELLED'
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

  const statusBadge =
    showPlannedMenu || showUnreserveMenu ? (
      <Popover open={statusMenuOpen} onOpenChange={setStatusMenuOpen}>
        <PopoverTrigger asChild>
          <Badge asChild className={statusBadgeClassName}>
            <button
              type="button"
              disabled={statusMutationPending}
              aria-label={`Статус: ${statusLabel}. Действия`}
            >
              {statusLabel}
            </button>
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1">
          {showReserve ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={plannedExpenseReserveMenuItemClassName}
              disabled={statusMutationPending}
              isLoading={isReserveLoading}
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
              disabled={statusMutationPending}
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
              disabled={statusMutationPending}
              isLoading={isCancelPlanLoading}
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
              disabled={statusMutationPending}
              isLoading={isUnreserveLoading}
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
      <Badge
        className={
          item.status === 'RESERVED'
            ? plannedExpenseReservedBadgeStaticClassName
            : item.status === 'PLANNED'
              ? plannedExpensePlannedBadgeStaticClassName
              : statusBadgeStaticClassName
        }
      >
        {statusLabel}
      </Badge>
    )

  return (
    <Card className={plannedExpenseCardClassName}>
      <div className={plannedExpenseCardBodyClassName}>
        <CardTitle className={plannedExpenseCardTitleClassName}>
          {item.title}
        </CardTitle>
        <div className={plannedExpenseCardStatusBadgeClassName}>{statusBadge}</div>
        <div className={plannedExpenseCardContextClassName}>
          {item.description ? <p>{item.description}</p> : null}
          <p>
            {new Date(item.planned_date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <p className={plannedExpenseAmountClassName}>
          {formatAmount(item.amount)}
        </p>
      </div>
    </Card>
  )
}
