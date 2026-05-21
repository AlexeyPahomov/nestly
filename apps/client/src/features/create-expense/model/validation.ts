import type { CreateExpenseFormValues } from './types'

export function validateCreateExpenseForm(
  values: CreateExpenseFormValues,
): string | null {
  if (!values.category_id) {
    return 'Выберите категорию'
  }

  const parsedAmount = Number.parseFloat(values.amount.replace(',', '.'))

  if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return 'Укажите сумму больше нуля'
  }

  if (!values.date) {
    return 'Выберите дату'
  }

  return null
}
