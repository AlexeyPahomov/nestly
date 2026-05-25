export const plannedExpenseQueryKeys = {
  all: ['planned-expense'] as const,
  byPeriod: (periodMonth: string) =>
    [...plannedExpenseQueryKeys.all, periodMonth] as const,
}
