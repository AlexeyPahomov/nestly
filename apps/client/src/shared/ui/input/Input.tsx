import * as React from 'react'

import { formLabelClassName } from '@/shared/config/formUi'
import { cn } from '@/shared/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
  label?: React.ReactNode
  /** Классы обёртки (когда передан `label`). */
  containerClassName?: string
  /** Иконка или символ справа внутри поля. */
  suffix?: React.ReactNode
}

function Input({
  className,
  type,
  id,
  label,
  containerClassName,
  suffix,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? (label != null && label !== '' ? generatedId : undefined)

  const control = (
    <div className={cn(suffix != null && 'relative')}>
      <input
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          suffix != null && 'pr-9',
          className,
        )}
        {...props}
      />
      {suffix != null ? (
        <span
          className="pointer-events-none absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center text-muted-foreground"
          aria-hidden
        >
          {suffix}
        </span>
      ) : null}
    </div>
  )

  if (label == null || label === '') {
    return control
  }

  return (
    <div data-slot="input-field" className={cn(containerClassName)}>
      <label htmlFor={inputId} className={formLabelClassName}>
        {label}
      </label>
      {control}
    </div>
  )
}

export { Input, type InputProps }
