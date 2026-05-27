import type { ReactNode } from 'react'

import { SidebarTrigger } from '@/shared/ui/sidebar'

import {
  pageSectionHeaderClassName,
  pageSectionHeaderMainClassName,
} from './pageSectionLayout'

type PageSectionMobileHeaderProps = {
  children: ReactNode
}

/** Оболочка шапки: контент страницы + кнопка сайдбара у правого края на мобилке. */
export function PageSectionMobileHeader({
  children,
}: PageSectionMobileHeaderProps) {
  return (
    <div className={pageSectionHeaderClassName}>
      <div className={pageSectionHeaderMainClassName}>{children}</div>
      <SidebarTrigger className="shrink-0 md:hidden" />
    </div>
  )
}
