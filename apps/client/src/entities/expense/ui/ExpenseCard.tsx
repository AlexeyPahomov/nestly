import type { Expense } from '@/entities/expense/model/types'
import { formatAmount, formatExpenseDate } from '@/shared/lib/format'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

type ExpenseCardProps = {
  expense: Expense
  categoryName: string
}

export function ExpenseCard({ expense, categoryName }: ExpenseCardProps) {
  const description = expense.description?.trim()

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="tabular-nums text-lg font-bold text-zinc-900">
          {formatAmount(expense.amount)}
        </CardTitle>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
        <CardDescription>
          <span className="font-medium text-zinc-700">{categoryName}</span>
          <span className="text-muted-foreground"> · {formatExpenseDate(expense.date)}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
