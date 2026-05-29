import { CalendarIcon } from 'lucide-react'

import { MonthPicker } from '@/shared/ui'

import {
  incomeFormMonthPickerClassName,
  incomeFormMonthPickerIconClassName,
  incomeFormMonthPickerTriggerClassName,
} from '../lib/incomeFormLayout'

type IncomeFormMonthPickerProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function IncomeFormMonthPicker({
  id,
  value,
  onChange,
  disabled,
}: IncomeFormMonthPickerProps) {
  return (
    <MonthPicker
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      contentPosition="popper"
      modal={false}
      containerClassName={incomeFormMonthPickerClassName}
      triggerClassName={incomeFormMonthPickerTriggerClassName}
      leadingIcon={
        <CalendarIcon
          className={incomeFormMonthPickerIconClassName}
          aria-hidden
        />
      }
    />
  )
}
