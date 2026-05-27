import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'
import { SidebarTrigger } from '@/shared/ui/sidebar'

import { PageTitle } from './PageTitle'

type PageSectionTitleRowProps = {
  children: ReactNode
  className?: string
}

/** Заголовок страницы + кнопка сайдбара на мобилке (для кастомного header). */
export function PageSectionTitleRow({
  children,
  className,
}: PageSectionTitleRowProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <PageTitle className="min-w-0 flex-1">{children}</PageTitle>
      <SidebarTrigger className="shrink-0 md:hidden" />
    </div>
  )
}
