import type { PlannedExpense } from '@/entities/planned-expense/model/types'

import { projectMonthBudget } from './projectMonthBudget'
import { sumPlannedExpenseCommitments } from './sumPlannedExpenseCommitments'
import type { MonthBudgetProjection } from './types'

export type BuildMonthProjectionInput = {
  available: number
  spentTotal: number
  plannedExpenses: readonly PlannedExpense[]
}

export function buildMonthProjection(
  input: BuildMonthProjectionInput,
): MonthBudgetProjection {
  const commitments = sumPlannedExpenseCommitments(
    input.plannedExpenses.map((row) => ({
      amount: row.amount,
      reserved_amount: row.reserved_amount,
      status: row.status,
    })),
  )

  return projectMonthBudget({
    available: input.available,
    spentTotal: input.spentTotal,
    commitments,
  })
}
