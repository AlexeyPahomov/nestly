import * as React from 'react'

function centerSelectedItem(viewport: HTMLElement) {
  const selected = viewport.querySelector<HTMLElement>(
    '[data-slot="select-item"][data-state="checked"]',
  )

  if (!selected) {
    return
  }

  selected.scrollIntoView({ block: 'center', inline: 'nearest' })
}

/** Центрирует выбранный пункт в прокручиваемом viewport Select. */
export function useCenterSelectItemInViewport(
  viewportRef: React.RefObject<HTMLElement | null>,
  centerSelectedValue: string | undefined,
) {
  React.useLayoutEffect(() => {
    if (!centerSelectedValue) {
      return
    }

    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    const run = () => {
      centerSelectedItem(viewport)
    }

    run()
    const frameId = requestAnimationFrame(run)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [centerSelectedValue, viewportRef])
}
