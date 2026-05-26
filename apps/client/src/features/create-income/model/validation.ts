import { parseMoneyInput } from '@nestly/shared'

import { monthInputToPeriodMonth } from '@/shared/lib/date'

import type { CreateIncomeFormValues, ValidCreateIncomeFormPayload } from './types'

export function validateCreateIncomeForm(
  values: CreateIncomeFormValues,
):
  | { ok: true; payload: ValidCreateIncomeFormPayload }
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
