import { projectMonthBudget } from './projectMonthBudget.js'
import { sumPlannedExpenseCommitments } from './sumPlannedExpenseCommitments.js'
import type {
  MonthBudgetProjection,
  PlannedExpenseCommitmentRow,
} from './types.js'

export type BuildMonthProjectionInput = {
  available: number
  spentTotal: number
  commitmentRows: readonly PlannedExpenseCommitmentRow[]
}

export function buildMonthProjection(
  input: BuildMonthProjectionInput,
): MonthBudgetProjection {
  const commitments = sumPlannedExpenseCommitments(input.commitmentRows)

  return projectMonthBudget({
    available: input.available,
    spentTotal: input.spentTotal,
    commitments,
  })
}
