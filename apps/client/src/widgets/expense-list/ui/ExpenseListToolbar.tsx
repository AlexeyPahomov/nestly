import { BarChart3, LayoutList } from 'lucide-react'

import type { Category } from '@/entities/category/model/types'
import { cn } from '@/shared/lib/utils'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select/SelectPrimitives'
import { Button } from '@/shared/ui'

export type ExpenseListViewMode = 'list' | 'chart'

type ExpenseListToolbarProps = {
  categories: Category[]
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
  viewMode: ExpenseListViewMode
  onViewModeChange: (mode: ExpenseListViewMode) => void
}

export function ExpenseListToolbar({
  categories,
  categoryFilter,
  onCategoryFilterChange,
  viewMode,
  onViewModeChange,
}: ExpenseListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-2">
      <div className="flex flex-wrap items-center gap-2">
        <SelectRoot value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger size="default" className="min-w-[10rem] bg-white">
            <SelectValue placeholder="Все категории" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-0.5">
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
    </div>
  )
}
