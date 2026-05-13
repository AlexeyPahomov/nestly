export function formatAmount(value: string | number): string {
  const n = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(n)) {
    return '—'
  }
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(n)
}

export function formatMonthLabel(isoDate: string): string {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) {
    return isoDate
  }
  return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })
}
