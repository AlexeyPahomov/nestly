import { cn } from '@/shared/lib/utils'

import type { ContentTransitionPhase } from './useContentTransition'

/** Длительности синхронизированы с `@keyframes` в `app/styles/index.css`. */
export const CONTENT_TRANSITION_EXIT_MS = 200
export const CONTENT_TRANSITION_ENTER_MS = 280

export const contentTransitionExitClassName = 'coffer-page-transition-exit'
export const contentTransitionEnterClassName = 'coffer-page-transition-enter'

export const contentTransitionOutletShellClassName =
  'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'

export function contentTransitionPhaseClassName(
  phase: ContentTransitionPhase,
): string | false {
  return cn(
    phase === 'exit' && contentTransitionExitClassName,
    phase === 'enter' && contentTransitionEnterClassName,
  )
}
