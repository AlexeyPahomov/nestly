import type { Income } from '@/entities/income/model/types'
import { toMoneyNumber } from '@/shared/lib/money'

/** Доход с наибольшим нераспределённым остатком. */
export function pickIncomeWithMaxRemaining(
  incomes: readonly Income[],
  allocatedByIncome: Map<string, number>,
): string | null {
  if (incomes.length === 0) {
    return null
  }

  let bestId = incomes[0].id
  let bestRemaining = -Infinity

  for (const income of incomes) {
    const remaining =
      toMoneyNumber(income.amount) - (allocatedByIncome.get(income.id) ?? 0)

    if (remaining > bestRemaining) {
      bestRemaining = remaining
      bestId = income.id
    }
  }

  return bestId
}
