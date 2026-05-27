import { useEffect, useState, type RefObject } from 'react'

/**
 * true, когда ширина ref-элемента <= thresholdPx.
 * Следит за изменениями размеров через ResizeObserver.
 */
export function useElementWidthThreshold(
  ref: RefObject<HTMLElement | null>,
  thresholdPx: number,
  enabled = true,
) {
  const [isBelowThreshold, setIsBelowThreshold] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) {
      setIsBelowThreshold(false)
      return
    }

    const update = () => {
      setIsBelowThreshold(element.clientWidth <= thresholdPx)
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(element)

    return () => observer.disconnect()
  }, [enabled, thresholdPx, ref])

  return isBelowThreshold
}
