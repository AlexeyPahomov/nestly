import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

type PageSectionProps = {
  title: string
  children: ReactNode
  className?: string
}

function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <section
      data-slot="page-section"
      className={cn('flex min-h-0 flex-1 flex-col gap-6', className)}
    >
      <h1 className="shrink-0 text-3xl font-bold">{title}</h1>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  )
}

export { PageSection }
