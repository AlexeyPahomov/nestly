import type { Income } from '@/entities/income/model/types'
import { useDeleteIncomeMutation } from '@/entities/income/api/useDeleteIncomeMutation'
import { IncomeCard } from '@/entities/income/ui/IncomeCard'
import { getErrorMessage } from '@/shared/lib/errors'
import { ItemsList } from '@/shared/ui'

export type IncomeListProps = {
  data: Income[] | undefined
  isPending: boolean
  isError: boolean
  error: unknown
  isFetching?: boolean
}

export function IncomeList({
  data,
  isPending,
  isError,
  error,
  isFetching = false,
}: IncomeListProps) {
  const deleteMutation = useDeleteIncomeMutation()

  const headerAddon =
    deleteMutation.isError ? (
      <p className="text-sm text-destructive">
        {getErrorMessage(deleteMutation.error, 'Не удалось удалить доход')}
      </p>
    ) : null

  return (
    <ItemsList
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={isFetching}
      showPendingLoader={false}
      title="Список доходов"
      emptyMessage="Пока нет доходов. Добавьте первую запись."
      errorFallback="Не удалось загрузить доходы"
      headerAddon={headerAddon}
    >
      {(items) =>
        items.map((income) => (
          <li key={income.id}>
            <IncomeCard
              income={income}
              isDeleting={
                deleteMutation.isPending &&
                deleteMutation.variables === income.id
              }
              onDelete={() => {
                deleteMutation.reset()
                deleteMutation.mutate(income.id)
              }}
            />
          </li>
        ))
      }
    </ItemsList>
  )
}
