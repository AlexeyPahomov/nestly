import {
  DEFAULT_PLANNED_EXPENSE_ICON_COLOR_KEY,
  PLANNED_EXPENSE_ICON_COLOR_KEYS,
  PLANNED_EXPENSE_ICON_COLOR_LABELS,
  PLANNED_EXPENSE_ICON_KEYS,
  PLANNED_EXPENSE_ICON_LABELS,
  type PlannedExpenseIconColorKey,
  type PlannedExpenseIconKey,
  isPlannedExpenseIconColorKey,
} from '@nestly/shared'
import { createElement } from 'react'

import {
  getPlannedExpenseLucideIcon,
  resolvePlannedExpenseIconKey,
} from '@/entities/planned-expense/lib/plannedExpenseIcons'
import { PLANNED_EXPENSE_ICON_TONES } from '@/entities/planned-expense/lib/plannedExpenseIconStyles'
import { IconPicker } from '@/shared/ui'

type PlannedExpenseIconPickerProps = {
  iconName: string
  iconColor: string
  onIconChange: (iconName: PlannedExpenseIconKey) => void
  onColorChange: (iconColor: PlannedExpenseIconColorKey) => void
  disabled?: boolean
}

export function PlannedExpenseIconPicker({
  iconName,
  iconColor,
  onIconChange,
  onColorChange,
  disabled = false,
}: PlannedExpenseIconPickerProps) {
  const iconValue = resolvePlannedExpenseIconKey(iconName)
  const colorValue = isPlannedExpenseIconColorKey(iconColor)
    ? iconColor
    : DEFAULT_PLANNED_EXPENSE_ICON_COLOR_KEY

  return (
    <IconPicker
      iconValue={iconValue}
      colorValue={colorValue}
      disabled={disabled}
      icons={PLANNED_EXPENSE_ICON_KEYS.map((value) => ({
        value,
        label: PLANNED_EXPENSE_ICON_LABELS[value],
      }))}
      colors={PLANNED_EXPENSE_ICON_COLOR_KEYS.map((value) => ({
        value,
        label: PLANNED_EXPENSE_ICON_COLOR_LABELS[value],
        swatchClassName: PLANNED_EXPENSE_ICON_TONES[value].swatchClassName,
      }))}
      onIconChange={onIconChange}
      onColorChange={onColorChange}
      renderIcon={(icon, className) =>
        createElement(getPlannedExpenseLucideIcon(icon), { className })
      }
    />
  )
}
