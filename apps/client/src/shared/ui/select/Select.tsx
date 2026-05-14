import type { ReactNode } from 'react'

import { formLabelClassName } from '@/shared/config/formUi'
import { cn } from '@/shared/lib/utils'

import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './SelectPrimitives'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  id: string
  label: ReactNode
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  containerClassName?: string
  contentPosition?: 'popper' | 'item-aligned'
}

export function Select({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  containerClassName,
  contentPosition = 'popper',
}: SelectProps) {
  return (
    <div data-slot="select-field" className={cn(containerClassName)}>
      <label htmlFor={id} className={formLabelClassName}>
        {label}
      </label>
      <SelectRoot value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} size="default" className="w-full min-w-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position={contentPosition}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  )
}
