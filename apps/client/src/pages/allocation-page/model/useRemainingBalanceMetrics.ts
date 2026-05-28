import { useAnimatedNumber } from '@/shared/hooks/useAnimatedNumber'

type UseRemainingBalanceMetricsParams = {
  remainingBalance: number
  allocatedPercent: number
  enabled: boolean
}

export function useRemainingBalanceMetrics({
  remainingBalance,
  allocatedPercent,
  enabled,
}: UseRemainingBalanceMetricsParams) {
  const animatedRemaining = useAnimatedNumber(remainingBalance, { enabled })
  const animatedPercent = useAnimatedNumber(allocatedPercent, { enabled })

  return {
    displayRemaining: Math.round(animatedRemaining),
    displayPercent: Math.round(animatedPercent),
    ringPercent: animatedPercent,
  }
}
