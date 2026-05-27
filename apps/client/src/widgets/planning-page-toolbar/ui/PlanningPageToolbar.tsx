import { useState } from 'react'

import { CreatePlannedExpenseDialog } from '@/features/create-planned-expense/ui/CreatePlannedExpenseDialog'
import { AddButton, PageSectionTitleRow } from '@/shared/ui'
import { PlanningMonthTimeline } from '@/widgets/planning-month-timeline/ui/PlanningMonthTimeline'

import {
  planningPageAddButtonClassName,
  planningPageToolbarClassName,
  planningPageToolbarRowClassName,
} from '../lib/planningPageToolbarLayout'

export type PlanningPageToolbarProps = {
  periodMonth: string
  periodLabels: Record<string, string>
  itemCounts: Record<string, number>
  onSelectMonth: (periodMonth: string) => void
}

export function PlanningPageToolbar({
  periodMonth,
  periodLabels,
  itemCounts,
  onSelectMonth,
}: PlanningPageToolbarProps) {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <div className={planningPageToolbarClassName}>
        <PageSectionTitleRow>Планирование</PageSectionTitleRow>

        <div className={planningPageToolbarRowClassName}>
          <PlanningMonthTimeline
            periodMonth={periodMonth}
            periodLabels={periodLabels}
            itemCounts={itemCounts}
            onSelect={onSelectMonth}
          />

          <AddButton
            className={planningPageAddButtonClassName}
            onClick={() => setCreateOpen(true)}
          >
            Новый план
          </AddButton>
        </div>
      </div>

      <CreatePlannedExpenseDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        anchorPeriodMonth={periodMonth}
      />
    </>
  )
}
