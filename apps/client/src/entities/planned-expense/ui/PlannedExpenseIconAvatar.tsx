import { createElement } from 'react'

import { IconColorAvatar } from '@/shared/ui/icon-color-avatar'
import { cn } from '@/shared/lib/utils'

import {
  getPlannedExpenseLucideIcon,
  resolvePlannedExpenseIconKey,
} from '../lib/plannedExpenseIcons'

type PlannedExpenseIconAvatarProps = {
  iconName: string
  iconColor: string
  className?: string
}

export function PlannedExpenseIconAvatar({
  iconName,
  iconColor,
  className,
}: PlannedExpenseIconAvatarProps) {
  const iconKey = resolvePlannedExpenseIconKey(iconName)
  const Icon = getPlannedExpenseLucideIcon(iconKey)

  return (
    <IconColorAvatar iconColor={iconColor} className={className}>
      {(iconClassName) =>
        createElement(Icon, { className: cn('size-5', iconClassName) })
      }
    </IconColorAvatar>
  )
}
