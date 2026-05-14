import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import { IncomeCard } from '@/entities/income/ui/IncomeCard'
import { getErrorMessage } from '@/shared/lib/errors'
import { Card, CardContent, Spinner } from '@/shared/ui'

export function IncomeList() {
  const { data, isPending, isError, error, isFetching } = useIncomesQuery()

  if (isPending) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
            <Spinner className="size-8 text-zinc-500" />
            <p className="text-sm text-muted-foreground">Загрузка…</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError && data === undefined) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <Card className="border-destructive/40 bg-destructive/5 ring-destructive/20">
          <CardContent>
            <p className="text-sm font-medium text-destructive">
              {getErrorMessage(error, 'Не удалось загрузить доходы')}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const items = data ?? []

  if (items.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <Card className="border-dashed border-muted-foreground/30">
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Пока нет доходов. Добавьте первую запись выше.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">Список доходов</h2>
        {isFetching ? <Spinner className="size-4 shrink-0 text-zinc-500" aria-label="Обновление списка" /> : null}
      </div>
      <ul className="min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-contain pr-1">
        {items.map((income) => (
          <li key={income.id}>
            <IncomeCard income={income} />
          </li>
        ))}
      </ul>
    </div>
  )
}
