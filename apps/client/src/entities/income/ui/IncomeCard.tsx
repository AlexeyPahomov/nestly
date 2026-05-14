import type { Income } from '@/entities/income/model/types'
import { formatAmount, formatMonthLabel } from '@/shared/lib/format'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

type IncomeCardProps = {
  income: Income
}

export function IncomeCard({ income }: IncomeCardProps) {
  const title = income.source?.trim() ? income.source : 'Без описания'

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <span className="text-lg font-bold tabular-nums">{formatAmount(income.amount)}</span>
        </CardAction>
        <CardDescription>Период: {formatMonthLabel(income.period_month)}</CardDescription>
      </CardHeader>
    </Card>
  )
}
