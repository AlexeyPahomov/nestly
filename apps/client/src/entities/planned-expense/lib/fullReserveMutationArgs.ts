import type { PlannedExpenseStatus } from '../model/types'

export type PlannedExpenseStatusMutationArgs = {
  id: string
  status: PlannedExpenseStatus
  reserveAmount?: number
}

/** Полный резерв плана: RESERVED + reserved_amount = amount. */
export function fullReserveMutationArgs(
  id: string,
  amount: number,
): PlannedExpenseStatusMutationArgs {
  return { id, status: 'RESERVED', reserveAmount: amount }
}

/** Снять резерв: PLANNED + reserved_amount = 0. */
export function unreservePlannedExpenseMutationArgs(
  id: string,
): PlannedExpenseStatusMutationArgs {
  return { id, status: 'PLANNED', reserveAmount: 0 }
}
