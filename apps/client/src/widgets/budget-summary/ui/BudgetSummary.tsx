import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

type BudgetSummaryProps = {
  allocatedTotal: number
  spentTotal: number
  remainingTotal: number
}

export function BudgetSummary({
  allocatedTotal,
  spentTotal,
  remainingTotal,
}: BudgetSummaryProps) {
  const isOverBudget = remainingTotal < 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Бюджет</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Распределено</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatAmount(allocatedTotal)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Потрачено</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatAmount(spentTotal)}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2">
          <span className="font-medium text-zinc-900">
            {isOverBudget ? 'Перерасход' : 'Остаток'}
          </span>
          <span
            className={cn(
              'text-lg font-bold tabular-nums',
              isOverBudget ? 'text-red-600' : 'text-zinc-900',
            )}
          >
            {isOverBudget
              ? formatAmount(Math.abs(remainingTotal))
              : formatAmount(remainingTotal)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
