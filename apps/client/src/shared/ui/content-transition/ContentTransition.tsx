import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import { contentTransitionPhaseClassName } from './contentTransitionLayout'
import { useContentTransition } from './useContentTransition'

export type ContentTransitionProps = {
  contentKey: string
  className?: string
  children: ReactNode
}

export function ContentTransition({
  contentKey,
  className,
  children,
}: ContentTransitionProps) {
  const { renderedContent, phase } = useContentTransition(contentKey, children)

  return (
    <div className={cn(className, contentTransitionPhaseClassName(phase))}>
      {renderedContent}
    </div>
  )
}
