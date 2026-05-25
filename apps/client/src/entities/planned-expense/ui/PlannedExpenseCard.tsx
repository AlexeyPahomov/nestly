import { formatAmount } from '@/shared/lib/format'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

import { remainingToReserve } from '../lib/remainingToReserve'
import { PLANNED_EXPENSE_STATUS_LABELS } from '../lib/plannedExpenseStatus'
import type { PlannedExpense } from '../model/types'

export type PlannedExpenseCardProps = {
  item: PlannedExpense
  onReserve?: (id: string) => void
  onCancel?: (id: string) => void
  reservePending?: boolean
}

export function PlannedExpenseCard({
  item,
  onReserve,
  onCancel,
  reservePending,
}: PlannedExpenseCardProps) {
  const reserveLeft = remainingToReserve(item)

  return (
    <Card className="border-zinc-200/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
          {PLANNED_EXPENSE_STATUS_LABELS[item.status]}
        </span>
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
        {item.status === 'PLANNED' && onReserve ? (
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={reservePending}
              onClick={() => onReserve(item.id)}
            >
              Зарезервировать
            </Button>
            {onCancel ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={reservePending}
                onClick={() => onCancel(item.id)}
              >
                Отменить
              </Button>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
