/** Статусы planned expense, влияющие на проекцию месяца. */
export type ActivePlannedExpenseStatus = 'PLANNED' | 'RESERVED'

export type PlannedExpenseCommitmentRow = {
  amount: number
  status: string
}

export type PlannedExpenseCommitments = {
  planned: number
  reserved: number
}

/** Суммы по активным обязательствам (без COMPLETED / CANCELLED). */
export function sumPlannedExpenseCommitments(
  rows: readonly PlannedExpenseCommitmentRow[],
): PlannedExpenseCommitments {
  let planned = 0
  let reserved = 0

  for (const row of rows) {
    if (row.status === 'RESERVED') {
      reserved += row.amount
    } else if (row.status === 'PLANNED') {
      planned += row.amount
    }
  }

  return { planned, reserved }
}

export type MonthBudgetProjectionInput = {
  /** Не распределено по конвертам (как `OperationalSummary.available`). */
  available: number
  /** Уже потрачено за месяц (факт). */
  spentTotal: number
  commitments: PlannedExpenseCommitments
}

export type MonthBudgetProjection = {
  available: number
  spentTotal: number
  plannedTotal: number
  reservedTotal: number
  /** planned + reserved — будущие обязательства из плана. */
  commitmentTotal: number
  /** Свободный пул после резерва и планов (ещё не потраченных). */
  projectedFree: number
}

/**
 * Прогноз свободного остатка: если все планы и резервы исполнятся,
 * сколько останется из нераспределённого пула.
 */
export function projectMonthBudget(
  input: MonthBudgetProjectionInput,
): MonthBudgetProjection {
  const { planned, reserved } = input.commitments
  const commitmentTotal = planned + reserved
  const projectedFree = input.available - commitmentTotal

  return {
    available: input.available,
    spentTotal: input.spentTotal,
    plannedTotal: planned,
    reservedTotal: reserved,
    commitmentTotal,
    projectedFree,
  }
}
