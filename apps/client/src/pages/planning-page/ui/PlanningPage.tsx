import { useState } from 'react'

import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { PlannedExpenseCard } from '@/entities/planned-expense/ui/PlannedExpenseCard'
import { PlannedExpensesList } from '@/entities/planned-expense/ui/PlannedExpensesList'
import { EditPlannedExpenseDialog } from '@/features/create-planned-expense/ui/EditPlannedExpenseDialog'
import { PageSection, Spinner } from '@/shared/ui'
import { MonthLiquidityFlow } from '@/widgets/liquidity-flow-preview'
import { PlanningMonthMetrics } from '@/widgets/planning-month-metrics'
import { PlanningPageToolbar } from '@/widgets/planning-page-toolbar/ui/PlanningPageToolbar'

import { usePlanningPage } from '../model/usePlanningPage'

export function PlanningPage() {
  const page = usePlanningPage()
  const [editingPlanned, setEditingPlanned] = useState<PlannedExpense | null>(
    null,
  )

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
            <PlanningMonthMetrics
              projection={page.projection}
              periodLabel={page.periodLabel}
            />

            <MonthLiquidityFlow
              periodLabel={page.periodLabel}
              projection={page.projection}
              incomeTotal={page.incomeTotal}
            />

            <div className="flex min-h-0 flex-1 flex-col">
              {page.periodPlanned.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  Нет запланированных трат на этот месяц.
                </p>
              ) : (
                <PlannedExpensesList title={`Планы на ${page.periodLabel}`}>
                  <div className="coffer-scroll-list max-h-[min(28rem,50vh)] overflow-y-auto">
                    {page.periodPlanned.map((item) => (
                      <PlannedExpenseCard
                        key={item.id}
                        item={item}
                        onReserve={(id) => page.reserve(id, item.amount)}
                        onCancelPlan={
                          item.status === 'PLANNED' ? page.cancelPlan : undefined
                        }
                        onUnreserve={page.unreserve}
                        onEdit={
                          item.status === 'PLANNED'
                            ? setEditingPlanned
                            : undefined
                        }
                        pendingStatusMutation={page.pendingStatusMutation}
                      />
                    ))}
                  </div>
                </PlannedExpensesList>
              )}
            </div>
          </>
        )}
      </div>

      <EditPlannedExpenseDialog
        open={editingPlanned != null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingPlanned(null)
          }
        }}
        item={editingPlanned}
      />
    </PageSection>
  )
}
