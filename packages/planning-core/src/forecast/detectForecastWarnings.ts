import type { ForecastWarning, ForecastWarningType } from './types.js'

const SEVERITY_BY_TYPE: Record<
  ForecastWarningType,
  ForecastWarning['severity']
> = {
  DEFICIT: 'critical',
  NEGATIVE_CARRY: 'critical',
  OVERBOOKED: 'warning',
  GOAL_UNDERFUNDED: 'info',
}

function warning(type: ForecastWarningType): ForecastWarning {
  return { type, severity: SEVERITY_BY_TYPE[type] }
}

export type DetectForecastWarningsInput = {
  openingBalance: number
  available: number
  commitmentTotal: number
  projectedFree: number
}

export function detectForecastWarnings(
  input: DetectForecastWarningsInput,
): ForecastWarning[] {
  const warnings: ForecastWarning[] = []

  if (input.openingBalance < 0) {
    warnings.push(warning('NEGATIVE_CARRY'))
  }

  if (input.commitmentTotal > input.available) {
    warnings.push(warning('OVERBOOKED'))
  }

  if (input.projectedFree < 0) {
    warnings.push(warning('DEFICIT'))
  }

  return warnings
}
