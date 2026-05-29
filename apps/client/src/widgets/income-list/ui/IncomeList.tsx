import type { Income } from '@/entities/income/model/types'
import { useDeleteIncomeMutation } from '@/entities/income/api/useDeleteIncomeMutation'
import { IncomeCard } from '@/entities/income/ui/IncomeCard'
import { getErrorMessage } from '@/shared/lib/errors'
import { ItemsList } from '@/shared/ui'
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'

export type IncomeListProps = {
  className?: string
  data: Income[] | undefined
  isPending: boolean
  isError: boolean
  error: unknown
  isFetching?: boolean
  layout?: ItemsListLayout
  onEdit?: (income: Income) => void
}

export function IncomeList({
  className,
  data,
  isPending,
  isError,
  error,
  isFetching = false,
  layout = 'fill',
  onEdit,
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
      className={className}
      isPending={isPending}
      isError={isError}
      error={error}
      data={data}
      isFetching={isFetching}
      showPendingLoader
      layout={layout}
      emptyMessage="Пока нет доходов. Добавьте первую запись."
      errorFallback="Не удалось загрузить доходы"
      headerAddon={headerAddon}
    >
      {(items) =>
        items.map((income) => (
          <li key={income.id}>
            <IncomeCard
              income={income}
              onEdit={onEdit}
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
