import { useIncomesQuery } from '../../../entities/income/api/useIncomesQuery'
import { IncomeCard } from '../../../entities/income/ui/IncomeCard'
import { getErrorMessage } from '../../../shared/lib/errors'

export function IncomeList() {
  const { data, isPending, isError, error, isFetching } = useIncomesQuery()

  if (isPending) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Загрузка…</p>
      </div>
    )
  }

  if (isError && data === undefined) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-red-800">
          {getErrorMessage(error, 'Не удалось загрузить доходы')}
        </p>
      </div>
    )
  }

  const items = data ?? []

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-zinc-500">Пока нет доходов. Добавьте первую запись выше.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">Список доходов</h2>
        {isFetching ? <span className="text-xs text-zinc-500">Обновление…</span> : null}
      </div>
      <ul className="space-y-3">
        {items.map((income) => (
          <li key={income.id}>
            <IncomeCard income={income} />
          </li>
        ))}
      </ul>
    </div>
  )
}
