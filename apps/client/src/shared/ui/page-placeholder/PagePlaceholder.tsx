import type { ReactNode } from 'react'

import { Card, CardContent } from '../card/Card'
import { PageSection } from '../page-section/PageSection'

type PagePlaceholderProps = {
  title: string
  children: ReactNode
}

function PagePlaceholder({ title, children }: PagePlaceholderProps) {
  return (
    <PageSection title={title}>
      <Card>
        <CardContent>
          <p className="text-muted-foreground">{children}</p>
        </CardContent>
      </Card>
    </PageSection>
  )
}

export { PagePlaceholder }
