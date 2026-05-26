import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

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

import { remainingToReserve } from '../lib/remainingToReserve'
import { PLANNED_EXPENSE_STATUS_LABELS } from '../lib/plannedExpenseStatus'
import type { PlannedExpense } from '../model/types'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [reserveMenuOpen, setReserveMenuOpen] = useState(false)
  const reserveLeft = remainingToReserve(item)
  const showReserve =
    item.status === 'PLANNED' && onReserve != null
  const showCancelPlan =
    item.status === 'PLANNED' && onCancelPlan != null
  const hasMenu = onEdit != null || showCancelPlan
  const showUnreserve = item.reserved_amount > 0 && onUnreserve != null
  const statusLabel = PLANNED_EXPENSE_STATUS_LABELS[item.status]

  return (
    <Card className="gap-1 border-zinc-200/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-0">
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {showReserve ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={reservePending}
              onClick={() => onReserve(item.id)}
            >
              Зарезервировать
            </Button>
          ) : null}
          {showUnreserve ? (
            <Popover open={reserveMenuOpen} onOpenChange={setReserveMenuOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={reservePending}
                  className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200/80 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={`Статус: ${statusLabel}. Действия с резервом`}
                >
                  {statusLabel}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  disabled={reservePending}
                  onClick={() => {
                    setReserveMenuOpen(false)
                    onUnreserve(item.id)
                  }}
                >
                  Снять резерв
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {statusLabel}
            </span>
          )}
          {hasMenu ? (
            <Popover open={menuOpen} onOpenChange={setMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-zinc-400 hover:text-zinc-700"
                  aria-label="Действия с планом"
                  disabled={reservePending}
                >
                  <MoreVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-1">
                {onEdit ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    disabled={reservePending}
                    onClick={() => {
                      setMenuOpen(false)
                      onEdit(item)
                    }}
                  >
                    <Pencil className="size-4" />
                    Изменить
                  </Button>
                ) : null}
                {showCancelPlan ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    disabled={reservePending}
                    onClick={() => {
                      setMenuOpen(false)
                      onCancelPlan(item.id)
                    }}
                  >
                    <Trash2 className="size-4" />
                    Отменить план
                  </Button>
                ) : null}
              </PopoverContent>
            </Popover>
          ) : null}
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
