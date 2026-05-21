import { toMoneyNumber } from '@/shared/lib/money'

export function formatAmount(value: string | number): string {
  const n = toMoneyNumber(value)
  if (Number.isNaN(n)) {
    return '—'
  }
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(n)
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
