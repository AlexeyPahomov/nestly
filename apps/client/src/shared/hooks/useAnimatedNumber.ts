import { useEffect, useRef, useState } from 'react'

import { prefersReducedMotion } from '@/shared/lib/prefersReducedMotion'

const DEFAULT_DURATION_MS = 420

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export type UseAnimatedNumberOptions = {
  durationMs?: number
  enabled?: boolean
  /** Стартовое значение при первом монтировании (для анимации «с нуля»). */
  mountFrom?: number
}

function resolveInitialDisplay(
  target: number,
  enabled: boolean,
  mountFrom: number | undefined,
): number {
  if (!enabled || prefersReducedMotion()) {
    return target
  }

  return mountFrom ?? target
}

export function useAnimatedNumber(
  target: number,
  {
    durationMs = DEFAULT_DURATION_MS,
    enabled = true,
    mountFrom,
  }: UseAnimatedNumberOptions = {},
): number {
  const initialDisplay = resolveInitialDisplay(target, enabled, mountFrom)
  const [display, setDisplay] = useState(initialDisplay)
  const displayRef = useRef(initialDisplay)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      setDisplay(target)
      displayRef.current = target
      return
    }

    const from = displayRef.current
    if (from === target) {
      return
    }

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)
      const next = from + (target - from) * easeOutCubic(progress)

      if (progress < 1) {
        displayRef.current = next
        setDisplay(next)
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      displayRef.current = target
      setDisplay(target)
      frameRef.current = undefined
    }

    if (frameRef.current !== undefined) {
      cancelAnimationFrame(frameRef.current)
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = undefined
      }
    }
  }, [durationMs, enabled, target])

  if (!enabled || prefersReducedMotion()) {
    return target
  }

  return display
}
