import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'
import { Spinner } from '@/shared/ui/spinner/Spinner'

import { PageTitle } from './PageTitle'
import { pageSectionTitleRowClassName } from './pageSectionLayout'

type PageSectionTitleRowProps = {
  children: ReactNode
  className?: string
  /** Индикатор загрузки рядом с заголовком. */
  isLoading?: boolean
}

/** Заголовок страницы (сайдбар — в {@link PageSectionMobileHeader}). */
export function PageSectionTitleRow({
  children,
  className,
  isLoading = false,
}: PageSectionTitleRowProps) {
  return (
    <div className={cn(pageSectionTitleRowClassName, className)}>
      <PageTitle className="min-w-0">{children}</PageTitle>
      {isLoading ? (
        <Spinner
          className="size-4 shrink-0 text-zinc-500"
          aria-label="Загрузка"
        />
      ) : null}
    </div>
  )
}
