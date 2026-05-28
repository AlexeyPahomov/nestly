import { cn } from '@/shared/lib/utils'

import { Card, CardContent } from '../card/Card'
import { Spinner } from '../spinner/Spinner'

type ListLoaderProps = {
  variant?: 'card' | 'inline'
  className?: string
}

export function ListLoader({ variant = 'card', className }: ListLoaderProps) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex justify-center py-6',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <Spinner className="size-6 text-zinc-500" aria-label="Загрузка" />
      </div>
    )
  }

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
          <Spinner className="size-8 text-zinc-500" />
          <p className="text-sm text-muted-foreground">Загрузка…</p>
        </CardContent>
      </Card>
    </div>
  )
}
