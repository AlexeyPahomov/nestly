import { formatMoneyAmount } from '@nestly/shared'
import type { ChangeEvent } from 'react'

export function formatMoneyInputOnBlur(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return ''
  }

  return formatMoneyAmount(trimmed) || trimmed
}

export function moneyAmountToFormValue(amount: number | string): string {
  return formatMoneyAmount(amount)
}

export function bindMoneyAmountField(
  value: string,
  onValueChange: (value: string) => void,
) {
  return {
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value)
    },
    onBlur: () => {
      onValueChange(formatMoneyInputOnBlur(value))
    },
  }
}
