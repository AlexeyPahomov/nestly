import type { ReactNode } from 'react'

import { PageSectionMobileHeader } from './PageSectionMobileHeader'
import { PageSectionTitleRow } from './PageSectionTitleRow'
import { pageSectionHeaderStackClassName } from './pageSectionLayout'

type PageSectionHeaderProps = {
  title?: string
  titleLoading?: boolean
  header?: ReactNode
  headerAction?: ReactNode
}

export function PageSectionHeader({
  title,
  titleLoading = false,
  header,
  headerAction,
}: PageSectionHeaderProps) {
  const hasTitleRow = title != null || headerAction != null
  const hasHeaderBelow = header != null

  if (!hasTitleRow && !hasHeaderBelow) {
    return null
  }

  return (
    <div className={pageSectionHeaderStackClassName}>
      {hasTitleRow ? (
        <PageSectionMobileHeader>
          <div className="flex min-w-0 items-center justify-between gap-4">
            {title ? (
              <PageSectionTitleRow isLoading={titleLoading}>
                {title}
              </PageSectionTitleRow>
            ) : null}
            {headerAction ? (
              <div className="hidden shrink-0 sm:block">{headerAction}</div>
            ) : null}
          </div>
        </PageSectionMobileHeader>
      ) : (
        <PageSectionMobileHeader>{header}</PageSectionMobileHeader>
      )}
      {hasTitleRow && hasHeaderBelow ? (
        <div className="shrink-0">{header}</div>
      ) : null}
    </div>
  )
}
