import type { CategoryBudgetListItem } from '@/widgets/category-budget-list/model/types'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

type CategoryBudgetCardProps = {
  item: CategoryBudgetListItem
  selected?: boolean
  /** Подсветка перерасхода по превью формы (ещё до сохранения). */
  stressOverBudget?: boolean
  onSelect?: (categoryId: string) => void
}

export function CategoryBudgetCard({
  item,
  selected,
  stressOverBudget = false,
  onSelect,
}: CategoryBudgetCardProps) {
  const { category, allocated, spent, remaining } = item
  const isOverBudget = remaining < 0 || stressOverBudget

  return (
    <Card
      size="sm"
      className={cn(
        'transition-colors',
        selected && 'ring-2 ring-zinc-900',
        isOverBudget && 'border-red-200 bg-red-50/40',
        onSelect && 'cursor-pointer hover:bg-zinc-50',
      )}
      onClick={onSelect ? () => onSelect(category.id) : undefined}
    >
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Распределено</span>
          <span className="tabular-nums font-medium text-zinc-900">
            {formatAmount(allocated)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Потрачено</span>
          <span className="tabular-nums font-medium text-zinc-900">
            {formatAmount(spent)}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-1">
          <span className="font-medium text-zinc-900">
            {isOverBudget ? 'Перерасход' : 'Остаток'}
          </span>
          <span
            className={cn(
              'tabular-nums font-bold',
              isOverBudget ? 'text-red-600' : 'text-zinc-900',
            )}
          >
            {isOverBudget
              ? formatAmount(Math.abs(remaining))
              : formatAmount(remaining)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
