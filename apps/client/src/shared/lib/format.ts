import { formatMoneyAmount } from '@nestly/shared'

export function formatAmount(value: string | number): string {
  const formatted = formatMoneyAmount(value)
  if (!formatted) {
    return '—'
  }
  return formatted
}

const RUBLE_SIGN = '₽'

/** Сумма с разделителями разрядов и знаком ₽. */
export function formatMoneyWithRub(value: string | number): string {
  const amount = formatAmount(value)
  if (amount === '—') {
    return amount
  }
  return `${amount} ${RUBLE_SIGN}`
}

/** Диапазон сумм с одним знаком ₽ в конце (`5 000 / 10 000 ₽`). */
export function formatMoneyRange(
  from: string | number,
  to: string | number,
): string {
  const fromAmount = formatAmount(from)
  const toAmount = formatAmount(to)
  if (fromAmount === '—' || toAmount === '—') {
    return '—'
  }
  return `${fromAmount} / ${toAmount} ${RUBLE_SIGN}`
}

export function formatDateLabel(isoDate: string): string {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) {
    return isoDate
  }
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Дата расхода для списка и карточек. */
export function formatExpenseDate(isoDate: string): string {
  return formatDateLabel(isoDate)
}

export function formatMonthLabel(isoDate: string): string {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) {
    return isoDate
  }
  return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })
}
