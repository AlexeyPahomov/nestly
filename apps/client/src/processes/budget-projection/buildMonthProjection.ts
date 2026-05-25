import {
  projectMonthBudget,
  sumPlannedExpenseCommitments,
  type MonthBudgetProjection,
} from '@nestly/shared'

import type { PlannedExpense } from '@/entities/planned-expense/model/types'

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
      status: row.status,
    })),
  )

  return projectMonthBudget({
    available: input.available,
    spentTotal: input.spentTotal,
    commitments,
  })
}
