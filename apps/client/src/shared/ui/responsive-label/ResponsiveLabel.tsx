import type { ReactNode } from 'react'

type ResponsiveLabelProps = {
  mobile: ReactNode
  desktop: ReactNode
}

/** Короткая подпись на мобилке, полная — с `md`. */
export function ResponsiveLabel({ mobile, desktop }: ResponsiveLabelProps) {
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="hidden md:inline">{desktop}</span>
    </>
  )
}
