import { cn } from '@/shared/lib/utils'

export type PlanningMetricAccent =
  | 'forecast'
  | 'pool'
  | 'planned'
  | 'reserved'
  | 'savings'
  | 'spent'

const accentBorderClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'border-l-green',
  pool: 'border-l-teal',
  planned: 'border-l-blue',
  reserved: 'border-l-orange',
  savings: 'border-l-green',
  spent: 'border-l-slate',
}

const accentValueClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'text-green',
  pool: 'text-zinc-900',
  planned: 'text-blue',
  reserved: 'text-orange',
  savings: 'text-green',
  spent: 'text-slate',
}

export const planningMetricCardShellClassName =
  'relative overflow-hidden rounded-xl border border-zinc-200/80 border-l-4 bg-white p-2.5 shadow-sm sm:p-4'

export function planningMetricCardAccentClassName(
  accent: PlanningMetricAccent,
): string {
  return cn(planningMetricCardShellClassName, accentBorderClassName[accent])
}

export function planningMetricValueClassName(
  accent: PlanningMetricAccent,
  value: number,
): string {
  if (value < 0 && (accent === 'forecast' || accent === 'pool')) {
    return 'text-destructive'
  }

  return accentValueClassName[accent]
}
