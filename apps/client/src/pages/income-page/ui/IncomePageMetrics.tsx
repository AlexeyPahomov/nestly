import type { IncomePageMetrics as IncomePageMetricsData } from '@/pages/income-page/lib/incomePageAnalytics'
import {
  incomePageAccentPositiveClassName,
  incomePageHeroClassName,
  incomePageMetricCardClassName,
  incomePageMetricLineCaptionClassName,
  incomePageMetricLineTitleClassName,
  incomePageMetricPanelClassName,
  incomePageMetricsRowClassName,
} from '@/pages/income-page/lib/incomePageLayout'
import { cn } from '@/shared/lib/utils'

import { IncomePageMetricAmount } from './IncomePageMetricAmount'

type IncomePageMetricsProps = {
  metrics: IncomePageMetricsData
}

export function IncomePageMetrics({ metrics }: IncomePageMetricsProps) {
  const { summary, averageIncome } = metrics
  const changeLabel =
    summary.changePercent === null
      ? null
      : summary.changePercent >= 0
        ? `+${summary.changePercent}%`
        : `${summary.changePercent}%`

  return (
    <div className={incomePageMetricsRowClassName}>
      <div className={incomePageMetricCardClassName}>
        <section className={incomePageHeroClassName}>
          <p className={incomePageMetricLineTitleClassName}>
            Доход за {summary.periodTitle}
          </p>
          <IncomePageMetricAmount value={summary.total} animateFromZero />
          {changeLabel ? (
            <p
              className={cn(
                incomePageMetricLineCaptionClassName,
                'font-medium tabular-nums',
                summary.changePercent !== null && summary.changePercent < 0
                  ? 'text-destructive'
                  : incomePageAccentPositiveClassName,
              )}
            >
              {changeLabel}
              <span className="font-normal text-zinc-500">
                {' '}
                к прошлому месяцу
              </span>
            </p>
          ) : (
            <p className={incomePageMetricLineCaptionClassName}>
              Нет данных за прошлый месяц
            </p>
          )}
        </section>
      </div>

      {averageIncome != null ? (
        <div className={incomePageMetricCardClassName}>
          <article
            className={cn(incomePageMetricPanelClassName, 'border-l-blue')}
          >
            <p className={incomePageMetricLineTitleClassName}>Средний доход</p>
            <IncomePageMetricAmount value={averageIncome} />
            <p className={incomePageMetricLineCaptionClassName}>в месяц</p>
          </article>
        </div>
      ) : null}
    </div>
  )
}
