import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { dateInputValueFromDate, todayDateInputValue } from '@/shared/lib/date'

import type { CreatePlannedExpenseFormValues } from '../model/types'

export function emptyPlannedExpenseFormValues(): CreatePlannedExpenseFormValues {
  return {
    title: '',
    description: '',
    amount: '',
    planned_date: todayDateInputValue(),
  }
}

export function plannedExpenseToFormValues(
  item: PlannedExpense,
): CreatePlannedExpenseFormValues {
  const date = new Date(item.planned_date)
  return {
    title: item.title,
    description: item.description ?? '',
    amount: String(item.amount),
    planned_date: Number.isNaN(date.getTime())
      ? item.planned_date.slice(0, 10)
      : dateInputValueFromDate(date),
  }
}

export function resolvePlannedExpenseFormValues(
  editingItem: PlannedExpense | null | undefined,
): CreatePlannedExpenseFormValues {
  if (editingItem) {
    return plannedExpenseToFormValues(editingItem)
  }
  return emptyPlannedExpenseFormValues()
}
