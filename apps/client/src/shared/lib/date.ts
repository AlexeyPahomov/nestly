/** Значение для `<input type="month">` для текущего месяца: `YYYY-MM`. */
export function currentMonthInputValue(): string {
  const d = new Date()
  return monthValueFromDate(d)
}

/** Первый день месяца из строки `YYYY-MM` (локальный календарь). */
export function parseMonthStringToDate(value: string): Date | undefined {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) {
    return undefined
  }
  const [ys, ms] = value.split('-')
  const y = Number(ys)
  const m = Number(ms)
  if (!Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) {
    return undefined
  }
  return new Date(y, m - 1, 1)
}

/** Строка `YYYY-MM` для API/формы из даты (локальный месяц). */
export function monthValueFromDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/** `YYYY-MM` из month-input → первый день месяца для API (`YYYY-MM-01`). */
export function monthInputToPeriodMonth(value: string): string {
  if (!value) {
    return ''
  }
  return `${value}-01`
}
