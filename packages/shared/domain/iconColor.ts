export const ICON_COLOR_KEYS = [
  'purple',
  'orange',
  'blue',
  'green',
  'teal',
  'red',
  'pink',
  'amber',
] as const

export type IconColorKey = (typeof ICON_COLOR_KEYS)[number]

export const DEFAULT_ICON_COLOR_KEY: IconColorKey = 'purple'

export const ICON_COLOR_LABELS: Record<IconColorKey, string> = {
  purple: 'Фиолетовый',
  orange: 'Оранжевый',
  blue: 'Синий',
  green: 'Зелёный',
  teal: 'Бирюзовый',
  red: 'Красный',
  pink: 'Розовый',
  amber: 'Янтарный',
}

export function isIconColorKey(value: string): value is IconColorKey {
  return (ICON_COLOR_KEYS as readonly string[]).includes(value)
}

export function resolveIconColorKey(
  value: string | null | undefined,
): IconColorKey {
  if (value && isIconColorKey(value)) {
    return value
  }

  return DEFAULT_ICON_COLOR_KEY
}
