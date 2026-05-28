import { CreateAllocationForm } from '@/features/create-allocation/ui/CreateAllocationForm'
import { useAllocationPage } from '@/pages/allocation-page/model/useAllocationPage'
import { PageSection, Select } from '@/shared/ui'
import { AllocationList } from '@/widgets/allocation-list'
import { AllocationSummary } from '@/widgets/allocation-summary'

export function AllocationPage() {
  const {
    selectedIncomeId,
    setPickedIncomeId,
    allocationCategories,
    incomeAmount,
    allocatedTotal,
    remainingBalance,
    incomeOptions,
    hasIncome,
    incomesQuery,
    allocationsQuery,
  } = useAllocationPage()

  return (
    <PageSection title="Распределение">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="shrink-0 space-y-4 ps-px pt-px md:ps-0.5 md:pt-0.5">
          <Select
            id="allocation-income"
            label="Доход"
            value={selectedIncomeId ?? ''}
            onValueChange={setPickedIncomeId}
            options={incomeOptions}
            placeholder={
              incomesQuery.isPending
                ? 'Загрузка…'
                : hasIncome
                  ? 'Выберите доход'
                  : 'Нет доходов'
            }
            disabled={
              incomesQuery.isPending || !hasIncome || incomesQuery.isError
            }
          />

          <AllocationSummary
            incomeAmount={incomeAmount}
            allocatedTotal={allocatedTotal}
            remainingBalance={remainingBalance}
          />

          <CreateAllocationForm
            incomeId={selectedIncomeId}
            categories={allocationCategories}
            remainingBalance={remainingBalance}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <AllocationList
            isPending={allocationsQuery.isPending}
            isError={allocationsQuery.isError}
            error={allocationsQuery.error}
            allocations={allocationsQuery.data}
            isFetching={allocationsQuery.isFetching}
            hasSelectedIncome={selectedIncomeId !== null}
          />
        </div>
      </div>
    </PageSection>
  )
}
