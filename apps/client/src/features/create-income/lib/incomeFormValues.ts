import { DEFAULT_INCOME_TYPE, resolveIncomeType } from '@coffer/shared'

import type { Income } from '@/entities/income/model/types'
import { isoToDateInputValue, todayDateInputValue } from '@/shared/lib/date'
import { moneyAmountToFormValue } from '@/shared/lib/moneyInput'

import type { IncomeFormValues } from '../model/types'

export function emptyIncomeFormValues(): IncomeFormValues {
  return {
    amount: '',
    source: '',
    income_type: DEFAULT_INCOME_TYPE,
    period_month: todayDateInputValue(),
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
    income_type: resolveIncomeType(income.income_type),
    period_month: isoToDateInputValue(income.period_month),
  }
}
