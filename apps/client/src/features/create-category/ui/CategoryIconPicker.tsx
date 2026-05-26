import {
  CATEGORY_ICON_KEYS,
  CATEGORY_ICON_LABELS,
  type CategoryIconKey,
  type IconColorKey,
  resolveIconColorKey,
} from '@coffer/shared'
import { createElement } from 'react'

import { getLucideIconByKey } from '@/entities/category/lib/categoryIcons'
import { buildIconColorPickerOptions } from '@/shared/lib/iconColorPicker'
import { IconPicker } from '@/shared/ui'

type CategoryIconPickerProps = {
  icon: CategoryIconKey
  iconColor: IconColorKey
  onIconChange: (icon: CategoryIconKey) => void
  onColorChange: (iconColor: IconColorKey) => void
  disabled?: boolean
}

export function CategoryIconPicker({
  icon,
  iconColor,
  onIconChange,
  onColorChange,
  disabled = false,
}: CategoryIconPickerProps) {
  return (
    <IconPicker
      iconValue={icon}
      colorValue={resolveIconColorKey(iconColor)}
      disabled={disabled}
      iconLabel="Иконка"
      colorLabel="Цвет"
      icons={CATEGORY_ICON_KEYS.map((value) => ({
        value,
        label: CATEGORY_ICON_LABELS[value],
      }))}
      colors={buildIconColorPickerOptions()}
      onIconChange={onIconChange}
      onColorChange={onColorChange}
      renderIcon={(iconKey, className) =>
        createElement(getLucideIconByKey(iconKey), { className })
      }
    />
  )
}
