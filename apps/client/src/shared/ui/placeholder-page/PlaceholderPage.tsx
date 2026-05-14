import type { ReactNode } from 'react'

import { Card, CardContent } from '../card'
import { PageSection } from '../page-section'

type PlaceholderPageProps = {
  title: string
  children: ReactNode
}

function PlaceholderPage({ title, children }: PlaceholderPageProps) {
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

export { PlaceholderPage }
