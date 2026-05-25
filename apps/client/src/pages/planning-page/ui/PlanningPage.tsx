import { CreatePlannedExpenseForm } from '@/features/create-planned-expense/ui/CreatePlannedExpenseForm'
import { PlannedExpenseCard } from '@/entities/planned-expense/ui/PlannedExpenseCard'
import { PageSection, MonthPicker, Spinner } from '@/shared/ui'
import { PlanningMonthTimeline } from '@/widgets/planning-month-timeline/ui/PlanningMonthTimeline'
import { PlanningProjectionCard } from '@/widgets/planning-projection/ui/PlanningProjectionCard'

import { usePlanningPage } from '../model/usePlanningPage'

export function PlanningPage() {
  const page = usePlanningPage()

  return (
    <PageSection title="Планирование">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <MonthPicker
            value={page.periodMonth}
            onChange={page.setPeriodMonth}
          />
          <PlanningMonthTimeline
            periodMonth={page.periodMonth}
            periodLabels={page.periodLabels}
            itemCounts={page.itemCounts}
            onSelect={page.setPeriodMonth}
          />
        </div>

        {page.isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="size-8 text-zinc-500" />
          </div>
        ) : (
          <>
            <PlanningProjectionCard
              projection={page.projection}
              periodLabel={page.periodLabel}
            />

            <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
              <CreatePlannedExpenseForm anchorPeriodMonth={page.periodMonth} />

              <div className="flex min-h-0 flex-col gap-3">
                <h2 className="text-sm font-semibold text-zinc-700">
                  Планы на {page.periodLabel}
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
                        onReserve={page.reserve}
                        onCancel={page.cancelPlan}
                        reservePending={page.reservePending}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </PageSection>
  )
}
