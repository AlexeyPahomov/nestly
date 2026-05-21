import type { CategoryIconKey } from '@nestly/shared'
import type { LucideProps } from 'lucide-react'
import { createElement } from 'react'

import { getLucideIconByKey } from '@/entities/category/lib/categoryIcons'

type CategoryIconGlyphProps = LucideProps & {
  iconKey: CategoryIconKey
}

export function CategoryIconGlyph({ iconKey, ...props }: CategoryIconGlyphProps) {
  return createElement(getLucideIconByKey(iconKey), props)
}
