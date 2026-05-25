import { cn } from '@/shared/lib/utils'

export type PlanningMetricAccent = 'forecast' | 'pool' | 'planned' | 'reserved'

const accentBorderClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'border-l-emerald-500',
  pool: 'border-l-teal-500',
  planned: 'border-l-blue-500',
  reserved: 'border-l-orange-500',
}

const accentValueClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'text-emerald-700',
  pool: 'text-zinc-900',
  planned: 'text-blue-700',
  reserved: 'text-orange-600',
}

export const planningMetricCardShellClassName =
  'relative overflow-hidden rounded-xl border border-zinc-200/80 border-l-4 bg-white py-4 pl-4 pr-4 shadow-sm'

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
