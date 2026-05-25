export function planningForecastMetricTitle(periodLabel: string): string {
  return `Прогноз на ${periodLabel}`
}

export const PLANNING_METRIC_COPY = {
  forecast: {
    hint: 'Прогноз свободных средств',
    tooltip:
      'Свободный пул после учёта запланированных трат и уже зарезервированных сумм.',
  },
  pool: {
    title: 'Свободный пул',
    hint: 'Доступно для планов и трат',
    tooltip:
      'Доходы за месяц за вычетом сумм, уже распределённых по категориям.',
  },
  planned: {
    title: 'В планах',
    hint: 'Запланированные траты',
    tooltip: 'Сумма планов со статусом «План», ещё не зарезервированная.',
  },
  reserved: {
    title: 'Зарезервировано',
    hint: 'Замороженные средства',
    tooltip: 'Сумма планов, по которым ликвидность уже заморожена.',
  },
} as const
