import { useMemo, useState } from 'react'

import { computeOperationalSummary } from '@/entities/budget/lib/computeOperationalSummary'
import { monthProjectionFromSummary } from '@/entities/budget/lib/monthProjectionFromSummary'
import { formatPeriodMonthLabel } from '@/entities/budget/lib/periodLabels'
import { usePeriodBudgetCore } from '@/entities/budget/model/usePeriodBudgetCore'
import { usePlannedExpensesQuery } from '@/entities/planned-expense/api/usePlannedExpensesQuery'
import { usePlannedExpenseStatusMutation } from '@/entities/planned-expense/api/usePlannedExpenseStatusMutation'
import { buildPlanningTimelineMonths } from '@/entities/planned-expense/lib/buildPlanningTimelineMonths'
import {
  countPlannedExpensesByPeriodMonth,
  filterPlannedExpensesByPeriodMonth,
} from '@/entities/planned-expense/lib/groupPlannedExpensesByPeriodMonth'
import { currentMonthInputValue } from '@/shared/lib/date'

export function usePlanningPage() {
  const [periodMonth, setPeriodMonth] = useState(currentMonthInputValue)
  const plannedQuery = usePlannedExpensesQuery()
  const statusMutation = usePlannedExpenseStatusMutation()

  const core = usePeriodBudgetCore(periodMonth)
  const allPlanned = plannedQuery.data ?? []

  const periodPlanned = useMemo(
    () => filterPlannedExpensesByPeriodMonth(allPlanned, periodMonth),
    [allPlanned, periodMonth],
  )

  const operationalSummary = useMemo(
    () =>
      computeOperationalSummary(
        core.budgetItems,
        core.incomes,
        core.allocations,
        core.expenses,
        periodMonth,
        periodPlanned,
      ),
    [
      core.budgetItems,
      core.incomes,
      core.allocations,
      core.expenses,
      periodMonth,
      periodPlanned,
    ],
  )

  const projection = useMemo(
    () => monthProjectionFromSummary(operationalSummary),
    [operationalSummary],
  )

  const periodLabels = useMemo(() => {
    const months = buildPlanningTimelineMonths(periodMonth)
    return Object.fromEntries(
      months.map((month) => [month, formatPeriodMonthLabel(month)]),
    )
  }, [periodMonth])

  const itemCounts = useMemo(
    () => countPlannedExpensesByPeriodMonth(allPlanned),
    [allPlanned],
  )

  return {
    periodMonth,
    setPeriodMonth,
    periodLabel: operationalSummary.periodLabel,
    periodPlanned,
    projection,
    periodLabels,
    itemCounts,
    reserve: (id: string) =>
      statusMutation.mutate({ id, status: 'RESERVED' }),
    cancelPlan: (id: string) =>
      statusMutation.mutate({ id, status: 'CANCELLED' }),
    reservePending: statusMutation.isPending,
    isLoading: plannedQuery.isLoading || core.isCoreLoading,
  }
}
