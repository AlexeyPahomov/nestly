import { useState } from 'react'

import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { EditPlannedExpenseDialog } from '@/features/create-planned-expense/ui/EditPlannedExpenseDialog'
import { useDesktopPageSectionTitle } from '@/shared/hooks/use-desktop-page-section-title'
import { PageSection } from '@/shared/ui'

import { planningPageContentClassName } from '../lib/planningPageLayout'
import { usePlanningPage } from '../model/usePlanningPage'

import { PlanningPageHeader } from './PlanningPageHeader'
import { PlanningPageMonthBody } from './PlanningPageMonthViews'
import { PlanningPageMonthTransition } from './PlanningPageMonthTransition'

export function PlanningPage() {
  const pageTitle = useDesktopPageSectionTitle('Планирование')
  const page = usePlanningPage()
  const [editingPlanned, setEditingPlanned] = useState<PlannedExpense | null>(
    null,
  )

  return (
    <PageSection
      title={pageTitle}
      header={<PlanningPageHeader page={page} />}
      mobileSidebarOnHeader={false}
    >
      <PlanningPageMonthTransition
        periodMonth={page.periodMonth}
        className={planningPageContentClassName}
      >
        <PlanningPageMonthBody
          page={page}
          onEditPlanned={setEditingPlanned}
        />
      </PlanningPageMonthTransition>

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
