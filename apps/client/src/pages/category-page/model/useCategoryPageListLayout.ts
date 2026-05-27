import { useIsMobile } from '@/shared/hooks/use-mobile'
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'

export function useCategoryPageListLayout(): ItemsListLayout {
  const isMobile = useIsMobile()
  return isMobile ? 'fit' : 'fill'
}
