import {
  useAnimatedNumber,
  type UseAnimatedNumberOptions,
} from '@/shared/hooks/useAnimatedNumber'

type UseAnimatedPercentOptions = Pick<UseAnimatedNumberOptions, 'durationMs' | 'mountFrom'>

export type AnimatedPercent = {
  raw: number
  rounded: number
}

/** Анимирует долю дохода (0–100). `null` — метрика недоступна. */
export function useAnimatedPercent(
  percent: number | null,
  options: UseAnimatedPercentOptions = {},
): AnimatedPercent | null {
  const raw = useAnimatedNumber(percent ?? 0, {
    ...options,
    enabled: percent !== null,
  })

  if (percent === null) {
    return null
  }

  return {
    raw,
    rounded: Math.round(raw),
  }
}
