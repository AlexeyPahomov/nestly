import { getErrorMessage } from '@/shared/lib/errors'

import { Card, CardContent } from '../card/Card'

type ListErrorProps = {
  error: unknown
  fallbackMessage?: string
}

export function ListError({
  error,
  fallbackMessage = 'Не удалось загрузить данные',
}: ListErrorProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Card className="border-destructive/40 bg-destructive/5 ring-destructive/20">
        <CardContent>
          <p className="text-sm font-medium text-destructive">
            {getErrorMessage(error, fallbackMessage)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
