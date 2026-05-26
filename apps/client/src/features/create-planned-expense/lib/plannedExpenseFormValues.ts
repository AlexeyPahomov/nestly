import {
  DEFAULT_ICON_COLOR_KEY,
  DEFAULT_PLANNED_EXPENSE_ICON_KEY,
} from '@coffer/shared'

import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { dateInputValueFromDate, todayDateInputValue } from '@/shared/lib/date'
import { moneyAmountToFormValue } from '@/shared/lib/moneyInput'

import type { CreatePlannedExpenseFormValues } from '../model/types'

export function emptyPlannedExpenseFormValues(): CreatePlannedExpenseFormValues {
  return {
    title: '',
    description: '',
    icon_name: DEFAULT_PLANNED_EXPENSE_ICON_KEY,
    icon_color: DEFAULT_ICON_COLOR_KEY,
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
    icon_name: item.icon_name,
    icon_color: item.icon_color,
    amount: moneyAmountToFormValue(item.amount),
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
