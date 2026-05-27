import { useIsMobile } from '@/shared/hooks/use-mobile'
import type { ItemsListLayout } from '@/shared/ui/items-list/ItemsList'

/** `fit` на мобилке (скролл страницы), `fill` на десктопе (скролл списка). */
export function usePageListLayout(): ItemsListLayout {
  const isMobile = useIsMobile()
  return isMobile ? 'fit' : 'fill'
}
