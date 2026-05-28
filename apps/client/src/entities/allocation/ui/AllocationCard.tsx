import { useCallback } from 'react'

import type { Allocation } from '@/entities/allocation/model/types'
import { CategoryLucideIcon } from '@/entities/category/lib/categoryIcon'
import { toCategoryLucideIconProps } from '@/entities/category/lib/categoryLucideIconProps'
import { useCardActivate } from '@/shared/hooks/use-card-activate'
import { formatAmount } from '@/shared/lib/format'
import { resolveIconColorTone } from '@/shared/lib/iconColorStyles'
import { toMoneyNumber } from '@/shared/lib/money'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/shared/ui'

type AllocationCardProps = {
  allocation: Allocation
  incomeAmount?: number | null
  onEdit?: (allocation: Allocation) => void
}

function toPercent(part: number, total: number | null | undefined): number | null {
  if (total == null || total <= 0) {
    return null
  }

  return Math.min(100, Math.max(0, Math.round((part / total) * 100)))
}

export function AllocationCard({
  allocation,
  incomeAmount = null,
  onEdit,
}: AllocationCardProps) {
  const allocationAmount = toMoneyNumber(allocation.amount)
  const percent = toPercent(allocationAmount, incomeAmount)
  const tone = resolveIconColorTone(allocation.category.icon_color)

  const handleEdit = useCallback(() => {
    onEdit?.(allocation)
  }, [allocation, onEdit])

  const activateProps = useCardActivate(handleEdit, {
    contextMenu: onEdit != null,
    ariaLabel: onEdit
      ? `Распределение: ${allocation.category.name}, ${formatAmount(allocationAmount)}. Нажмите для редактирования.`
      : undefined,
  })

  return (
    <Card
      size="sm"
      className={cn(
        'bg-linear-to-br from-white to-slate-subtle/50 shadow-[0_8px_20px_-18px_rgba(20,24,36,0.45)]',
        onEdit &&
          'cursor-pointer transition-shadow hover:shadow-[0_10px_24px_-16px_rgba(20,24,36,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40',
      )}
      {...(onEdit ? activateProps : {})}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <span
              className={`inline-flex size-7 items-center justify-center rounded-full ${tone.avatarClassName} ${tone.iconClassName}`}
            >
              <CategoryLucideIcon
                {...toCategoryLucideIconProps(allocation.category)}
                className="size-4"
                aria-hidden
              />
            </span>
            <span className="font-semibold text-slate-hover">{allocation.category.name}</span>
          </span>
          <span className="shrink-0 tabular-nums text-lg font-extrabold text-main-black">
            {formatAmount(allocationAmount)}
          </span>
        </CardTitle>
      </CardHeader>
      {percent !== null ? (
        <CardContent className="space-y-2">
          <Progress
            value={percent}
            className="h-1 bg-slate-muted/60"
            indicatorClassName={tone.progressClassName}
            aria-label={`Доля категории ${allocation.category.name}`}
          />
          <p className={`text-xs font-medium ${tone.iconClassName}`}>
            {percent}% от дохода
          </p>
        </CardContent>
      ) : null}
    </Card>
  )
}
