import { parseMoneyInput } from '@coffer/shared'

import { monthInputToPeriodMonth } from '@/shared/lib/date'

import type { IncomeFormPayload, IncomeFormValues } from './types'

export function validateIncomeForm(
  values: IncomeFormValues,
):
  | { ok: true; payload: IncomeFormPayload }
  | { ok: false; error: string } {
  const parsed = parseMoneyInput(values.amount)
  if (parsed === null) {
    return { ok: false as const, error: 'Укажите сумму больше нуля' }
  }

  const period_month = monthInputToPeriodMonth(values.period_month)
  if (!period_month) {
    return { ok: false as const, error: 'Выберите месяц' }
  }

  return {
    ok: true as const,
    payload: {
      amount: parsed,
      source: values.source.trim() || undefined,
      period_month,
    },
  }
}
