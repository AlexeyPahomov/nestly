import { RussianRuble } from 'lucide-react'

import { Input, type InputProps } from './Input'

export type MoneyInputProps = Omit<InputProps, 'inputMode' | 'type'>

const rubleSuffix = (
  <RussianRuble className="size-3 shrink-0" strokeWidth={2} />
)

export function MoneyInput({
  autoComplete = 'off',
  suffix = rubleSuffix,
  ...props
}: MoneyInputProps) {
  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      autoComplete={autoComplete}
      suffix={suffix}
    />
  )
}
