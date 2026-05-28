import { useCallback } from 'react'

type UseCardActivateOptions = {
  /** ПК: правый клик вызывает действие. */
  contextMenu?: boolean
  ariaLabel?: string
}

export function useCardActivate(
  onActivate: () => void,
  { contextMenu = false, ariaLabel }: UseCardActivateOptions = {},
) {
  const onClick = useCallback(() => {
    onActivate()
  }, [onActivate])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate()
      }
    },
    [onActivate],
  )

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      onActivate()
    },
    [onActivate],
  )

  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': ariaLabel,
    onClick,
    onKeyDown,
    ...(contextMenu ? { onContextMenu } : {}),
  }
}
