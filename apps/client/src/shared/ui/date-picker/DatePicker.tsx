import * as React from 'react'
import { ru } from 'date-fns/locale'

import {
  dateInputValueFromDate,
  formatDateRangeLabel,
  parseDateInputValue,
} from '@/shared/lib/date'

import { Calendar } from '../calendar/Calendar'
import { DatePickerField, useDatePickerFieldId } from './DatePickerField'

type DatePickerProps = {
  id?: string
  label?: React.ReactNode
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  containerClassName?: string
}

export function DatePicker({
  id: idProp,
  label,
  value,
  onChange,
  disabled,
  containerClassName,
}: DatePickerProps) {
  const inputId = useDatePickerFieldId(idProp, label)
  const [open, setOpen] = React.useState(false)

  const selected = parseDateInputValue(value)
  const display = formatDateRangeLabel(value)

  return (
    <DatePickerField
      id={inputId}
      label={label}
      display={display}
      mutedWhenEmpty={!value.trim()}
      disabled={disabled}
      containerClassName={containerClassName}
      open={open}
      onOpenChange={setOpen}
    >
      <Calendar
        locale={ru}
        mode="single"
        captionLayout="dropdown"
        defaultMonth={selected ?? new Date()}
        selected={selected}
        onSelect={(date) => {
          if (date) {
            onChange(dateInputValueFromDate(date))
            setOpen(false)
          }
        }}
        autoFocus
      />
    </DatePickerField>
  )
}
