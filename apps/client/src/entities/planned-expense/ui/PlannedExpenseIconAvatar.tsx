import { createElement } from 'react'

import { cn } from '@/shared/lib/utils'

import { resolvePlannedExpenseIconTone } from '../lib/plannedExpenseIconStyles'
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
  const tone = resolvePlannedExpenseIconTone(iconColor)
  const Icon = getPlannedExpenseLucideIcon(iconKey)

  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full',
        tone.avatarClassName,
        className,
      )}
      aria-hidden
    >
      {createElement(Icon, { className: cn('size-5', tone.iconClassName) })}
    </span>
  )
}
