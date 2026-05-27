import * as React from 'react'

/** Touch / coarse pointer — popover по тапу; иначе tooltip по hover. */
const TOUCH_HINT_MEDIA_QUERY = '(hover: none), (pointer: coarse)'

export function usePrefersClickHint() {
  const [prefersClickHint, setPrefersClickHint] = React.useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return window.matchMedia(TOUCH_HINT_MEDIA_QUERY).matches
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(TOUCH_HINT_MEDIA_QUERY)
    const onChange = () => {
      setPrefersClickHint(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', onChange)
    onChange()

    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return prefersClickHint
}
