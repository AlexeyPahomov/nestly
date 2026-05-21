import type { Allocation } from '@/entities/allocation/model/types'
import { formatAmount } from '@/shared/lib/format'
import { Card, CardHeader, CardTitle } from '@/shared/ui'

type AllocationCardProps = {
  allocation: Allocation
}

export function AllocationCard({ allocation }: AllocationCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between gap-3">
          <span>{allocation.category.name}</span>
          <span className="shrink-0 tabular-nums text-lg font-bold text-zinc-900">
            {formatAmount(allocation.amount)}
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
