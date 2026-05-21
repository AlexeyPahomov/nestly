import type { Allocation } from '@/entities/allocation/model/types'
import { AllocationCard } from '@/entities/allocation/ui/AllocationCard'
import { ItemsList } from '@/shared/ui'

type AllocationListProps = {
  isPending: boolean
  isError: boolean
  error: unknown
  allocations: Allocation[] | undefined
  isFetching: boolean
  hasSelectedIncome: boolean
}

export function AllocationList({
  isPending,
  isError,
  error,
  allocations,
  isFetching,
  hasSelectedIncome,
}: AllocationListProps) {
  if (!hasSelectedIncome) {
    return (
      <p className="text-sm text-muted-foreground">
        Выберите доход, чтобы увидеть распределения.
      </p>
    )
  }

  return (
    <ItemsList
      isPending={isPending}
      isError={isError}
      error={error}
      data={allocations}
      isFetching={isFetching}
      title="Распределения"
      emptyMessage="Пока нет распределений по этому доходу."
      errorFallback="Не удалось загрузить распределения"
    >
      {(items) =>
        items.map((allocation) => (
          <li key={allocation.id}>
            <AllocationCard allocation={allocation} />
          </li>
        ))
      }
    </ItemsList>
  )
}
