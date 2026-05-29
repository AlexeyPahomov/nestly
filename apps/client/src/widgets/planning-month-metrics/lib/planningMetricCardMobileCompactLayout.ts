/** Компактный вид в три колонки на мобилке (страница расходов). */
export const planningMetricCardMobileCompactLayout = {
  shell:
    'max-md:flex max-md:min-h-[3.25rem] max-md:flex-col max-md:p-1.5 max-md:pr-6 max-md:shadow-none',
  body: 'max-md:mt-auto max-md:flex max-md:min-w-0 max-md:flex-col max-md:items-start max-md:gap-0',
  titleRow: 'max-md:justify-start',
  title: 'max-md:text-left max-md:text-[11px] max-md:leading-tight',
  value: 'max-md:text-left max-md:text-sm max-md:font-semibold max-md:leading-none',
  infoTop:
    'absolute top-2.5 right-1.5 z-[1] size-3.5 sm:hidden [&_svg]:size-2.5',
  infoDesktopInline: 'hidden shrink-0 sm:inline-flex',
} as const

export function whenMobileCompact(
  mobileCompact: boolean,
  className: string,
): string | undefined {
  return mobileCompact ? className : undefined
}
