import * as React from 'react'
import { CalendarIcon } from 'lucide-react'

import { formLabelClassName } from '@/shared/config/formUi'
import { cn } from '@/shared/lib/utils'

import { buttonVariants } from '../button/variants'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'

type DatePickerFieldProps = {
  id?: string
  label?: React.ReactNode
  display: string
  mutedWhenEmpty?: boolean
  disabled?: boolean
  containerClassName?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function useDatePickerFieldId(
  idProp: string | undefined,
  label: React.ReactNode,
) {
  const generatedId = React.useId()
  return idProp ?? (label != null && label !== '' ? generatedId : undefined)
}

export function DatePickerField({
  id: inputId,
  label,
  display,
  mutedWhenEmpty = false,
  disabled,
  containerClassName,
  open,
  onOpenChange,
  children,
}: DatePickerFieldProps) {
  const control = (
    <Popover open={open} onOpenChange={onOpenChange}>
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
          <span
            className={cn(
              'truncate',
              mutedWhenEmpty && 'text-muted-foreground',
            )}
          >
            {display}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {children}
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
