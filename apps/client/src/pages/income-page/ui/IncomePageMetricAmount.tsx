import {
  incomePageMetricLineValueClassName,
  incomePageMetricLineValueRubClassName,
} from '@/pages/income-page/lib/incomePageLayout'
import { useAnimatedNumber } from '@/shared/hooks/useAnimatedNumber'
import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

type IncomePageMetricAmountProps = {
  value: number
  /** При смене месяца — счётчик «с нуля», как у «Осталось» при первом показе. */
  animateFromZero?: boolean
}

export function IncomePageMetricAmount({
  value,
  animateFromZero = false,
}: IncomePageMetricAmountProps) {
  const animatedValue = useAnimatedNumber(value, {
    enabled: true,
    mountFrom: animateFromZero ? 0 : undefined,
  })
  const displayValue = Math.round(animatedValue)
  const amount = formatAmount(displayValue)

  if (amount === '—') {
    return <p className={incomePageMetricLineValueClassName}>{amount}</p>
  }

  return (
    <p
      className={cn(
        incomePageMetricLineValueClassName,
        'flex items-baseline gap-1 tabular-nums transition-colors duration-300 ease-out',
      )}
    >
      {amount}
      <span className={incomePageMetricLineValueRubClassName} aria-hidden>
        ₽
      </span>
    </p>
  )
}
