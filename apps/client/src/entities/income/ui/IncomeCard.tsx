import { Trash2 } from 'lucide-react'

import type { Income } from '@/entities/income/model/types'
import { formatAmount, formatMonthLabel } from '@/shared/lib/format'
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
  onDelete: () => void
  isDeleting?: boolean
}

export function IncomeCard({ income, onDelete, isDeleting }: IncomeCardProps) {
  const title = income.source?.trim() ? income.source : 'Без описания'

  return (
    <Card size="sm">
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
              onClick={(e) => {
                e.stopPropagation()
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
