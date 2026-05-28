import type { ReactNode } from 'react'

import {
  pageSectionHeaderClassName,
  pageSectionHeaderMainClassName,
} from './pageSectionLayout'

type PageSectionMobileHeaderProps = {
  children: ReactNode
}

/** Оболочка шапки на мобилке (без бокового меню — навигация в нижней панели). */
export function PageSectionMobileHeader({
  children,
}: PageSectionMobileHeaderProps) {
  return (
    <div className={pageSectionHeaderClassName}>
      <div className={pageSectionHeaderMainClassName}>{children}</div>
    </div>
  )
}
