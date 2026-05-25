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
