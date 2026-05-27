import { formatPlanningPeriodLabel } from '@/entities/budget/lib/periodLabels'

export function planningForecastMetricTitle(periodMonth: string): string {
  return `Прогноз на ${formatPlanningPeriodLabel(periodMonth)}`
}

export const PLANNING_METRIC_COPY = {
  forecast: {
    caption: 'Прогноз свободных средств',
    infoText:
      'Свободный пул после учёта запланированных трат и уже зарезервированных сумм.',
  },
  pool: {
    title: 'Свободный пул',
    caption: 'Доступно для планов и трат',
    infoText:
      'Доходы за месяц за вычетом сумм, уже распределённых по категориям.',
  },
  planned: {
    title: 'В планах',
    caption: 'Запланированные траты',
    infoText: 'Сумма планов со статусом «План», ещё не зарезервированная.',
  },
  reserved: {
    title: 'Зарезервировано',
    caption: 'Замороженные средства',
    infoText: 'Сумма планов, по которым ликвидность уже заморожена.',
  },
} as const
