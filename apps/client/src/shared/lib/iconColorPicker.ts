import {
  ICON_COLOR_KEYS,
  ICON_COLOR_LABELS,
  type IconColorKey,
} from '@coffer/shared'

import type { IconPickerColorOption } from '@/shared/ui/icon-picker'

import { ICON_COLOR_TONES } from './iconColorStyles'

export function buildIconColorPickerOptions(): readonly IconPickerColorOption<IconColorKey>[] {
  return ICON_COLOR_KEYS.map((value) => ({
    value,
    label: ICON_COLOR_LABELS[value],
    swatchClassName: ICON_COLOR_TONES[value].swatchClassName,
  }))
}
