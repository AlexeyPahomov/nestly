import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import { pageTitleClassName } from './pageSectionLayout'

type PageTitleProps = {
  children: ReactNode
  className?: string
}

function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={cn(pageTitleClassName, className)}>{children}</h1>
}

export { PageTitle }
