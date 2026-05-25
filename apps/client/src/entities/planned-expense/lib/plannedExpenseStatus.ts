import type { PlannedExpenseStatus } from '../model/types'

export const PLANNED_EXPENSE_STATUS_LABELS: Record<
  PlannedExpenseStatus,
  string
> = {
  PLANNED: 'План',
  RESERVED: 'Резерв',
  COMPLETED: 'Выполнено',
  CANCELLED: 'Отменено',
}
