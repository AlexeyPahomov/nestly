import { useDeleteIncomeMutation } from '@/entities/income/api/useDeleteIncomeMutation'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import { IncomeCard } from '@/entities/income/ui/IncomeCard'
import { getErrorMessage } from '@/shared/lib/errors'
import { ItemsList } from '@/shared/ui'

export function IncomeList() {
  const { data, isPending, isError, error, isFetching } = useIncomesQuery()
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
