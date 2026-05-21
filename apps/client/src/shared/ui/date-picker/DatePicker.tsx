import * as React from 'react'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { formLabelClassName } from '@/shared/config/formUi'
import {
  dateInputValueFromDate,
  parseDateInputValue,
} from '@/shared/lib/date'
import { cn } from '@/shared/lib/utils'

import { buttonVariants } from '../button/variants'
import { Calendar } from '../calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'

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
  const generatedId = React.useId()
  const inputId =
    idProp ?? (label != null && label !== '' ? generatedId : undefined)
  const [open, setOpen] = React.useState(false)

  const selected = parseDateInputValue(value)
  const display = selected
    ? selected.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Выберите дату'

  const control = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'default' }),
            'w-full justify-start gap-2 text-left font-normal',
          )}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-60" />
          <span className="truncate">{display}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
      </PopoverContent>
    </Popover>
  )

  if (label == null || label === '') {
    return control
  }

  return (
    <div data-slot="date-picker-field" className={cn(containerClassName)}>
      <label htmlFor={inputId} className={formLabelClassName}>
        {label}
      </label>
      {control}
    </div>
  )
}
