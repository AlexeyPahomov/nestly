import type { ReactNode } from 'react'

import { ContentTransition } from '@/shared/ui/content-transition'

type PlanningPageMonthTransitionProps = {
  periodMonth: string
  className?: string
  children: ReactNode
}

export function PlanningPageMonthTransition({
  periodMonth,
  className,
  children,
}: PlanningPageMonthTransitionProps) {
  return (
    <ContentTransition contentKey={periodMonth} className={className}>
      {children}
    </ContentTransition>
  )
}
