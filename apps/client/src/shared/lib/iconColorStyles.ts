import { resolveIconColorKey, type IconColorKey } from '@nestly/shared'

export type IconColorTone = {
  avatarClassName: string
  iconClassName: string
  progressClassName: string
  swatchClassName: string
}

export const ICON_COLOR_TONES: Record<IconColorKey, IconColorTone> = {
  purple: {
    avatarClassName: 'bg-[#f3e8ff]',
    iconClassName: 'text-[#9333ea]',
    progressClassName: 'bg-[#9333ea]',
    swatchClassName: 'bg-[#9333ea]',
  },
  orange: {
    avatarClassName: 'bg-orange-subtle',
    iconClassName: 'text-orange',
    progressClassName: 'bg-orange',
    swatchClassName: 'bg-orange',
  },
  blue: {
    avatarClassName: 'bg-blue-subtle',
    iconClassName: 'text-blue',
    progressClassName: 'bg-blue',
    swatchClassName: 'bg-blue',
  },
  green: {
    avatarClassName: 'bg-green-subtle',
    iconClassName: 'text-green',
    progressClassName: 'bg-green',
    swatchClassName: 'bg-green',
  },
  teal: {
    avatarClassName: 'bg-teal-subtle',
    iconClassName: 'text-teal',
    progressClassName: 'bg-teal',
    swatchClassName: 'bg-teal',
  },
  red: {
    avatarClassName: 'bg-red-subtle',
    iconClassName: 'text-red',
    progressClassName: 'bg-red',
    swatchClassName: 'bg-red',
  },
  pink: {
    avatarClassName: 'bg-[#fce7f3]',
    iconClassName: 'text-[#db2777]',
    progressClassName: 'bg-[#db2777]',
    swatchClassName: 'bg-[#db2777]',
  },
  amber: {
    avatarClassName: 'bg-[#fef3c7]',
    iconClassName: 'text-[#d97706]',
    progressClassName: 'bg-[#d97706]',
    swatchClassName: 'bg-[#d97706]',
  },
}

export function resolveIconColorTone(
  colorKey: string | null | undefined,
): IconColorTone {
  return ICON_COLOR_TONES[resolveIconColorKey(colorKey)]
}
