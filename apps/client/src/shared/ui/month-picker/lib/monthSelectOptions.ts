import { monthValueFromDate, parseMonthStringToDate } from '@/shared/lib/date'

function addMonths(date: Date, monthDelta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + monthDelta, 1)
}

function buildMonthRange(start: Date, end: Date): string[] {
  const options: string[] = []
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1)
  const endTime = end.getTime()

  while (cursor.getTime() <= endTime) {
    options.push(monthValueFromDate(cursor))
    cursor = addMonths(cursor, 1)
  }

  return options
}

/** Подпись пункта: «май 2026», «апрель 2026» (именительный падеж). */
export function formatPeriodMonthSelectLabel(periodMonth: string): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const monthPart = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
  })
    .format(date)
    .toLowerCase()

  return `${monthPart} ${date.getFullYear()}`
}

export type PeriodMonthSelectOption = {
  value: string
  label: string
}

/** Список месяцев для Select вокруг выбранного значения. */
export function buildPeriodMonthSelectOptions(
  anchorPeriodMonth: string,
  spanMonths = 24,
): PeriodMonthSelectOption[] {
  const anchorDate = parseMonthStringToDate(anchorPeriodMonth) ?? new Date()
  const start = addMonths(anchorDate, -spanMonths)
  const end = addMonths(anchorDate, spanMonths)

  return buildMonthRange(start, end).map((value) => ({
    value,
    label: formatPeriodMonthSelectLabel(value),
  }))
}
