import { cn } from '@/shared/lib/utils'

import { Card, CardContent } from '../card/Card'

type ListEmptyProps = {
  message?: string
  className?: string
}

export function ListEmpty({
  message = 'Пока нет записей.',
  className,
}: ListEmptyProps) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      <Card className="flex min-h-0 flex-1 flex-col border-dashed border-muted-foreground/30">
        <CardContent className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}
