import { cn } from '@/shared/lib/utils'

export type PlanningMetricAccent = 'forecast' | 'pool' | 'planned' | 'reserved'

const accentBorderClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'border-l-green',
  pool: 'border-l-teal-500',
  planned: 'border-l-blue',
  reserved: 'border-l-orange',
}

const accentValueClassName: Record<PlanningMetricAccent, string> = {
  forecast: 'text-green',
  pool: 'text-zinc-900',
  planned: 'text-blue',
  reserved: 'text-orange',
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
