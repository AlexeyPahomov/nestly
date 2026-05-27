import { useState } from 'react'

import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { EditPlannedExpenseDialog } from '@/features/create-planned-expense/ui/EditPlannedExpenseDialog'
import { PageSection, Spinner } from '@/shared/ui'
import { MonthLiquidityFlow } from '@/widgets/liquidity-flow-preview'
import { PlanningMonthMetrics } from '@/widgets/planning-month-metrics'

import { planningPageContentClassName } from '../lib/planningPageLayout'
import { usePlanningPage } from '../model/usePlanningPage'

import { PlanningPageHeader } from './PlanningPageHeader'
import { PlanningPagePlansSection } from './PlanningPagePlansSection'

export function PlanningPage() {
  const page = usePlanningPage()
  const [editingPlanned, setEditingPlanned] = useState<PlannedExpense | null>(
    null,
  )

  return (
    <PageSection
      title="Планирование"
      header={<PlanningPageHeader page={page} />}
    >
      <div className={planningPageContentClassName}>
        {page.isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="size-8 text-zinc-500" />
          </div>
        ) : (
          <>
            <PlanningMonthMetrics
              className="hidden md:grid"
              projection={page.projection}
              periodMonth={page.periodMonth}
            />

            <MonthLiquidityFlow
              className="hidden md:flex"
              projection={page.projection}
              incomeTotal={page.incomeTotal}
            />

            <PlanningPagePlansSection
              page={page}
              onEditPlanned={setEditingPlanned}
            />
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
