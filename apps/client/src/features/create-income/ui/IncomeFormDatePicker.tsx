import { DatePicker } from '@/shared/ui'

import { incomeFormDatePickerClassName } from '../lib/incomeFormLayout'

type IncomeFormDatePickerProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function IncomeFormDatePicker({
  id,
  value,
  onChange,
  disabled,
}: IncomeFormDatePickerProps) {
  return (
    <DatePicker
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      containerClassName={incomeFormDatePickerClassName}
    />
  )
}
