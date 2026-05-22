export const budgetMonthQueryKeys = {
  all: ['budget-month'] as const,
  byPeriod: (periodMonth: string) =>
    [...budgetMonthQueryKeys.all, periodMonth] as const,
}
