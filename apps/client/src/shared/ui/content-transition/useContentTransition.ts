import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { prefersReducedMotion } from '@/shared/lib/prefersReducedMotion'

import {
  CONTENT_TRANSITION_ENTER_MS,
  CONTENT_TRANSITION_EXIT_MS,
} from './contentTransitionLayout'

export type ContentTransitionPhase = 'idle' | 'exit' | 'enter'

export function useContentTransition(contentKey: string, content: ReactNode) {
  const [renderedContent, setRenderedContent] = useState(content)
  const [phase, setPhase] = useState<ContentTransitionPhase>('idle')

  const prevKeyRef = useRef(contentKey)
  const pendingContentRef = useRef(content)
  const enterTimerRef = useRef<number | undefined>(undefined)
  /** Первый сменный маршрут (напр. `/` → `/planning`) без exit/enter. */
  const skipNextRouteTransitionRef = useRef(true)

  useLayoutEffect(() => {
    pendingContentRef.current = content

    if (prevKeyRef.current === contentKey) {
      setRenderedContent(content)
      return
    }

    if (skipNextRouteTransitionRef.current) {
      skipNextRouteTransitionRef.current = false
      prevKeyRef.current = contentKey
      setRenderedContent(content)
      setPhase('idle')
      return
    }

    if (prefersReducedMotion()) {
      prevKeyRef.current = contentKey
      setRenderedContent(content)
      setPhase('idle')
      return
    }

    setPhase('exit')

    const exitTimer = window.setTimeout(() => {
      setRenderedContent(pendingContentRef.current)
      setPhase('enter')

      enterTimerRef.current = window.setTimeout(() => {
        setPhase('idle')
        prevKeyRef.current = contentKey
        enterTimerRef.current = undefined
      }, CONTENT_TRANSITION_ENTER_MS)
    }, CONTENT_TRANSITION_EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      if (enterTimerRef.current !== undefined) {
        window.clearTimeout(enterTimerRef.current)
        enterTimerRef.current = undefined
      }
    }
  }, [contentKey, content])

  return { renderedContent, phase }
}
