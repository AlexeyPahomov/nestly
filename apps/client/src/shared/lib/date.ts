/** Значение для `<input type="month">` для текущего месяца: `YYYY-MM`. */
export function currentMonthInputValue(): string {
  const d = new Date()
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
