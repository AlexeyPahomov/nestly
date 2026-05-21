import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

type BudgetSummaryProps = {
  totalFunds: number
  availableToAllocate: number
  allocatedTotal: number
}

export function BudgetSummary({
  totalFunds,
  availableToAllocate,
  allocatedTotal,
}: BudgetSummaryProps) {
  const hasUnallocated = availableToAllocate > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Казна</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Всего средств</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatAmount(totalFunds)}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2">
          <span className="font-medium text-zinc-900">
            Свободно к распределению
          </span>
          <span
            className={cn(
              'text-lg font-bold tabular-nums',
              hasUnallocated ? 'text-emerald-700' : 'text-zinc-900',
            )}
          >
            {formatAmount(availableToAllocate)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Зарезервировано в конвертах</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatAmount(allocatedTotal)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
