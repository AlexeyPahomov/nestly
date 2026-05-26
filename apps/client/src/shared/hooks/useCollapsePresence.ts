import { useEffect, useState } from 'react'

/** Длительность collapse-анимаций в `index.css` (`.coffer-collapse`). */
export const COFFER_COLLAPSE_MS = 300

/**
 * Держит узел в DOM после `active === false`, чтобы успела отыграть CSS-анимация скрытия.
 * `value` — последнее значение для отображения на фазе выхода (когда `active` уже false).
 */
export function useCollapsePresence<T>(
  active: boolean,
  value: T | null,
  durationMs = COFFER_COLLAPSE_MS,
) {
  const [mounted, setMounted] = useState(active)
  const [heldValue, setHeldValue] = useState<T | null>(null)

  useEffect(() => {
    if (value !== null) {
      setHeldValue(value)
    }
  }, [value])

  useEffect(() => {
    if (active) {
      setMounted(true)
      return
    }

    const id = window.setTimeout(() => {
      setMounted(false)
      setHeldValue(null)
    }, durationMs)
    return () => window.clearTimeout(id)
  }, [active, durationMs])

  const displayValue = value ?? (mounted ? heldValue : null)

  return { isOpen: active, isMounted: mounted, displayValue }
}
