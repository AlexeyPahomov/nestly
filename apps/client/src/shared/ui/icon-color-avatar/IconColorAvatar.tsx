import type { ReactNode } from 'react'

import { resolveIconColorTone } from '@/shared/lib/iconColorStyles'
import { cn } from '@/shared/lib/utils'

type IconColorAvatarProps = {
  iconColor: string | null | undefined
  className?: string
  children: (iconClassName: string) => ReactNode
}

export function IconColorAvatar({
  iconColor,
  className,
  children,
}: IconColorAvatarProps) {
  const tone = resolveIconColorTone(iconColor)

  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full ring-1 ring-black/5',
        tone.avatarClassName,
        className,
      )}
      aria-hidden
    >
      {children(tone.iconClassName)}
    </span>
  )
}
