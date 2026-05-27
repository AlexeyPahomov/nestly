import type { ReactNode } from 'react'

export function getInfoHintLabel(
  title: ReactNode,
  fallback = 'Подробнее',
): string {
  return typeof title === 'string' ? title : fallback
}
