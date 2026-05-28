import * as React from 'react'
import { ru } from 'date-fns/locale'

import {
  dateInputValueFromDate,
  formatDateRangeLabel,
  parseDateInputValue,
} from '@/shared/lib/date'

import { Calendar } from '../calendar/Calendar'
import { DatePickerField, useDatePickerFieldId } from './DatePickerField'

type DateRangePickerProps = {
  id?: string
  label?: React.ReactNode
  emptyLabel?: string
  from: string
  to: string
  onChange: (from: string, to: string) => void
  disabled?: boolean
  containerClassName?: string
}

export function DateRangePicker({
  id: idProp,
  label,
  emptyLabel,
  from,
  to,
  onChange,
  disabled,
  containerClassName,
}: DateRangePickerProps) {
  const inputId = useDatePickerFieldId(idProp, label)
  const [open, setOpen] = React.useState(false)

  const fromDate = parseDateInputValue(from)
  const toDate = parseDateInputValue(to)
  const selected =
    fromDate != null ? { from: fromDate, to: toDate } : undefined

  return (
    <DatePickerField
      id={inputId}
      label={label}
      display={formatDateRangeLabel(from, to, emptyLabel)}
      mutedWhenEmpty={!from.trim()}
      disabled={disabled}
      containerClassName={containerClassName}
      open={open}
      onOpenChange={setOpen}
    >
      <Calendar
        locale={ru}
        mode="range"
        captionLayout="dropdown"
        defaultMonth={fromDate ?? new Date()}
        selected={selected}
        onSelect={(range) => {
          if (!range?.from) {
            return
          }
          const nextFrom = dateInputValueFromDate(range.from)
          const nextTo = range.to ? dateInputValueFromDate(range.to) : ''
          onChange(nextFrom, nextTo)
          if (range.to) {
            setOpen(false)
          }
        }}
        autoFocus
      />
    </DatePickerField>
  )
}
