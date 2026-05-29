import { cn } from '@/shared/lib/utils'
import {
  pageScrollRingInsetClassName,
  safariIosFlexFillClassName,
} from '@/shared/lib/scrollLayout'
import { contentTransitionOutletShellClassName } from '@/shared/ui/content-transition/contentTransitionLayout'
import { mobileFabScrollReserveClassName } from '@/shared/ui/fab'

export const incomePageSectionClassName = 'max-md:gap-2'

/** На мобилке скролл только у списка; шапка (месяцы, метрики) не прокручивается. */
export const incomePageShellClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-3',
  'max-md:overflow-hidden max-md:overscroll-none md:overflow-hidden',
)

/** Смена месяца: плавный exit/enter у метрик и списка. */
export const incomePageMonthTransitionClassName = cn(
  contentTransitionOutletShellClassName,
  'min-h-0 flex-1',
  'md:flex-none md:overflow-visible',
  safariIosFlexFillClassName,
)

export const incomePageMonthBodyClassName = cn(
  'flex min-h-0 flex-1 flex-col gap-3 max-md:min-h-0',
  'max-md:overflow-hidden max-md:overscroll-none',
  'md:flex-none',
)

/** Шапка страницы: только по высоте контента, без растягивания. */
export const incomePageDashboardClassName = 'flex shrink-0 flex-col gap-3'

export const incomePageMetricsRowClassName = cn(
  'grid grid-cols-1 gap-2 min-[441px]:grid-cols-2 min-[441px]:items-stretch',
)

export const incomePageMetricCardClassName =
  'flex h-full min-h-0 min-w-0 flex-col'

export const incomePageMetricPanelClassName = cn(
  'flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm',
  'border-l-4',
)

export const incomePageMetricLineTitleClassName =
  'text-xs font-medium text-zinc-600'

export const incomePageAccentValueClassName = 'text-blue'

export const incomePageMetricLineValueClassName = cn(
  'mt-1 text-xl font-bold tabular-nums',
  incomePageAccentValueClassName,
)

export const incomePageMetricLineValueRubClassName =
  'text-sm font-semibold text-blue/45'

export const incomePageAccentPositiveClassName = 'text-blue'

export const incomePageMetricLineCaptionClassName =
  'mt-1 text-xs text-zinc-500'

export const incomePageListScrollClassName =
  'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'

/** Отступы и резерв под FAB у прокручиваемого списка доходов (мобилка). */
export const incomePageListUlClassName = cn(
  pageScrollRingInsetClassName,
  'max-md:pe-2',
  mobileFabScrollReserveClassName,
)

export const incomePageListEmptyClassName = cn(
  'max-md:pe-2',
  mobileFabScrollReserveClassName,
)

export const incomePageHeroClassName = cn(
  incomePageMetricPanelClassName,
  'border-l-blue bg-blue-subtle/40',
)
