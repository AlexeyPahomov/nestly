import { parseMoneyInput } from '@coffer/shared'

import type {
  CreateAllocationFormValues,
  ValidCreateAllocationFormPayload,
} from './types'

export function validateCreateAllocationForm(
  values: CreateAllocationFormValues,
  remainingBalance: number,
):
  | { ok: true; payload: ValidCreateAllocationFormPayload }
  | { ok: false; error: string } {
  if (!values.category_id) {
    return { ok: false as const, error: 'Выберите категорию' }
  }

  const parsed = parseMoneyInput(values.amount)
  if (parsed === null) {
    return { ok: false as const, error: 'Укажите сумму больше нуля' }
  }

  if (parsed > remainingBalance) {
    return {
      ok: false as const,
      error: 'Сумма превышает остаток по доходу',
    }
  }

  return {
    ok: true as const,
    payload: {
      category_id: values.category_id,
      amount: parsed,
    },
  }
}
