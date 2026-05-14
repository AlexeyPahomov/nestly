import type { ReactNode } from 'react'

type PageSectionProps = {
  title: string
  children: ReactNode
}

function PageSection({ title, children }: PageSectionProps) {
  return (
    <section data-slot="page-section" className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </section>
  )
}

export { PageSection }
