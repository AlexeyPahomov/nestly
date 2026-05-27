import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { cn } from '@/shared/lib/utils'

import {
  PAGE_TRANSITION_ENTER_MS,
  PAGE_TRANSITION_EXIT_MS,
  pageTransitionEnterClassName,
  pageTransitionExitClassName,
  pageTransitionShellClassName,
} from './pageTransitionLayout'

type PageTransitionPhase = 'idle' | 'exit' | 'enter'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageTransitionOutlet() {
  const location = useLocation()
  const outlet = useOutlet()

  const [renderedOutlet, setRenderedOutlet] = useState(outlet)
  const [phase, setPhase] = useState<PageTransitionPhase>('idle')

  const prevPathRef = useRef(location.pathname)
  const pendingOutletRef = useRef(outlet)
  const enterTimerRef = useRef<number | undefined>(undefined)

  useLayoutEffect(() => {
    pendingOutletRef.current = outlet

    if (prevPathRef.current === location.pathname) {
      setRenderedOutlet(outlet)
      return
    }

    if (prefersReducedMotion()) {
      prevPathRef.current = location.pathname
      setRenderedOutlet(outlet)
      setPhase('idle')
      return
    }

    setPhase('exit')

    const exitTimer = window.setTimeout(() => {
      setRenderedOutlet(pendingOutletRef.current)
      setPhase('enter')

      enterTimerRef.current = window.setTimeout(() => {
        setPhase('idle')
        prevPathRef.current = location.pathname
        enterTimerRef.current = undefined
      }, PAGE_TRANSITION_ENTER_MS)
    }, PAGE_TRANSITION_EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      if (enterTimerRef.current !== undefined) {
        window.clearTimeout(enterTimerRef.current)
        enterTimerRef.current = undefined
      }
    }
  }, [location.pathname, outlet])

  return (
    <div
      className={cn(
        pageTransitionShellClassName,
        phase === 'exit' && pageTransitionExitClassName,
        phase === 'enter' && pageTransitionEnterClassName,
      )}
    >
      {renderedOutlet}
    </div>
  )
}
