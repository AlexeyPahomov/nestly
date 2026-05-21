import { useEffect, useRef, useState } from 'react'

/** Высота элемента в px; обновляется при изменении размера (ResizeObserver). */
export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateHeight = () => {
      setHeight(element.getBoundingClientRect().height)
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, height }
}
