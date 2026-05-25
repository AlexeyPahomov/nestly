import { parseMonthStringToDate } from '@/shared/lib/date'

type FormatPeriodMonthLabelOptions = {
  lowercase?: boolean
}

export function formatPeriodMonthLabel(
  periodMonth: string,
  options?: FormatPeriodMonthLabelOptions,
): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const label = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(date)

  const withoutYearSuffix = label.replace(/\s*г\.?$/, '')

  if (options?.lowercase) {
    return withoutYearSuffix.toLowerCase()
  }

  return withoutYearSuffix.charAt(0).toUpperCase() + withoutYearSuffix.slice(1)
}

/** Месяц в родительном падеже для «перенесено с …» (без года). */
export function formatPeriodMonthGenitive(periodMonth: string): string {
  const date = parseMonthStringToDate(periodMonth)

  if (!date) {
    return periodMonth
  }

  const monthPart = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
    .formatToParts(date)
    .find((part) => part.type === 'month')?.value

  return monthPart?.toLowerCase() ?? periodMonth
}
