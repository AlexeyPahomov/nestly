import { INCOME_ADD_LABEL } from '@/features/create-income/lib/incomeFormDialogCopy'
import { AddButton, Fab } from '@/shared/ui'
import {
  planningPageAddButtonDesktopClassName,
  planningPageToolbarClassName,
  planningPageToolbarRowClassName,
} from '@/widgets/planning-page-toolbar/lib/planningPageToolbarLayout'
import { PlanningMonthTimeline } from '@/widgets/planning-month-timeline/ui/PlanningMonthTimeline'

export type IncomePageToolbarProps = {
  periodMonth: string
  periodLabels: Record<string, string>
  incomeCounts: Record<string, number>
  onSelectMonth: (periodMonth: string) => void
  onAdd: () => void
  addLabel?: string
}

export function IncomePageToolbar({
  periodMonth,
  periodLabels,
  incomeCounts,
  onSelectMonth,
  onAdd,
  addLabel = INCOME_ADD_LABEL,
}: IncomePageToolbarProps) {
  return (
    <>
      <div className={planningPageToolbarClassName}>
        <div className={planningPageToolbarRowClassName}>
          <PlanningMonthTimeline
            periodMonth={periodMonth}
            periodLabels={periodLabels}
            itemCounts={incomeCounts}
            itemSwatches={{}}
            onSelect={onSelectMonth}
            showMeta={false}
          />

          <AddButton
            className={planningPageAddButtonDesktopClassName}
            onClick={onAdd}
          >
            {addLabel}
          </AddButton>
        </div>
      </div>

      <Fab label={addLabel} onClick={onAdd} />
    </>
  )
}
