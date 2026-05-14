import { Card, CardContent } from '../card/Card'

type ListEmptyProps = {
  message?: string
}

export function ListEmpty({
  message = 'Пока нет записей.',
}: ListEmptyProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Card className="border-dashed border-muted-foreground/30">
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}
