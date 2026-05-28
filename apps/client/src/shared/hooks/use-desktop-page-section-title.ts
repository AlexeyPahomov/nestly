import { useIsMobile } from '@/shared/hooks/use-mobile'

/** Заголовок `PageSection` только на планшете и десктопе. */
export function useDesktopPageSectionTitle(title: string): string | undefined {
  const isMobile = useIsMobile()

  return isMobile ? undefined : title
}
