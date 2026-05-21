import type { Expense } from '@/entities/expense/model/types'
import { formatAmount, formatExpenseDate } from '@/shared/lib/format'
import { Card, CardHeader, CardTitle } from '@/shared/ui'

type ExpenseCardProps = {
  expense: Expense
  categoryName: string
}

export function ExpenseCard({ expense, categoryName }: ExpenseCardProps) {
  const description = expense.description?.trim()

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
            <span className="truncate font-medium text-zinc-900">
              {categoryName}
            </span>
            {description ? (
              <>
                <span className="shrink-0 text-muted-foreground">·</span>
                <span className="truncate font-normal text-muted-foreground">
                  {description}
                </span>
              </>
            ) : null}
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="text-sm font-normal text-muted-foreground">
              {formatExpenseDate(expense.date)}
            </span>
            <span className="tabular-nums text-lg font-bold text-zinc-900">
              {formatAmount(expense.amount)}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
