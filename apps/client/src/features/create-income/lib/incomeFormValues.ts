import { getMonthKeyFromIso } from '@coffer/shared'

import type { Income } from '@/entities/income/model/types'
import { currentMonthInputValue } from '@/shared/lib/date'
import { moneyAmountToFormValue } from '@/shared/lib/moneyInput'

import type { IncomeFormValues } from '../model/types'

export function emptyIncomeFormValues(): IncomeFormValues {
  return {
    amount: '',
    source: '',
    period_month: currentMonthInputValue(),
  }
}

export function resolveIncomeFormValues(
  income: Income | null | undefined,
): IncomeFormValues {
  if (!income) {
    return emptyIncomeFormValues()
  }

  return {
    amount: moneyAmountToFormValue(income.amount),
    source: income.source ?? '',
    period_month:
      getMonthKeyFromIso(income.period_month) ?? currentMonthInputValue(),
  }
}
