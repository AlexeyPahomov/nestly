import { useState } from 'react'

import { CreatePlannedExpenseDialog } from '@/features/create-planned-expense/ui/CreatePlannedExpenseDialog'
import { AddButton, PageTitle } from '@/shared/ui'
import { PlanningMonthTimeline } from '@/widgets/planning-month-timeline/ui/PlanningMonthTimeline'

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
      <div className="flex shrink-0 flex-col gap-6">
        <PageTitle>Планирование</PageTitle>

        <div className="flex items-center justify-between gap-4">
          <PlanningMonthTimeline
            periodMonth={periodMonth}
            periodLabels={periodLabels}
            itemCounts={itemCounts}
            onSelect={onSelectMonth}
          />

          <AddButton onClick={() => setCreateOpen(true)}>Новый план</AddButton>
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
