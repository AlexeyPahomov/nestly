import { Card, CardContent } from '../card/Card'
import { Spinner } from '../spinner/Spinner'

export function ListLoader() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
          <Spinner className="size-8 text-zinc-500" />
          <p className="text-sm text-muted-foreground">Загрузка…</p>
        </CardContent>
      </Card>
    </div>
  )
}
