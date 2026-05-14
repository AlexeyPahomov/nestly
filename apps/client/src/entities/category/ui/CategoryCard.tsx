import type { Category } from '../model/types'

import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

type CategoryCardProps = {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription className="capitalize">{category.type}</CardDescription>
      </CardHeader>
    </Card>
  )
}
