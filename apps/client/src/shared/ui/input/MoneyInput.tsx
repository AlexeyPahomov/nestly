import { RussianRuble } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

import { Input, type InputProps } from './Input'

export type MoneyInputProps = Omit<InputProps, 'inputMode' | 'type'>

const rubleSuffix = (
  <RussianRuble className="size-3 shrink-0" strokeWidth={2} />
)

export function MoneyInput({
  autoComplete = 'off',
  suffix = rubleSuffix,
  className,
  ...props
}: MoneyInputProps) {
  return (
    <Input
      {...props}
      className={cn(
        'placeholder:text-xs placeholder:font-medium md:placeholder:text-xs',
        className,
      )}
      type="text"
      inputMode="decimal"
      autoComplete={autoComplete}
      suffix={suffix}
    />
  )
}
