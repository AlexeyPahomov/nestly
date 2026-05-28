import { BarChart3, LayoutList } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

export type ExpenseListViewMode = 'list' | 'chart'

type ExpenseListToolbarProps = {
  viewMode: ExpenseListViewMode
  onViewModeChange: (mode: ExpenseListViewMode) => void
  className?: string
}

export function ExpenseListToolbar({
  viewMode,
  onViewModeChange,
  className,
}: ExpenseListToolbarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200 bg-white p-0.5 shadow-md',
        className,
      )}
    >
      <Button
        type="button"
        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
        size="icon-sm"
        aria-label="Список"
        aria-pressed={viewMode === 'list'}
        onClick={() => onViewModeChange('list')}
      >
        <LayoutList />
      </Button>
      <Button
        type="button"
        variant={viewMode === 'chart' ? 'secondary' : 'ghost'}
        size="icon-sm"
        aria-label="График"
        aria-pressed={viewMode === 'chart'}
        disabled
        title="Скоро"
        className={cn(viewMode === 'chart' && 'opacity-50')}
        onClick={() => onViewModeChange('chart')}
      >
        <BarChart3 />
      </Button>
    </div>
  )
}
