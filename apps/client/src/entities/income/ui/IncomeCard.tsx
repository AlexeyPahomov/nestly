import { useCallback } from 'react'
import { Trash2 } from 'lucide-react'

import type { Income } from '@/entities/income/model/types'
import {
  categoryCardPressableClassName,
  categoryCardPressingClassName,
} from '@/entities/category/lib/categoryTileLayout'
import { formatAmount, formatMonthLabel } from '@/shared/lib/format'
import { useCardActivate } from '@/shared/hooks/use-card-activate'
import { useLongPress } from '@/shared/hooks/use-long-press'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

type IncomeCardProps = {
  income: Income
  onEdit?: (income: Income) => void
  onDelete: () => void
  isDeleting?: boolean
}

export function IncomeCard({
  income,
  onEdit,
  onDelete,
  isDeleting,
}: IncomeCardProps) {
  const title = income.source?.trim() ? income.source : 'Без описания'

  const handleEdit = useCallback(() => {
    onEdit?.(income)
  }, [income, onEdit])

  const isEditable = onEdit != null

  const { isPressing, longPressHandlers } = useLongPress({
    onLongPress: handleEdit,
    disabled: !isEditable,
  })

  const activateProps = useCardActivate(handleEdit, {
    contextMenu: isEditable,
    ariaLabel: isEditable
      ? `${title}, ${formatAmount(income.amount)}. Удерживайте для редактирования.`
      : undefined,
  })

  return (
    <Card
      size="sm"
      className={cn(
        'relative',
        isEditable && categoryCardPressableClassName,
        isPressing && categoryCardPressingClassName,
      )}
      {...(isEditable ? activateProps : {})}
      {...(isEditable ? longPressHandlers : {})}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tabular-nums text-zinc-900">
              {formatAmount(income.amount)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500 hover:text-destructive"
              aria-label="Удалить доход"
              disabled={isDeleting}
              onClick={(event) => {
                event.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 />
            </Button>
          </div>
        </CardAction>
        <CardDescription>Период: {formatMonthLabel(income.period_month)}</CardDescription>
      </CardHeader>
    </Card>
  )
}
