import { CalendarIcon } from 'lucide-react'

import { MonthPicker } from '@/shared/ui'

import {
  expensePageMonthPickerClassName,
  expensePageMonthPickerIconClassName,
} from '../lib/expensePageLayout'

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
      omitYear
      containerClassName={expensePageMonthPickerClassName}
      leadingIcon={
        <CalendarIcon
          className={expensePageMonthPickerIconClassName}
          aria-hidden
        />
      }
    />
  )
}
