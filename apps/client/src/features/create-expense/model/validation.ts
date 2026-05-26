import { parseMoneyInput } from '@coffer/shared'

import type { CreateExpenseFormValues } from './types'

export function validateCreateExpenseForm(
  values: CreateExpenseFormValues,
): string | null {
  if (!values.category_id) {
    return 'Выберите категорию'
  }

  const parsedAmount = parseMoneyInput(values.amount)

  if (parsedAmount === null) {
    return 'Укажите сумму больше нуля'
  }

  if (!values.date) {
    return 'Выберите дату'
  }

  return null
}
