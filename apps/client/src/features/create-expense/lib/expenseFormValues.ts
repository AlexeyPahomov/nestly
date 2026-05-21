import { dateInputValueFromDate, todayDateInputValue } from '@/shared/lib/date'
import type { Expense } from '@/entities/expense/model/types'

import type { CreateExpenseFormValues } from '../model/types'

const emptyFormValues = (): CreateExpenseFormValues => ({
  category_id: '',
  amount: '',
  description: '',
  date: todayDateInputValue(),
})

export function resolveCreateExpenseFormValues(
  editingExpense: Expense | null | undefined,
): CreateExpenseFormValues {
  if (editingExpense) {
    return expenseToFormValues(editingExpense)
  }
  return emptyFormValues()
}

export function expenseToFormValues(expense: Expense): CreateExpenseFormValues {
  const date = new Date(expense.date)
  return {
    category_id: expense.category_id,
    amount: String(expense.amount),
    description: expense.description ?? '',
    date: Number.isNaN(date.getTime())
      ? expense.date.slice(0, 10)
      : dateInputValueFromDate(date),
  }
}
