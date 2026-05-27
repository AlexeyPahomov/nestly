import { Plus } from 'lucide-react'

import {
  addCategoryCardClassName,
  addCategoryCardIconWrapClassName,
  addCategoryTileTitleClassName,
  categoryTileCardClassName,
} from '@/entities/category/lib/categoryTileLayout'
import { CategoryTileShell } from '@/entities/category/ui/CategoryTileShell'
import { useCardActivate } from '@/shared/hooks/use-card-activate'
import { cn } from '@/shared/lib/utils'
import { Card } from '@/shared/ui'

type AddCategoryCardProps = {
  onClick: () => void
  className?: string
}

export function AddCategoryCard({ onClick, className }: AddCategoryCardProps) {
  const activateProps = useCardActivate(onClick, {
    ariaLabel: 'Добавить категорию',
  })

  return (
    <Card
      size="sm"
      className={cn(categoryTileCardClassName, addCategoryCardClassName, className)}
      onClick={onClick}
      {...activateProps}
    >
      <CategoryTileShell
        icon={
          <span className={addCategoryCardIconWrapClassName} aria-hidden>
            <Plus className="size-6 text-zinc-500" strokeWidth={2} />
          </span>
        }
        title="Новая категория"
        subtitle="Добавить"
        titleClassName={addCategoryTileTitleClassName}
      />
    </Card>
  )
}
