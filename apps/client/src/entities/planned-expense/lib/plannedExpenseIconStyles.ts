import type { PlannedExpenseIconColorKey } from '@nestly/shared'

export type PlannedExpenseIconTone = {
  avatarClassName: string
  iconClassName: string
  progressClassName: string
  swatchClassName: string
}

export const PLANNED_EXPENSE_ICON_TONES: Record<
  PlannedExpenseIconColorKey,
  PlannedExpenseIconTone
> = {
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

export function resolvePlannedExpenseIconTone(
  colorKey: string,
): PlannedExpenseIconTone {
  if (colorKey in PLANNED_EXPENSE_ICON_TONES) {
    return PLANNED_EXPENSE_ICON_TONES[colorKey as PlannedExpenseIconColorKey]
  }

  return PLANNED_EXPENSE_ICON_TONES.purple
}
