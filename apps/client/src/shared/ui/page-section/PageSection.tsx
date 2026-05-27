import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import { PageSectionHeader } from './PageSectionHeader'
import { pageSectionClassName } from './pageSectionLayout'

type PageSectionProps = {
  title?: string
  /** Спиннер рядом с заголовком (`title`). */
  titleLoading?: boolean
  children: ReactNode
  className?: string
  /**
   * Доп. блок шапки под строкой заголовка (таймлайн, метрики).
   * Кнопка сайдбара — только у `title`, не у всего `header`.
   */
  header?: ReactNode
  headerAction?: ReactNode
}

function PageSection({
  title,
  titleLoading = false,
  children,
  className,
  header,
  headerAction,
}: PageSectionProps) {
  return (
    <section
      data-slot="page-section"
      className={cn(pageSectionClassName, className)}
    >
      <PageSectionHeader
        title={title}
        titleLoading={titleLoading}
        header={header}
        headerAction={headerAction}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </section>
  )
}

export { PageSection }
export { PageSectionHeader } from './PageSectionHeader'
export { PageSectionTitleRow } from './PageSectionTitleRow'
export { PageSectionMobileHeader } from './PageSectionMobileHeader'
