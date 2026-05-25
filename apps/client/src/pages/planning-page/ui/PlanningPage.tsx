import { PlannedExpenseCard } from '@/entities/planned-expense/ui/PlannedExpenseCard'
import { PageSection, Spinner } from '@/shared/ui'
import { MonthLiquidityFlow } from '@/widgets/liquidity-flow-preview'
import { PlanningPageToolbar } from '@/widgets/planning-page-toolbar/ui/PlanningPageToolbar'
import { ProjectedBudgetSummary } from '@/widgets/projected-budget-summary'

import { usePlanningPage } from '../model/usePlanningPage'

export function PlanningPage() {
  const page = usePlanningPage()

  return (
    <PageSection
      className="gap-6"
      header={
        <PlanningPageToolbar
          periodMonth={page.periodMonth}
          periodLabels={page.periodLabels}
          itemCounts={page.itemCounts}
          onSelectMonth={page.setPeriodMonth}
        />
      }
    >
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        {page.isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="size-8 text-zinc-500" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-2">
              <ProjectedBudgetSummary
                projection={page.projection}
                periodLabel={page.periodLabel}
              />
              <MonthLiquidityFlow
                periodLabel={page.periodLabel}
                projection={page.projection}
                incomeTotal={page.incomeTotal}
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3">
              <h2 className="text-sm font-semibold text-zinc-700">
                {page.periodLabel}
              </h2>
              {page.periodPlanned.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  Нет запланированных трат на этот месяц.
                </p>
              ) : (
                <div className="nestly-scroll-list flex min-h-0 flex-col gap-3 overflow-y-auto">
                  {page.periodPlanned.map((item) => (
                    <PlannedExpenseCard
                      key={item.id}
                      item={item}
                      onReserve={(id) => page.reserve(id, item.amount)}
                      onCancel={page.cancelPlan}
                      reservePending={page.reservePending}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageSection>
  )
}
