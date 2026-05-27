import { formatPlanningPeriodLabel } from '@/entities/budget/lib/periodLabels'

export function planningPlansListTitle(periodMonth: string): string {
  return `Планы на ${formatPlanningPeriodLabel(periodMonth)}`
}
