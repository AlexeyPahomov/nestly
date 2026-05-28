import { cn } from '@/shared/lib/utils'

type SummaryMetricCompactOptions = {
  responsiveCompact: boolean
  keepLabelStartOnMobile: boolean
  compactInfoBottom: boolean
}

export function summaryMetricCardClassName({
  responsiveCompact,
  compactInfoBottom,
}: Pick<SummaryMetricCompactOptions, 'responsiveCompact' | 'compactInfoBottom'>) {
  return cn(
    'relative flex h-full flex-col gap-0 bg-white py-4 ring-zinc-200/80',
    responsiveCompact && 'max-md:py-2 max-md:ring-1',
    compactInfoBottom && 'pb-10',
    responsiveCompact && compactInfoBottom && 'max-md:pb-2',
  )
}

export function summaryMetricCardBodyClassName(
  responsiveCompact: boolean,
  iconBesideContent: boolean,
) {
  return cn(
    'flex min-h-0 flex-1 flex-col px-4',
    responsiveCompact &&
      !iconBesideContent &&
      'max-md:items-center max-md:px-2 max-md:text-center',
    iconBesideContent && 'max-md:px-2',
  )
}

export function summaryMetricCardIconBesideRowClassName(iconBesideContent: boolean) {
  return cn(
    iconBesideContent &&
      'max-md:flex max-md:min-w-0 max-md:flex-1 max-md:items-center max-md:gap-2',
  )
}

export function summaryMetricCardTextColumnClassName(iconBesideContent: boolean) {
  return cn(
    'flex min-w-0 flex-1 flex-col',
    iconBesideContent && 'max-md:items-start max-md:text-left',
  )
}

export function summaryMetricCardHeaderClassName({
  responsiveCompact,
  iconBesideContent,
}: Pick<SummaryMetricCompactOptions, 'responsiveCompact'> & {
  iconBesideContent: boolean
}) {
  return cn(
    'flex min-h-8 shrink-0 items-center gap-2',
    responsiveCompact && !iconBesideContent && 'max-md:min-h-0 max-md:justify-center',
    iconBesideContent && 'max-md:min-h-0',
  )
}

export function summaryMetricCardIconSlotClassName({
  responsiveCompact,
  keepLabelStartOnMobile,
  iconBesideContent,
}: Pick<
  SummaryMetricCompactOptions,
  'responsiveCompact' | 'keepLabelStartOnMobile'
> & { iconBesideContent: boolean }) {
  return cn(
    'flex size-8 shrink-0 items-center justify-center',
    responsiveCompact && !keepLabelStartOnMobile && 'max-md:hidden',
    responsiveCompact && keepLabelStartOnMobile && 'max-md:size-6',
    iconBesideContent && 'max-md:self-center',
  )
}

export const summaryMetricCardLabelClassName =
  'min-w-0 flex-1 text-sm leading-snug text-zinc-500'

export function summaryMetricCardLabelCompactClassName(responsiveCompact: boolean) {
  return cn(
    responsiveCompact && 'max-md:flex-none max-md:text-[11px] max-md:leading-tight',
  )
}

export function summaryMetricCardInfoSlotClassName(responsiveCompact: boolean) {
  return cn(
    'flex shrink-0 items-center self-center',
    responsiveCompact && 'max-md:hidden',
  )
}

export function summaryMetricCardValueClassName(
  responsiveCompact: boolean,
  valueClassName: string | undefined,
  iconBesideContent: boolean,
) {
  return cn(
    'mt-auto pt-1 text-2xl font-bold leading-none tracking-tight tabular-nums text-zinc-900',
    responsiveCompact && 'max-md:pt-0.5 max-md:text-base max-md:font-semibold',
    iconBesideContent && 'max-md:mt-0 max-md:pt-0',
    valueClassName,
  )
}

export function summaryMetricCardBottomInfoClassName(responsiveCompact: boolean) {
  return cn(
    'absolute bottom-4 right-4',
    responsiveCompact && 'max-md:hidden',
  )
}
