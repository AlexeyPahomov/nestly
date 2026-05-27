import { formatAmount } from '@/shared/lib/format'

export const CURRENT_BUDGET_AVAILABLE_INFO =
  'Доходы за месяц за вычетом уже распределённых по категориям сумм. При перерасходе конверта свободный остаток уменьшается.'

export function buildCurrentBudgetAvailableInfo(
  carryForwardTotal: number,
  previousPeriodLabel?: string,
): string {
  if (carryForwardTotal === 0 || !previousPeriodLabel) {
    return CURRENT_BUDGET_AVAILABLE_INFO
  }

  const carryLine = `Перенесено с ${previousPeriodLabel}: ${formatAmount(carryForwardTotal)}.`

  return `${CURRENT_BUDGET_AVAILABLE_INFO} ${carryLine}`
}

export const CURRENT_BUDGET_RESERVE_INFO =
  'Резервные средства. Используйте только для целей накопления.'

export const CURRENT_BUDGET_RESERVE_LABEL = 'В резерве'
