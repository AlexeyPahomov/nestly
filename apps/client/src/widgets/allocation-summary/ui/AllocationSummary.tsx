import { formatAmount } from '@/shared/lib/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

type AllocationSummaryProps = {
  incomeAmount: number | null
  allocatedTotal: number
  remainingBalance: number
}

export function AllocationSummary({
  incomeAmount,
  allocatedTotal,
  remainingBalance,
}: AllocationSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Баланс распределения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Доход</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {incomeAmount !== null ? formatAmount(incomeAmount) : '—'}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Распределено</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatAmount(allocatedTotal)}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2">
          <span className="font-medium text-zinc-900">Остаток</span>
          <span className="text-lg font-bold tabular-nums text-zinc-900">
            {incomeAmount !== null ? formatAmount(remainingBalance) : '—'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
