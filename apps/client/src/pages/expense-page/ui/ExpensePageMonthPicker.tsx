import { cn } from '@/shared/lib/utils'
import { MonthPicker } from '@/shared/ui'

import {
  expensePageMonthPickerBudgetHeaderClassName,
  expensePageMonthPickerClassName,
  expensePageMonthPickerPageHeaderClassName,
} from '../lib/expensePageLayout'

export type ExpensePageMonthPickerPlacement = 'page-header' | 'budget-header'

type ExpensePageMonthPickerProps = {
  value: string
  onChange: (value: string) => void
  placement: ExpensePageMonthPickerPlacement
}

const expensePageMonthPickerPlacementClassName: Record<
  ExpensePageMonthPickerPlacement,
  string
> = {
  'page-header': expensePageMonthPickerPageHeaderClassName,
  'budget-header': expensePageMonthPickerBudgetHeaderClassName,
}

export function ExpensePageMonthPicker({
  value,
  onChange,
  placement,
}: ExpensePageMonthPickerProps) {
  return (
    <MonthPicker
      value={value}
      onChange={onChange}
      containerClassName={cn(
        expensePageMonthPickerClassName,
        expensePageMonthPickerPlacementClassName[placement],
      )}
    />
  )
}
