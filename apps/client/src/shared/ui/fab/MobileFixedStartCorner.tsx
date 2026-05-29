import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import { mobileFabRowStartWrapClassName } from './fabLayout'
import { PortalFabToBody } from './portalFabToBody'

type MobileFixedStartCornerProps = {
  children: ReactNode
  className?: string
}

/** Левый нижний угол экрана (мобилка), вне анимации страницы. */
export function MobileFixedStartCorner({
  children,
  className,
}: MobileFixedStartCornerProps) {
  return (
    <PortalFabToBody>
      <div className={cn(mobileFabRowStartWrapClassName, className)}>
        {children}
      </div>
    </PortalFabToBody>
  )
}
