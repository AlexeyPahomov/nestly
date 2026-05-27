import { useLocation, useOutlet } from 'react-router-dom'

import {
  ContentTransition,
  contentTransitionOutletShellClassName,
} from '@/shared/ui/content-transition'

export function PageTransitionOutlet() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <ContentTransition
      contentKey={location.pathname}
      className={contentTransitionOutletShellClassName}
    >
      {outlet}
    </ContentTransition>
  )
}
