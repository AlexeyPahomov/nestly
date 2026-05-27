import { MonthPicker } from '@/shared/ui'

import { expensePageMonthPickerClassName } from '../lib/expensePageLayout'

type ExpensePageMonthPickerProps = {
  value: string
  onChange: (value: string) => void
}

export function ExpensePageMonthPicker({
  value,
  onChange,
}: ExpensePageMonthPickerProps) {
  return (
    <MonthPicker
      value={value}
      onChange={onChange}
      containerClassName={expensePageMonthPickerClassName}
    />
  )
}
